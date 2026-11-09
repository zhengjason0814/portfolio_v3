import { useId, type CSSProperties, type ReactNode } from 'react';
import type { Certification, Skill } from '../../data/skills';
import { FLY_ID_ATTR } from '../../hooks/useFlyIn';
import Plate from '../plates/Plate';
import styles from './Shelf.module.css';

const PLATE = 56;

/** a tag, a plank, and whatever sits on the plank */
function Frame({ label, children }: { label: string; children: ReactNode }) {
  const tagId = useId();
  return (
    <div className={styles.shelf}>
      <span id={tagId} className={styles.tag}>
        {label}
      </span>
      <ul className={styles.row} aria-labelledby={tagId}>
        {children}
      </ul>
    </div>
  );
}

interface ShelfProps {
  label: string;
  skills: readonly Skill[];
}

/** one category: its plates sitting on the plank */
export default function Shelf({ label, skills }: ShelfProps) {
  return (
    <Frame label={label}>
      {skills.map((s) => (
        <li key={s.id}>
          {/* sized to the plate, so a flight scales from the conveyor plate's width */}
          <div className={styles.fly} {...{ [FLY_ID_ATTR]: s.id }}>
            <Plate skillId={s.id} size={PLATE} />
          </div>
        </li>
      ))}
    </Frame>
  );
}

interface CertShelfProps {
  label: string;
  certs: readonly Certification[];
  delay?: number; // ms before the badge drops in
}

/** badges on the plank, captioned like the plates; they drop in rather than fly from the belt */
export function CertShelf({ label, certs, delay = 0 }: CertShelfProps) {
  return (
    <Frame label={label}>
      {certs.map((c) => (
        <li key={c.id} style={{ '--drop-delay': `${delay}ms` } as CSSProperties}>
          <figure className={styles.cert} title={c.name}>
            <img className={styles.badge} src={c.badge} alt={c.name} width={PLATE} height={PLATE} />
            <figcaption className={styles.caption}>{c.short}</figcaption>
          </figure>
        </li>
      ))}
    </Frame>
  );
}
