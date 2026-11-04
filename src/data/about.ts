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
  'software engineer. i build things to make someone’s day a little more interesting.';

export const tags = ['software developer', 'nyc', 'georgia tech', 'stony brook'];

export const headerLinks: HeaderLink[] = [
  { id: 'resume', label: 'resume', href: '/jasonResume.pdf' },
  { id: 'github', label: 'github', href: 'https://github.com/zhengjason0814' },
  { id: 'linkedin', label: 'linkedin', href: 'https://www.linkedin.com/in/zhengjason08/' },
  { id: 'email', label: 'email', href: 'mailto:jasonzheng0814@gmail.com' },
];

export const aboutLead =
  'Stony Brook B.S. in information systems, 2026. now pursuing an M.S. in computer science at Georgia Tech.';

export const aboutBody = [
  'what i admire about software is that it’s open-ended: with just an idea, you can build anything. In the past, I’ve held internships, won podium placements in hackathons, and built projects, each a step toward being an engineer who can bridge the gap between imagination and product.',
  'outside of tech, another passion is learning skills! some examples i’ve been getting into include cooking and video editing, both of which have a similarity to my interest of how ideas can take you anywhere. i take pride in my ability to learn, and I’m proudest when i do something challenging. ',
];
