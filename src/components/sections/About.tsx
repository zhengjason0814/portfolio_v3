import { useId } from 'react';
import { aboutBody, aboutLead, name } from '../../data/about';
import photo from '../../assets/photo.jpg';
import SectionLabel from '../shared/SectionLabel';
import styles from './About.module.css';

export default function About() {
  const labelId = useId();
  return (
    <section className={styles.section} aria-labelledby={labelId}>
      <SectionLabel id={labelId}>about me</SectionLabel>
      <div className={styles.body}>
        <img className={styles.photo} src={photo} alt={name} width={240} height={240} />
        <div className={styles.text}>
          <p className={styles.lead}>{aboutLead}</p>
          {aboutBody.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
