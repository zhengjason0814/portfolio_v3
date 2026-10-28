import { useId, useRef } from 'react';
import { skillCategories, skills } from '../../data/skills';
import { conveyorPlateSource } from '../../hooks/useConveyor';
import { useFlyIn } from '../../hooks/useFlyIn';
import SectionLabel from '../shared/SectionLabel';
import Shelf from '../skills/Shelf';
import styles from './Skills.module.css';

// conveyor order within each category
const shelves = skillCategories.map((c) => ({
  ...c,
  skills: skills.filter((s) => s.category === c.id),
}));

// the conveyor folds away as this mounts, so every start point is taken at the click
const FLY = {
  stagger: 70,
  duration: 800,
  sourceFor: conveyorPlateSource,
  requireBelow: true,
  measure: 'mount',
  delay: 450, // after the view's fade-in, which would dim plates already in the air
} as const;

export default function Skills() {
  const labelId = useId();
  const shelvesRef = useRef<HTMLDivElement>(null);
  // mounts on every visit, so the plates fly up every time skills is pressed
  useFlyIn(shelvesRef, null, FLY);

  return (
    <section className={styles.section} aria-labelledby={labelId}>
      <SectionLabel id={labelId}>skills</SectionLabel>
      <div ref={shelvesRef} className={styles.shelves}>
        {shelves.map((s) => (
          <Shelf key={s.id} label={s.label} skills={s.skills} />
        ))}
      </div>
    </section>
  );
}
