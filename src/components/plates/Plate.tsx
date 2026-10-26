import type { CSSProperties, FunctionComponent, SVGProps } from 'react';
import clsx from 'clsx';
import { skillById } from '../../data/skills';
import PlateSvg from '../../assets/plate.svg?react';
import styles from './Plate.module.css';

type SvgComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

// { 'python': Component, 'js-ts': Component, ... } — a skill with no file is simply absent.
const foodModules = import.meta.glob<SvgComponent>('../../assets/foods/*.svg', {
  eager: true,
  query: '?react',
  import: 'default',
});
const foods: Record<string, SvgComponent> = Object.fromEntries(
  Object.entries(foodModules).map(([path, mod]) => [
    path.split('/').pop()!.replace('.svg', ''),
    mod,
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

  const Food = foods[skill.id];
  const vars = {
    '--plate-size': `${size}px`,
    '--c1': skill.colors[0],
    '--c2': skill.colors[1],
  } as CSSProperties;

  return (
    <figure className={clsx(styles.plate, className)} style={vars}>
      <div className={styles.dish} role="img" aria-label={skill.fullName} title={skill.fullName}>
        <PlateSvg className={styles.base} />
        {Food && <Food className={styles.food} />}
      </div>
      {showLabel && <figcaption className={styles.label}>{skill.label}</figcaption>}
    </figure>
  );
}
