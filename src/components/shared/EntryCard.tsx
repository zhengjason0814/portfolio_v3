import clsx from 'clsx';
import type { Entry } from '../../data/experience';
import styles from './EntryCard.module.css';

interface EntryCardProps {
  entry: Entry;
  variant: 'work' | 'school';
}

export default function EntryCard({ entry, variant }: EntryCardProps) {
  const { org, title, date, blurb, logo } = entry;
  const size = variant === 'work' ? 88 : 96;

  return (
    <article className={clsx(styles.card, styles[variant])}>
      <img className={styles.logo} src={logo} alt={org} width={size} height={size} />
      {variant === 'work' ? (
        <div className={styles.text}>
          <span className={styles.date}>{date}</span>
          <h3 className={styles.heading}>
            {title} · {org}
          </h3>
          <p className={styles.blurb}>{blurb}</p>
        </div>
      ) : (
        <div className={styles.text}>
          <h3 className={styles.heading}>{org}</h3>
          <p className={styles.degree}>{title}</p>
          <span className={styles.date}>{date}</span>
          <p className={styles.blurb}>{blurb}</p>
        </div>
      )}
    </article>
  );
}
