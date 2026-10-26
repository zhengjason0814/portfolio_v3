import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface ConveyorOptions {
  spacing: number; // px between plate slots
  plateWidth: number; // px
  speed: number; // auto-scroll, px/s
  paused?: boolean;
}

/** attribute every plate wrapper inside the host must carry */
export const CONVEYOR_PLATE_ATTR = 'data-conveyor-plate';

// arc shape
const DROP = 66; // px the edges sit below the centre
const LIFT = 10; // px offset of the centre plate from the top
const TILT = 13; // deg of rotation at the edges
const SHRINK = 0.26; // scale lost at the edges
const FADE_FROM = 0.55; // |t| where plates start fading; fully gone at |t| = 1

/**
 * Infinite arc of plates. Positions are written straight to each plate's style in one rAF loop;
 * React never re-renders per frame. The loop only runs while something is moving, stops when the
 * tab is hidden, and is cancelled on unmount.
 */
export function useConveyor(
  ref: RefObject<HTMLElement | null>,
  { spacing, plateWidth, speed, paused = false }: ConveyorOptions,
): void {
  const reduced = useReducedMotion();
  const autoScroll = !paused && !reduced;

  // read inside the loop without restarting the effect
  const autoRef = useRef(autoScroll);
  const kickRef = useRef<() => void>(() => {});
  useEffect(() => {
    autoRef.current = autoScroll;
    kickRef.current();
  }, [autoScroll]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const plates = Array.from(host.querySelectorAll<HTMLElement>(`[${CONVEYOR_PLATE_ATTR}]`));
    const n = plates.length;
    if (!n) return;

    const loop = n * spacing;
    const wrap = (v: number) => ((v % loop) + loop) % loop;

    let scroll = 0;
    let raf = 0;
    let last = 0;

    const layout = () => {
      const w = host.clientWidth;
      const half = w / 2;
      for (let i = 0; i < n; i++) {
        const el = plates[i];
        const x = wrap(i * spacing - scroll) - spacing; // -spacing … loop - spacing
        if (x > w) {
          el.style.visibility = 'hidden';
          continue;
        }
        const t = Math.max(-1, Math.min(1, (x + plateWidth / 2 - half) / half));
        const a = Math.abs(t);
        const e = Math.max(0, (a - FADE_FROM) / (1 - FADE_FROM));
        el.style.visibility = 'visible';
        el.style.transform =
          `translate3d(${x.toFixed(1)}px, ${(LIFT + DROP * t * t).toFixed(1)}px, 0) ` +
          `rotate(${(t * TILT).toFixed(2)}deg) scale(${(1 - SHRINK * a).toFixed(3)})`;
        el.style.opacity = (1 - e * e).toFixed(3);
        el.style.zIndex = String(100 - Math.round(a * 60));
      }
    };

    const moving = () => autoRef.current;

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (autoRef.current) scroll = wrap(scroll + speed * dt);
      layout();
      raf = moving() ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (raf || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const resize = new ResizeObserver(() => {
      if (!raf) layout();
    });

    kickRef.current = start;
    document.addEventListener('visibilitychange', onVisibility);
    resize.observe(host);
    layout();
    start();

    return () => {
      stop();
      kickRef.current = () => {};
      document.removeEventListener('visibilitychange', onVisibility);
      resize.disconnect();
    };
  }, [ref, spacing, plateWidth, speed]);
}
