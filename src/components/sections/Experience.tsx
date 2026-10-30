import { useId } from 'react';
import { experience, experienceNote } from '../../data/experience';
import SectionLabel from '../shared/SectionLabel';
import EntryCard from '../shared/EntryCard';
import styles from './Experience.module.css';

export default function Experience() {
  const labelId = useId();
  return (
    <section className={styles.section} aria-labelledby={labelId}>
      <SectionLabel id={labelId}>experiences</SectionLabel>
      <ul className={styles.list}>
        {experience.map((e) => (
          <li key={e.id}>
            <EntryCard entry={e} variant="work" />
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        {experienceNote.text}{' '}
        <a href={experienceNote.href} target="_blank" rel="noreferrer">
          {experienceNote.linkLabel}
        </a>
        .
      </p>
    </section>
  );
}
