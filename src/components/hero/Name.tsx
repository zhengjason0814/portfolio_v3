import styles from './Name.module.css';

export default function Name({ text }: { text: string }) {
  return (
    <h1 className={`enter ${styles.name}`}>
      <span className={styles.text} data-text={text}>
        {text}
      </span>
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
