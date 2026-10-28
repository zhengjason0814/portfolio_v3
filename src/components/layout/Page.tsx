import { useState, type ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  header: ReactNode;
  footer?: ReactNode; // the conveyor; sits at the bottom of the column
  viewKey: string; // changes when the main content changes, which plays its fade-in
  children: ReactNode;
}

export default function Page({ header, footer, viewKey, children }: PageProps) {
  // the first view enters as part of the load sequence; later views fade in as a whole
  const [firstKey, setFirstKey] = useState<string | null>(viewKey);
  if (firstKey !== null && viewKey !== firstKey) setFirstKey(null);
  const animateView = firstKey === null;

  return (
    <div className={styles.page}>
      {header}
      <main className={styles.main}>
        <div
          key={viewKey}
          className={styles.view}
          data-animate={animateView || undefined}
          data-first-load={!animateView || undefined}
        >
          {children}
        </div>
      </main>
      {footer && <footer className={`enter-up ${styles.footer}`}>{footer}</footer>}
    </div>
  );
}
