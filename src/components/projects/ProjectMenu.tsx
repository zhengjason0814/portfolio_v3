import type { FunctionComponent, SVGProps } from 'react';
import { projects, type Project, type ProjectId } from '../../data/projects';
import BreadIcon from '../../assets/icons/bread.svg?react';
import DumbbellIcon from '../../assets/icons/dumbbell.svg?react';
import ChatIcon from '../../assets/icons/chat.svg?react';
import styles from './ProjectMenu.module.css';

const icons: Record<Project['icon'], FunctionComponent<SVGProps<SVGSVGElement>>> = {
  bread: BreadIcon,
  dumbbell: DumbbellIcon,
  chat: ChatIcon,
};

interface ProjectMenuProps {
  selected: ProjectId | null;
  onSelect: (id: ProjectId) => void;
}

export default function ProjectMenu({ selected, onSelect }: ProjectMenuProps) {
  return (
    <nav className={styles.menu} aria-label="projects">
      {projects.map((p) => {
        const Icon = icons[p.icon];
        return (
          <div key={p.id} className={styles.row}>
            {/* button comes first in the DOM so the icon can react to its hover/pressed state */}
            <button
              type="button"
              className={styles.card}
              aria-pressed={selected === p.id}
              onClick={() => onSelect(p.id)}
            >
              <span className={styles.name}>{p.name}</span>
              <span className={styles.tagline}>{p.tagline}</span>
            </button>
            <Icon className={styles.icon} width={24} height={24} aria-hidden="true" />
          </div>
        );
      })}
    </nav>
  );
}
