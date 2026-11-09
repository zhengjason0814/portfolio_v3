import type { CSSProperties } from 'react';
import clsx from 'clsx';
import { skillById } from '../../data/skills';
import { usePlateStyle } from '../../hooks/usePlateStyle';
import emptyPlate from '../../assets/plate.webp';
import styles from './Plate.module.css';

// { 'python': url, 'js-ts': url, ... } keyed by file name, which is the skill id
function bySkillId(modules: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(modules).map(([path, url]) => [
      path
        .split('/')
        .pop()!
        .replace(/\.[^.]+$/, ''),
      url,
    ]),
  );
}

// each dish image is the food already on its plate; a skill with no dish gets the empty plate
const foods = bySkillId(
  import.meta.glob<string>('../../assets/foods/*.webp', { eager: true, import: 'default' }),
);
// the tech's own logo: the default, until the header switch serves the dishes
const logos = bySkillId(
  import.meta.glob<string>('../../assets/tech/*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
);

export interface PlateProps {
  skillId: string;
  size: number; // px
  showLabel?: boolean;
  className?: string;
}

export default function Plate({ skillId, size, showLabel = true, className }: PlateProps) {
  const style = usePlateStyle();
  const skill = skillById[skillId];
  if (!skill) {
    if (import.meta.env.DEV) console.warn(`Plate: unknown skill id "${skillId}"`);
    return null;
  }

  const vars = { '--plate-size': `${size}px` } as CSSProperties;
  const logo = style === 'logo' ? logos[skill.id] : undefined;

  return (
    <figure className={clsx(styles.plate, className)} style={vars}>
      <img
        // keyed so the new image fades in when the switch flips
        key={logo ? 'logo' : 'food'}
        className={clsx(styles.dish, logo && styles.logo)}
        src={logo ?? foods[skill.id] ?? emptyPlate}
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
