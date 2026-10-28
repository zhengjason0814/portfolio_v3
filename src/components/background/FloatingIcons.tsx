import { useRef, type CSSProperties } from 'react';
import { FLOAT_ATTR, useFloatingIcons } from '../../hooks/useFloatingIcons';
import Racket from '../../assets/icons/racket.svg?react';
import Shuttle from '../../assets/icons/shuttle.svg?react';
import Pad from '../../assets/icons/pad.svg?react';
import Pan from '../../assets/icons/pan.svg?react';
import Bone from '../../assets/icons/bone.svg?react';
import Laptop from '../../assets/icons/laptop.svg?react';
import styles from './FloatingIcons.module.css';

const ICONS = [Racket, Shuttle, Pad, Pan, Bone, Laptop];
const COUNT = 26;

// size and opacity cycle on co-prime steps so neighbours rarely match
const instances = Array.from({ length: COUNT }, (_, i) => ({
  Icon: ICONS[i % ICONS.length],
  size: 18 + ((i * 7) % 5) * 3, // 18…30 px
  opacity: 0.12 + ((i * 3) % 6) * 0.02, // 12…22 %
}));

/** decorative layer behind the page: line icons drifting slowly */
export default function FloatingIcons() {
  const ref = useRef<HTMLDivElement>(null);
  useFloatingIcons(ref);

  return (
    <div ref={ref} className={styles.layer} aria-hidden="true">
      {instances.map(({ Icon, size, opacity }, i) => (
        <span
          key={i}
          className={styles.icon}
          style={{ '--size': `${size}px`, opacity } as CSSProperties}
          {...{ [FLOAT_ATTR]: '' }}
        >
          <Icon />
        </span>
      ))}
    </div>
  );
}
