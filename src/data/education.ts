import gatechLogo from '../assets/logos/gatech.png';
import stonybrookLogo from '../assets/logos/stonybrook.png';
import type { Entry } from './experience';

export type { Entry };

// most recent first
export const education: Entry[] = [
  {
    id: 'gatech',
    org: 'Georgia Institute of Technology',
    title: 'M.S. Computer Science',
    date: 'expected dec 2028',
    blurb: "online master's (OMSCS), in progress.",
    logo: gatechLogo,
  },
  {
    id: 'stonybrook',
    org: 'Stony Brook University',
    title: 'B.S. Information Systems',
    date: 'may 2026',
    blurb: 'graduated 2026.',
    logo: stonybrookLogo,
  },
];
