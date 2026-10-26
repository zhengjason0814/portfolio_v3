import type { FunctionComponent, SVGProps } from 'react';
import { blurb, headerLinks, name, tags, type HeaderLinkId, type Tab } from '../../data/about';
import Name from '../hero/Name';
import Blurb from '../hero/Blurb';
import Tags from '../hero/Tags';
import ResumeIcon from '../../assets/icons/resume.svg?react';
import GithubIcon from '../../assets/icons/github.svg?react';
import LinkedinIcon from '../../assets/icons/linkedin.svg?react';
import EmailIcon from '../../assets/icons/email.svg?react';
import Nav from './Nav';
import styles from './Header.module.css';

const icons: Record<HeaderLinkId, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  resume: ResumeIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: EmailIcon,
};

interface HeaderProps {
  active: Tab;
  onSelect: (tab: Tab) => void;
  onHover: (tab: Tab) => void;
  onLeave: () => void;
}

export default function Header({ active, onSelect, onHover, onLeave }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Name text={name} />
        <Blurb text={blurb} />
        <Tags items={tags} />
      </div>

      <div className={styles.side}>
        <Nav active={active} onSelect={onSelect} onHover={onHover} onLeave={onLeave} />
        <ul className={styles.links}>
          {headerLinks.map((l) => {
            const Icon = icons[l.id];
            const external = l.href.startsWith('http') || l.id === 'resume';
            return (
              <li key={l.id}>
                <a
                  className={styles.link}
                  href={l.href}
                  aria-label={l.label}
                  title={l.label}
                  {...(external && { target: '_blank', rel: 'noreferrer' })}
                >
                  <Icon width={20} height={20} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
