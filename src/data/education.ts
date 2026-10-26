import gatechLogo from '../assets/logos/gatech.png';
import stonybrookLogo from '../assets/logos/stonybrook.png';
import type { Entry } from './experience';

export type { Entry };

// most recent first
export const education: Entry[] = [
  {
    id: 'gatech',
    org: 'Georgia Tech',
    title: 'M.S., computer science',
    date: 'expected dec 2028',
    blurb: "online master's (OMSCS), in progress.",
    logo: gatechLogo,
  },
  {
    id: 'stonybrook',
    org: 'Stony Brook University',
    title: 'B.S., information systems',
    date: 'may 2026',
    blurb: 'graduated 2026.',
    logo: stonybrookLogo,
  },
];
