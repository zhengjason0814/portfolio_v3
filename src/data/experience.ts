import marcomLogo from '../assets/logos/marcom.png';
import rebnyLogo from '../assets/logos/rebny.png';

// shared by experience and education
export interface Entry {
  id: string;
  org: string; // "Stony Brook University"
  title: string; // "B.S., information systems" / "front-end intern"
  date: string; // "sep 2025 – may 2026"
  blurb: string;
  bullets?: string[]; // what was done there, shown under the blurb
  logo: string; // resolved asset URL
}

// most recent first
export const experience: Entry[] = [
  {
    id: 'marcom',
    org: 'Stony Brook MARCOM',
    title: 'front-end developer intern',
    date: 'sep 2025 – may 2026',
    blurb: 'marketing & communications department.',
    bullets: [
      'built responsive pages and 15+ reusable CMS components in HTML, CSS and Bootstrap, speeding up new site launches.',
      'worked with the web team to find and fix accessibility issues, keeping sites WCAG 2.1 compliant for 40,000+ students, faculty and visitors.',
    ],
    logo: marcomLogo,
  },
  {
    id: 'rebny',
    org: 'REBNY',
    title: 'software engineering intern',
    date: 'summer 2024',
    blurb: 'the Real Estate Board of New York.',
    bullets: [
      'proposed and led the plan for an AI assistant on the company lease site.',
      'built it as a full-stack RAG chatbot on the OpenAI API, running 24/7; 25% fewer support tickets and 47+ hours saved.',
      'took the first working prototype through to the official deployment.',
    ],
    logo: rebnyLogo,
  },
];

export const experienceNote = {
  text: 'for non-technical roles, see my',
  linkLabel: 'LinkedIn',
  href: 'https://www.linkedin.com/in/zhengjason08/',
};
