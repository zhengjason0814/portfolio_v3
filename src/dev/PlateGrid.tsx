// Temporary visual check for step 3. Open the dev server at /#dev. Delete before deploy.
import Plate from '../components/plates/Plate';
import { skills } from '../data/skills';

const SIZES = [128, 56, 44];

export default function PlateGrid() {
  return (
    <div style={{ padding: 24 }}>
      {SIZES.map((size) => (
        <section key={size} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>{size} px</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {skills.map((s) => (
              <Plate key={s.id} skillId={s.id} size={size} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
