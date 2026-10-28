import { useState } from 'react';
import Page from './components/layout/Page';
import FloatingIcons from './components/background/FloatingIcons';
import Header from './components/layout/Header';
import Conveyor from './components/plates/Conveyor';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import type { Tab } from './data/about';
import { projectById, type ProjectId } from './data/projects';

const NO_GHOSTS: readonly string[] = [];

export default function App() {
  const [tab, setTab] = useState<Tab>('about');
  const [hover, setHover] = useState<Tab | null>(null);
  const [project, setProject] = useState<ProjectId | null>(null);
  // hover never changes the view; it only lets the conveyor shake while skills is hovered
  const handleHover = (t: Tab) => setHover(t);
  const handleLeave = () => setHover(null);
  // clicking the selected project again deselects it
  const toggleProject = (id: ProjectId) => setProject((p) => (p === id ? null : id));

  // sections only change on click
  const view = tab;
  const teasingSkills = hover === 'skills' && tab !== 'skills';

  // the selected project's plates are in its tray, so their conveyor twins fade while it shows
  const ghosts = view === 'projects' && project ? projectById[project].stack : NO_GHOSTS;

  return (
    <>
      <FloatingIcons />
      <Page
        viewKey={view}
        header={
          <Header active={tab} onSelect={setTab} onHover={handleHover} onLeave={handleLeave} />
        }
        footer={<Conveyor ghosts={ghosts} collapsed={view === 'skills'} shaking={teasingSkills} />}
      >
        {/* each section mounts fresh when the view changes, which replays its entry animation */}
        {view === 'about' && <About />}
        {view === 'experience' && <Experience />}
        {view === 'education' && <Education />}
        {view === 'projects' && <Projects selected={project} onSelect={toggleProject} />}
        {view === 'skills' && <Skills />}
      </Page>
    </>
  );
}
