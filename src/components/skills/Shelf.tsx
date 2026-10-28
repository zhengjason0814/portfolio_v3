import { useId } from 'react';
import type { Skill } from '../../data/skills';
import { FLY_ID_ATTR } from '../../hooks/useFlyIn';
import Plate from '../plates/Plate';
import styles from './Shelf.module.css';

const PLATE = 56;

interface ShelfProps {
  label: string;
  skills: readonly Skill[];
}

/** one category: a tag, a plank, and its plates sitting on the plank */
export default function Shelf({ label, skills }: ShelfProps) {
  const tagId = useId();
  return (
    <div className={styles.shelf}>
      <span id={tagId} className={styles.tag}>
        {label}
      </span>
      <ul className={styles.row} aria-labelledby={tagId}>
        {skills.map((s) => (
          <li key={s.id}>
            {/* sized to the plate, so a flight scales from the conveyor plate's width */}
            <div className={styles.fly} {...{ [FLY_ID_ATTR]: s.id }}>
              <Plate skillId={s.id} size={PLATE} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
