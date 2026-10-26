import { useId } from 'react';
import { education } from '../../data/education';
import SectionLabel from '../shared/SectionLabel';
import EntryCard from '../shared/EntryCard';
import styles from './Education.module.css';

export default function Education() {
  const labelId = useId();
  return (
    <section className={styles.section} aria-labelledby={labelId}>
      <SectionLabel id={labelId}>education</SectionLabel>
      <ul className={styles.list}>
        {education.map((e) => (
          <li key={e.id}>
            <EntryCard entry={e} variant="school" />
          </li>
        ))}
      </ul>
    </section>
  );
}
