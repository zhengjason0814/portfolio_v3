import styles from './Blurb.module.css';

export default function Blurb({ text }: { text: string }) {
  return (
    <p className={styles.blurb}>
      {text}
      <span className={styles.cursor} aria-hidden="true" />
    </p>
  );
}
