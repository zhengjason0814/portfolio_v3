import { useId } from 'react';
import { projectById, type ProjectId } from '../../data/projects';
import SectionLabel from '../shared/SectionLabel';
import ProjectMenu from '../projects/ProjectMenu';
import ProjectDetail from '../projects/ProjectDetail';
import styles from './Projects.module.css';

interface ProjectsProps {
  selected: ProjectId | null;
  onSelect: (id: ProjectId) => void;
}

export default function Projects({ selected, onSelect }: ProjectsProps) {
  const labelId = useId();
  return (
    <section className={styles.section} aria-labelledby={labelId}>
      <SectionLabel id={labelId}>projects</SectionLabel>
      <div className={styles.body}>
        <div className={styles.menu}>
          <ProjectMenu selected={selected} onSelect={onSelect} />
        </div>
        <div className={styles.detail}>
          {/* keyed so the detail's entry animation replays on each selection */}
          <ProjectDetail
            key={selected ?? 'none'}
            project={selected ? projectById[selected] : null}
          />
        </div>
      </div>
    </section>
  );
}
