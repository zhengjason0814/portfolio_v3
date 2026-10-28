import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Blurb.module.css';

const START_MS = 600; // once the blurb has risen in
const CHAR_MS = 26;
const PAUSE_MS = 220; // extra after a sentence or clause ends

export default function Blurb({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const shown = reduced ? text.length : typed;

  useEffect(() => {
    if (reduced) return;
    let n = 0;
    let timer = 0;
    const step = () => {
      n += 1;
      setTyped(n);
      if (n >= text.length) return;
      const pause = /[.,]/.test(text[n - 1]) ? PAUSE_MS : 0;
      timer = window.setTimeout(step, CHAR_MS + pause);
    };
    timer = window.setTimeout(step, START_MS);
    return () => window.clearTimeout(timer);
  }, [text, reduced]);

  const done = shown >= text.length;
  return (
    <p className={`enter ${styles.blurb}`}>
      {/* the full text, invisible, holds the final size so nothing shifts while typing */}
      <span className={styles.ghost} aria-hidden="true">
        {text}
      </span>
      <span className={styles.typed} aria-hidden="true">
        {text.slice(0, shown)}
        <span className={styles.cursor} data-blink={done || undefined} />
      </span>
      <span className={styles.srOnly}>{text}</span>
    </p>
  );
}
