import { projectsCopy, type Project } from '../../data/projects';
import TechStackTray from './TechStackTray';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project }: { project: Project | null }) {
  if (!project) {
    return (
      <div className={styles.hint}>
        <p>{projectsCopy.hint}</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h3 className={styles.name}>{project.name}</h3>
            {project.links.length > 0 && (
              <span className={styles.links}>
                {project.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </span>
            )}
          </div>
          <p className={styles.tagline}>{project.tagline}</p>
          <p className={styles.blurb}>{project.blurb}</p>
        </div>
        <img
          className={styles.shot}
          src={project.screenshot}
          alt={`screenshot of ${project.name}`}
          width={800}
          height={500}
        />
      </div>
      <TechStackTray project={project} />
    </div>
  );
}
