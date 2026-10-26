import { useEffect, useRef, useState } from 'react';
import Page from './components/layout/Page';
import Header from './components/layout/Header';
import { tabs, type Tab } from './data/about';
import type { ProjectId } from './data/projects';
import PlateGrid from './dev/PlateGrid';

const LEAVE_DELAY = 30; // ms; stops a flash when moving between adjacent nav items

export default function App() {
  const [tab, setTab] = useState<Tab | null>(null);
  const [hover, setHover] = useState<Tab | null>(null);
  const [project, setProject] = useState<ProjectId | null>(null);
  const leaveTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  const handleHover = (t: Tab) => {
    window.clearTimeout(leaveTimer.current);
    setHover(t);
  };
  const handleLeave = () => {
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setHover(null), LEAVE_DELAY);
  };
  const goHome = () => {
    setTab(null);
    setProject(null);
  };

  // skills never previews on hover: the main area stays blank while hovering it
  const view: Tab | null = hover === 'skills' ? null : (hover ?? tab);

  if (import.meta.env.DEV && window.location.hash === '#dev') return <PlateGrid />;

  return (
    <Page
      header={
        <Header
          active={tab}
          onHome={goHome}
          onSelect={setTab}
          onHover={handleHover}
          onLeave={handleLeave}
        />
      }
    >
      {/* placeholder until step 5 */}
      {view && (
        <p style={{ fontSize: 'var(--text-label)', color: 'var(--muted)' }}>
          {tabs.find((t) => t.id === view)?.label}
          {project && ` · ${project}`}
        </p>
      )}
    </Page>
  );
}
