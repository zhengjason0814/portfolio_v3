import { useSyncExternalStore } from 'react';

/** what the plates show: each tech's own logo (default), or the dishes */
export type PlateStyle = 'food' | 'logo';

const KEY = 'plate-style';
const listeners = new Set<() => void>();

function read(): PlateStyle {
  try {
    return localStorage.getItem(KEY) === 'food' ? 'food' : 'logo';
  } catch {
    return 'logo'; // storage blocked: logos, and the switch still works for this visit
  }
}

let current: PlateStyle = typeof window === 'undefined' ? 'logo' : read();

export function setPlateStyle(next: PlateStyle): void {
  if (next === current) return;
  current = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // not remembered across visits; nothing else to do
  }
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** shared by every plate on the page; remembered across visits */
export function usePlateStyle(): PlateStyle {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => 'logo',
  );
}
