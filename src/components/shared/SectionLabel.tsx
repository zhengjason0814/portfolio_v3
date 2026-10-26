import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  id: string; // referenced by the section's aria-labelledby
  children: string;
}

export default function SectionLabel({ id, children }: SectionLabelProps) {
  return (
    <h2 id={id} className={styles.label}>
      {children}
    </h2>
  );
}
