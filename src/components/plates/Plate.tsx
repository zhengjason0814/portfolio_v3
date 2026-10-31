import type { CSSProperties } from 'react';
import clsx from 'clsx';
import { skillById } from '../../data/skills';
import emptyPlate from '../../assets/plate.webp';
import styles from './Plate.module.css';

// { 'python': url, 'js-ts': url, ... } — each image is the dish already on its plate;
// a skill with no file gets the empty plate.
const foodModules = import.meta.glob<string>('../../assets/foods/*.webp', {
  eager: true,
  import: 'default',
});
const foods: Record<string, string> = Object.fromEntries(
  Object.entries(foodModules).map(([path, url]) => [
    path.split('/').pop()!.replace('.webp', ''),
    url,
  ]),
);

export interface PlateProps {
  skillId: string;
  size: number; // px
  showLabel?: boolean;
  className?: string;
}

export default function Plate({ skillId, size, showLabel = true, className }: PlateProps) {
  const skill = skillById[skillId];
  if (!skill) {
    if (import.meta.env.DEV) console.warn(`Plate: unknown skill id "${skillId}"`);
    return null;
  }

  const vars = { '--plate-size': `${size}px` } as CSSProperties;

  return (
    <figure className={clsx(styles.plate, className)} style={vars}>
      <img
        className={styles.dish}
        src={foods[skill.id] ?? emptyPlate}
        alt={skill.fullName}
        title={skill.fullName}
        width={size}
        height={size}
        decoding="async"
        draggable={false}
      />
      {showLabel && <figcaption className={styles.label}>{skill.label}</figcaption>}
    </figure>
  );
}
