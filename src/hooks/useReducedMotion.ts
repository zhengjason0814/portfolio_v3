import { useMediaQuery } from './useMediaQuery';

/** true when the user has asked for reduced motion; updates live if the setting changes */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
