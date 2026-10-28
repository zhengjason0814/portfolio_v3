import { useRef, type CSSProperties } from 'react';
import { skills } from '../../data/skills';
import { CONVEYOR_PLATE_ATTR, useConveyor } from '../../hooks/useConveyor';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Plate from './Plate';
import styles from './Conveyor.module.css';

const SPEED = 22;
// plate width, slot spacing, strip height
const FULL = { plate: 128, spacing: 168, height: 200 };
const COMPACT = { plate: 104, spacing: 140, height: 168 }; // short windows (matches Page)
const COMPACT_QUERY = '(max-height: 780px)';

interface ConveyorProps {
  ghosts?: readonly string[]; // skill ids shown faded and grey (their twins are in the tray)
  collapsed?: boolean; // folded away while the skills shelves show
  shaking?: boolean; // while the skills nav item is hovered
}

export default function Conveyor({
  ghosts = [],
  collapsed = false,
  shaking = false,
}: ConveyorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useMediaQuery(COMPACT_QUERY) ? COMPACT : FULL;
  // nothing moves while it's folded away, so the loop stops
  useConveyor(ref, {
    spacing: size.spacing,
    plateWidth: size.plate,
    speed: SPEED,
    paused: collapsed,
  });
  const vars = {
    '--conveyor-h': `${size.height}px`,
    '--plate': `${size.plate}px`,
  } as CSSProperties;

  return (
    <div
      className={styles.fold}
      style={vars}
      data-collapsed={collapsed || undefined}
      aria-hidden={collapsed}
    >
      <div
        ref={ref}
        className={styles.conveyor}
        data-shaking={(shaking && !collapsed) || undefined}
        role="list"
        aria-label="skills"
      >
        {skills.map((s) => (
          <div
            key={s.id}
            className={styles.slot}
            role="listitem"
            data-ghost={ghosts.includes(s.id) || undefined}
            // a ghost repeats a plate that is in the tray; its faded label is an inactive state
            aria-hidden={ghosts.includes(s.id) || undefined}
            {...{ [CONVEYOR_PLATE_ATTR]: s.id }}
          >
            <div className={styles.lift}>
              <Plate skillId={s.id} size={size.plate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
