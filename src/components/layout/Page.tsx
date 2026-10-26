import type { ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  header: ReactNode;
  footer?: ReactNode; // the conveyor; sits at the bottom of the column
  children: ReactNode;
}

export default function Page({ header, footer, children }: PageProps) {
  return (
    <div className={styles.page}>
      {header}
      <main className={styles.main}>{children}</main>
      {footer}
    </div>
  );
}
