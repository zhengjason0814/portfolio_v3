import type { ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  header: ReactNode;
  children: ReactNode;
}

export default function Page({ header, children }: PageProps) {
  return (
    <div className={styles.page}>
      {header}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
