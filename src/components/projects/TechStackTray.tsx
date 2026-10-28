import { useRef } from 'react';
import { projectsCopy, type Project } from '../../data/projects';
import { conveyorPlateSource } from '../../hooks/useConveyor';
import { FLY_ID_ATTR, useFlyIn } from '../../hooks/useFlyIn';
import Plate from '../plates/Plate';
import Chip from '../shared/Chip';
import styles from './TechStackTray.module.css';

const FLY = { stagger: 150, duration: 800, sourceFor: conveyorPlateSource };

export default function TechStackTray({ project }: { project: Project }) {
  const platesRef = useRef<HTMLDivElement>(null);
  useFlyIn(platesRef, project.id, FLY);

  return (
    <div className={styles.tray}>
      <span className={styles.label}>{projectsCopy.trayLabel}</span>
      <div
        ref={platesRef}
        className={styles.plates}
        role="list"
        aria-label={`tech stack for ${project.name}`}
      >
        {project.stack.map((id) => (
          <div key={id} role="listitem">
            {/* sized to the plate itself, so the flight scales from the conveyor plate's width */}
            <div className={styles.fly} {...{ [FLY_ID_ATTR]: id }}>
              <Plate skillId={id} size={44} />
            </div>
          </div>
        ))}
      </div>
      {project.extras.length > 0 && (
        <div className={styles.extras}>
          <span className={styles.extrasLabel}>{projectsCopy.extrasLabel}</span>
          {project.extras.map((x) => (
            <Chip key={x}>{x}</Chip>
          ))}
        </div>
      )}
    </div>
  );
}
