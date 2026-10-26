import { useEffect, useRef, useState } from 'react';
import Page from './components/layout/Page';
import Header from './components/layout/Header';
import Conveyor from './components/plates/Conveyor';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import { tabs, type Tab } from './data/about';
import type { ProjectId } from './data/projects';
import PlateGrid from './dev/PlateGrid';

const LEAVE_DELAY = 30; // ms; stops a flash when moving between adjacent nav items

export default function App() {
  const [tab, setTab] = useState<Tab>('about');
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
  // clicking the selected project again deselects it
  const toggleProject = (id: ProjectId) => setProject((p) => (p === id ? null : id));

  // skills never previews on hover: the main area stays blank while hovering it
  const view: Tab | null = hover === 'skills' ? null : (hover ?? tab);

  if (import.meta.env.DEV && window.location.hash === '#dev') return <PlateGrid />;

  return (
    <Page
      header={<Header active={tab} onSelect={setTab} onHover={handleHover} onLeave={handleLeave} />}
      footer={<Conveyor />}
    >
      {/* each section mounts fresh when the view changes, which replays its entry animation */}
      {view === 'about' && <About />}
      {view === 'experience' && <Experience />}
      {view === 'education' && <Education />}
      {view === 'projects' && <Projects selected={project} onSelect={toggleProject} />}
      {/* placeholder until step 8 */}
      {view === 'skills' && (
        <p style={{ fontSize: 'var(--text-label)', color: 'var(--muted)' }}>
          {tabs.find((t) => t.id === view)?.label}
        </p>
      )}
    </Page>
  );
}
