import { tabs, type Tab } from '../../data/about';
import styles from './Nav.module.css';

interface NavProps {
  active: Tab | null;
  onSelect: (tab: Tab) => void;
  onHover: (tab: Tab) => void;
  onLeave: () => void;
}

export default function Nav({ active, onSelect, onHover, onLeave }: NavProps) {
  return (
    <nav className={`enter ${styles.nav}`} aria-label="sections">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={styles.tab}
          aria-pressed={active === t.id}
          onClick={() => onSelect(t.id)}
          onMouseEnter={() => onHover(t.id)}
          onMouseLeave={onLeave}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
