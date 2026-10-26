export type Tab = 'about' | 'experience' | 'projects' | 'education' | 'skills';

export const tabs: { id: Tab; label: string }[] = [
  { id: 'about', label: 'about me' },
  { id: 'experience', label: 'experiences' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'education' },
  { id: 'skills', label: 'skills' },
];

export type HeaderLinkId = 'resume' | 'github' | 'linkedin' | 'email';

export interface HeaderLink {
  id: HeaderLinkId; // matches assets/icons/<id>.svg
  label: string; // aria-label
  href: string;
}

export const name = 'Jason Zheng';

export const blurb =
  'software engineer. i build full-stack apps and the data and ML pieces behind them, and i like figuring out why things break.';

export const tags = ['Georgia Tech', 'Stony Brook', 'NYC', 'software developer'];

export const headerLinks: HeaderLink[] = [
  { id: 'resume', label: 'resume', href: '/jasonResume.pdf' },
  { id: 'github', label: 'github', href: 'https://github.com/zhengjason0814' },
  { id: 'linkedin', label: 'linkedin', href: 'https://www.linkedin.com/in/zhengjason08/' },
  { id: 'email', label: 'email', href: 'mailto:jasonzheng0814@gmail.com' },
];

export const aboutParagraphs = [
  'Stony Brook B.S. in information systems, 2026. now pursuing an M.S. in computer science at Georgia Tech.',
  "what i like most about software is that it's open-ended: with the right idea, you can build almost anything. i've built AI chatbots, accessible university websites, and a personal finance app with its own ML service.",
  "outside of code, i'm usually cooking, which turns out to be pretty similar: the right ingredients, a bit of creativity, and something good comes out.",
];
