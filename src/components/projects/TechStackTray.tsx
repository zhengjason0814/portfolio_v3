import { projectsCopy, type Project } from '../../data/projects';
import Plate from '../plates/Plate';
import Chip from '../shared/Chip';
import styles from './TechStackTray.module.css';

export default function TechStackTray({ project }: { project: Project }) {
  return (
    <div className={styles.tray}>
      <span className={styles.label}>{projectsCopy.trayLabel}</span>
      <div className={styles.plates} role="list" aria-label={`tech stack for ${project.name}`}>
        {project.stack.map((id) => (
          <div key={id} role="listitem">
            <Plate skillId={id} size={44} />
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
