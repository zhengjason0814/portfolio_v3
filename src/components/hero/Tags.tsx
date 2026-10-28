import styles from './Tags.module.css';

export default function Tags({ items }: { items: string[] }) {
  return <p className={`enter ${styles.tags}`}>{items.join(' · ')}</p>;
}
