import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** attribute every drifting element inside the host must carry */
export const FLOAT_ATTR = 'data-float';

const MARGIN = 40; // px past the edge before an icon wraps to the other side
const MIN_SPEED = 5; // px/s
const MAX_SPEED = 13;
const MAX_SPIN = 6; // deg/s either way
const START_MS = 1000; // the layer is invisible until then (see FloatingIcons.module.css)

interface Drifter {
  el: HTMLElement;
  x: number; // 0…1 of the host, so a resize keeps the spread
  y: number;
  vx: number; // px/s
  vy: number;
  angle: number; // deg
  spin: number; // deg/s
}

// same layout on every load: a small seeded generator instead of Math.random
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * Background icons drifting in straight lines and wrapping at the edges. One rAF loop writes each
 * icon's transform; it stops while the tab is hidden and doesn't run under reduced motion (icons
 * stay where they start).
 */
export function useFloatingIcons(ref: RefObject<HTMLElement | null>, seed = 7): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const rand = seeded(seed);
    const drifters: Drifter[] = Array.from(
      host.querySelectorAll<HTMLElement>(`[${FLOAT_ATTR}]`),
      (el) => {
        const heading = rand() * Math.PI * 2;
        const speed = MIN_SPEED + rand() * (MAX_SPEED - MIN_SPEED);
        return {
          el,
          x: rand(),
          y: rand(),
          vx: Math.cos(heading) * speed,
          vy: Math.sin(heading) * speed,
          angle: rand() * 360,
          spin: (rand() * 2 - 1) * MAX_SPIN,
        };
      },
    );

    let w = host.clientWidth;
    let h = host.clientHeight;
    const span = (size: number) => size + MARGIN * 2;
    const wrap = (v: number, size: number) => {
      const s = span(size);
      return ((((v + MARGIN) % s) + s) % s) - MARGIN;
    };

    const layout = () => {
      for (const d of drifters) {
        const x = wrap(d.x * w, w);
        const y = wrap(d.y * h, h);
        d.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${d.angle.toFixed(1)}deg)`;
      }
    };

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      for (const d of drifters) {
        // positions stay fractions of the host; wrap keeps them inside one span
        d.x = wrap(d.x * w + d.vx * dt, w) / w;
        d.y = wrap(d.y * h + d.vy * dt, h) / h;
        d.angle = (d.angle + d.spin * dt) % 360;
      }
      layout();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || reduced || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const resize = new ResizeObserver(() => {
      w = host.clientWidth;
      h = host.clientHeight;
      if (!raf) layout();
    });

    document.addEventListener('visibilitychange', onVisibility);
    resize.observe(host);
    layout();
    // nothing to move while the layer is still invisible; keeps the first second free for the entrance
    const delayed = window.setTimeout(start, START_MS);

    return () => {
      window.clearTimeout(delayed);
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      resize.disconnect();
    };
  }, [ref, seed, reduced]);
}
