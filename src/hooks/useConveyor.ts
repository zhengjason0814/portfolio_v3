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

// drag
const FRICTION = 0.06; // fraction of fling velocity left after one second
const MIN_VEL = 3; // px/s; below this the fling ends and auto-scroll resumes
const MAX_VEL = 2400; // px/s cap on fling speed
const STALE_MS = 80; // pointer held still this long before release → no fling

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
  const reducedRef = useRef(reduced);
  const kickRef = useRef<() => void>(() => {});
  useEffect(() => {
    autoRef.current = autoScroll;
    reducedRef.current = reduced;
    kickRef.current();
  }, [autoScroll, reduced]);

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

    // drag + momentum
    let dragging = false;
    let vel = 0; // px/s, positive moves plates left
    let lastX = 0;
    let lastT = 0;

    const moving = () => dragging || vel !== 0 || autoRef.current;

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (!dragging) {
        if (Math.abs(vel) > MIN_VEL) {
          scroll = wrap(scroll + vel * dt);
          vel *= Math.pow(FRICTION, dt);
        } else {
          vel = 0;
          if (autoRef.current) scroll = wrap(scroll + speed * dt);
        }
      }
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

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      vel = 0;
      lastX = e.clientX;
      lastT = performance.now();
      host.setPointerCapture(e.pointerId);
      host.dataset.dragging = '';
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(8, now - lastT) / 1000;
      scroll = wrap(scroll - dx);
      vel = Math.max(-MAX_VEL, Math.min(MAX_VEL, -dx / dt));
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete host.dataset.dragging;
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
      // no fling if the pointer was held still before release, or the user prefers less motion
      if (performance.now() - lastT > STALE_MS || reducedRef.current) vel = 0;
    };
    // horizontal wheel / trackpad swipe only; vertical wheel still scrolls the page
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      scroll = wrap(scroll + e.deltaX);
      start(); // guarantees a layout pass even when nothing else is moving
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const resize = new ResizeObserver(() => {
      if (!raf) layout();
    });

    kickRef.current = start;
    host.addEventListener('pointerdown', onDown);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerup', onUp);
    host.addEventListener('pointercancel', onUp);
    host.addEventListener('wheel', onWheel, { passive: false }); // must be able to preventDefault
    document.addEventListener('visibilitychange', onVisibility);
    resize.observe(host);
    layout();
    start();

    return () => {
      stop();
      kickRef.current = () => {};
      host.removeEventListener('pointerdown', onDown);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerup', onUp);
      host.removeEventListener('pointercancel', onUp);
      host.removeEventListener('wheel', onWheel);
      document.removeEventListener('visibilitychange', onVisibility);
      resize.disconnect();
      delete host.dataset.dragging;
    };
  }, [ref, spacing, plateWidth, speed]);
}
