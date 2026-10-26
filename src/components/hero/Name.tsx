import styles from './Name.module.css';

interface NameProps {
  text: string;
  onHome: () => void;
}

export default function Name({ text, onHome }: NameProps) {
  return (
    <h1 className={styles.name}>
      <button
        type="button"
        className={styles.home}
        data-text={text}
        onClick={onHome}
        aria-label={`${text}, back to home`}
      >
        {text}
      </button>
      <span className={styles.puffs} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </h1>
  );
}
