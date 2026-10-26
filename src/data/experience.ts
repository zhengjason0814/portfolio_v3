import marcomLogo from '../assets/logos/marcom.png';
import rebnyLogo from '../assets/logos/rebny.png';

// shared by experience and education
export interface Entry {
  id: string;
  org: string; // "Stony Brook University"
  title: string; // "B.S., information systems" / "front-end intern"
  date: string; // "sep 2025 – may 2026"
  blurb: string;
  logo: string; // resolved asset URL
}

// most recent first
export const experience: Entry[] = [
  {
    id: 'marcom',
    org: 'Stony Brook MARCOM',
    title: 'front-end intern',
    date: 'sep 2025 – may 2026',
    blurb: 'WCAG 2.1 compliant sites for 40,000+ monthly users; 15+ reusable CMS components.',
    logo: marcomLogo,
  },
  {
    id: 'rebny',
    org: 'REBNY',
    title: 'software engineering intern',
    date: 'jul – aug 2024',
    blurb: 'RAG chatbot on the OpenAI API; 25% fewer support tickets, 47+ hours saved.',
    logo: rebnyLogo,
  },
];
