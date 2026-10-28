import { useLayoutEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** put on each element that should fly in; the value is passed to `sourceFor` */
export const FLY_ID_ATTR = 'data-fly-id';

/** present on an element from mount until it lands, so its CSS can hide details like labels */
export const FLYING_ATTR = 'data-flying';

/** present on a source element while its flyer is waiting to take off */
export const PENDING_ATTR = 'data-fly-pending';

/** where a flyer takes off from, in viewport coordinates; measured at take-off, not at mount */
export interface FlySource {
  el: HTMLElement | null; // marked PENDING_ATTR until take-off
  cx: number; // centre
  cy: number;
  width: number; // rendered width, so the flyer can match it
  rotate: number; // deg
  opacity: number; // 0…1 at take-off; the flyer fades in from this
}

export interface FlyInOptions {
  stagger: number; // ms between consecutive take-offs
  duration: number; // ms of flight
  /** null means "rise from below the viewport". Must be a stable function. */
  sourceFor: (id: string) => FlySource | null;
  /** if the source isn't below the target, rise from below the viewport instead */
  requireBelow?: boolean;
  /**
   * when sources are measured: at each take-off (follows a moving source), or all at mount (for a
   * source that is about to disappear, like the conveyor folding away for the skills shelves)
   */
  measure?: 'takeoff' | 'mount';
  /** false: elements just appear */
  enabled?: boolean;
  /** ms before the first take-off */
  delay?: number;
}

const EASE = 'cubic-bezier(0.3, 0, 0.2, 1)';
const SETTLE_AT = 0.8; // fraction of the flight where the plate reaches the slot and settles
const FADE_UNTIL = 0.25; // fraction of the flight by which a faded source is fully visible
const OFFSCREEN_SCALE = 1.6; // starting scale when there is no source
const MIN_RISE = 60; // px; with requireBelow, smaller rises fall back to the offscreen start

const fmt = (n: number) => n.toFixed(1);

function reset(el: HTMLElement) {
  el.style.visibility = '';
  el.removeAttribute(FLYING_ATTR);
}

/**
 * Fly-in: every `[data-fly-id]` inside `ref` is hidden at mount, then, one after another, appears
 * on top of its source and flies to its own place. The source is measured at take-off, so a
 * moving source (the conveyor) is still matched exactly. Runs whenever `trigger` changes.
 * Transform and opacity only. Does nothing under reduced motion (elements just appear).
 */
export function useFlyIn(
  ref: RefObject<HTMLElement | null>,
  trigger: unknown,
  {
    stagger,
    duration,
    sourceFor,
    requireBelow = false,
    measure = 'takeoff',
    enabled = true,
    delay = 0,
  }: FlyInOptions,
): void {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced || !enabled) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(`[${FLY_ID_ATTR}]`));
    const timers: number[] = [];
    const flights: Animation[] = [];
    const pending = new Set<HTMLElement>();
    const atMount = new Map<HTMLElement, FlySource | null>();

    // 1. before paint: hide every flyer and mark every source as waiting
    for (const el of targets) {
      el.style.visibility = 'hidden';
      el.setAttribute(FLYING_ATTR, '');
      const src = sourceFor(el.getAttribute(FLY_ID_ATTR) ?? '');
      if (measure === 'mount') atMount.set(el, src);
      if (src?.el) {
        src.el.setAttribute(PENDING_ATTR, '');
        pending.add(src.el);
      }
    }

    const launch = (el: HTMLElement) => {
      const src =
        measure === 'mount'
          ? (atMount.get(el) ?? null)
          : sourceFor(el.getAttribute(FLY_ID_ATTR) ?? '');
      if (src?.el) {
        src.el.removeAttribute(PENDING_ATTR);
        pending.delete(src.el);
      }
      const to = el.getBoundingClientRect();
      let dx = 0;
      let dy = window.innerHeight - to.top + 40;
      let scale = OFFSCREEN_SCALE;
      let rotate = 0;
      let opacity = 1;
      if (src) {
        dx = src.cx - (to.left + to.width / 2);
        dy = src.cy - (to.top + to.height / 2);
        scale = Math.max(0.5, src.width / Math.max(1, to.width));
        rotate = src.rotate;
        opacity = src.opacity;
      }
      if (requireBelow && dy < MIN_RISE) {
        dx = 0;
        dy = window.innerHeight - to.top + 40;
        scale = OFFSCREEN_SCALE;
        rotate = 0;
      }

      el.style.visibility = '';
      const flight = el.animate(
        [
          {
            transform: `translate(${fmt(dx)}px, ${fmt(dy)}px) rotate(${fmt(rotate)}deg) scale(${scale.toFixed(3)})`,
            opacity,
            easing: EASE,
          },
          { offset: FADE_UNTIL, opacity: 1 },
          {
            offset: SETTLE_AT,
            transform: 'translate(0px, -5px) rotate(0deg) scale(1.05)',
            easing: 'ease-out',
          },
          { transform: 'translate(0px, 0px) rotate(0deg) scale(1)', opacity: 1 },
        ],
        { duration },
      );
      flight.onfinish = () => reset(el);
      flights.push(flight);
    };

    // 2. take off one at a time
    targets.forEach((el, i) => {
      timers.push(window.setTimeout(() => launch(el), delay + i * stagger));
    });

    return () => {
      timers.forEach(clearTimeout);
      flights.forEach((f) => f.cancel());
      pending.forEach((el) => el.removeAttribute(PENDING_ATTR));
      targets.forEach(reset);
    };
  }, [ref, trigger, reduced, stagger, duration, sourceFor, requireBelow, measure, enabled, delay]);
}
