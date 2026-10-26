import { useRef } from 'react';
import { skills } from '../../data/skills';
import { CONVEYOR_PLATE_ATTR, useConveyor } from '../../hooks/useConveyor';
import Plate from './Plate';
import styles from './Conveyor.module.css';

const SPACING = 168;
const PLATE = 128;
const SPEED = 22;

export default function Conveyor() {
  const ref = useRef<HTMLDivElement>(null);
  useConveyor(ref, { spacing: SPACING, plateWidth: PLATE, speed: SPEED });

  return (
    <div ref={ref} className={styles.conveyor} role="list" aria-label="skills">
      {skills.map((s) => (
        <div key={s.id} className={styles.slot} role="listitem" {...{ [CONVEYOR_PLATE_ATTR]: '' }}>
          <div className={styles.lift}>
            <Plate skillId={s.id} size={PLATE} />
          </div>
        </div>
      ))}
    </div>
  );
}
