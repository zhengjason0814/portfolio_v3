import { setPlateStyle, usePlateStyle } from '../../hooks/usePlateStyle';
import styles from './PlateStyleSwitch.module.css';

/** swaps every plate from the tech's logo to its dish */
export default function PlateStyleSwitch() {
  const on = usePlateStyle() === 'food';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={styles.switch}
      title={on ? 'back to the tech logos' : 'serve each skill as a dish'}
      onClick={() => setPlateStyle(on ? 'logo' : 'food')}
    >
      <span className={styles.label}>feeling hungry?</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
    </button>
  );
}
