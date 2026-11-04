import clsx from 'clsx';
import type { Entry } from '../../data/experience';
import styles from './EntryCard.module.css';

interface EntryCardProps {
  entry: Entry;
  variant: 'work' | 'school';
}

export default function EntryCard({ entry, variant }: EntryCardProps) {
  const { org, title, date, blurb, bullets, involvements, logo } = entry;
  const size = variant === 'work' ? 88 : 96;

  const img = <img className={styles.logo} src={logo} alt={org} width={size} height={size} />;
  const list = bullets && (
    <ul className={styles.bullets}>
      {bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );

  if (variant === 'school') {
    return (
      <article className={clsx(styles.card, styles.school)}>
        {/* logo beside name / degree / date; honours and involvements run full width below */}
        <div className={styles.head}>
          {img}
          <div className={styles.text}>
            <h3 className={styles.heading}>{org}</h3>
            <p className={styles.degree}>{title}</p>
            <span className={styles.date}>{date}</span>
            {blurb && <p className={styles.blurb}>{blurb}</p>}
          </div>
        </div>
        {list}
        {involvements && (
          <p className={styles.involvements}>involvements: {involvements.join(', ')}</p>
        )}
      </article>
    );
  }

  return (
    <article className={clsx(styles.card, styles.work)}>
      {img}
      <div className={styles.text}>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.heading}>
          {title} · {org}
        </h3>
        <p className={styles.blurb}>{blurb}</p>
        {list}
      </div>
    </article>
  );
}
