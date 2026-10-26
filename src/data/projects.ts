export type ProjectId = 'bread' | 'liftsafe' | 'chatty';

export interface Project {
  id: ProjectId;
  name: string;
  tagline: string; // one line under the name in the menu
  blurb: string;
  links: { label: 'live' | 'code'; href: string }[];
  stack: string[]; // skill ids → plates in the tray
  extras: string[]; // tech with no plate → chips under "additional"
  icon: 'bread' | 'dumbbell' | 'chat';
  screenshot?: string; // path under assets/screenshots
}

export const projects: Project[] = [
  {
    id: 'bread',
    name: 'Bread',
    tagline: 'finance app with its own ML service',
    blurb:
      'a finance app that syncs bank transactions, sorts them with a tf-idf classifier, flags unusual spending, and forecasts next month as a range.',
    links: [
      { label: 'live', href: 'https://bread-topaz.vercel.app' },
      { label: 'code', href: 'https://github.com/zhengjason0814/bread' },
    ],
    stack: ['react', 'express', 'fastapi', 'mongodb', 'redis', 'pandas', 'sklearn'],
    extras: [],
    icon: 'bread',
  },
  {
    id: 'liftsafe',
    name: 'liftsafe',
    tagline: 'lifting form feedback with vision and voice',
    blurb:
      'real-time lifting form feedback with computer vision and voice. 3rd place at HopperHacks 2026; 92% pose accuracy.',
    // TODO: add code link (and/or devpost: https://devpost.com/software/liftsafe-c957kw)
    links: [],
    stack: ['python'],
    extras: ['MediaPipe', 'OpenCV', 'ElevenLabs'],
    icon: 'dumbbell',
  },
  {
    id: 'chatty',
    name: 'chatty',
    tagline: 'language exchange with chat and video',
    blurb:
      'a language-exchange app with real-time chat and video calls, JWT auth, under 200 ms messaging latency.',
    // TODO: add code link
    links: [{ label: 'live', href: 'https://chatty-c3so.onrender.com' }],
    stack: ['react', 'node', 'mongodb'],
    extras: ['GetStream'],
    icon: 'chat',
  },
];

export const projectsCopy = {
  hint: 'pick a dish from the menu — its plates will come up from the kitchen.',
  trayLabel: 'tech stack',
  extrasLabel: 'additional',
  screenshotPending: 'screenshot coming soon',
};

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<
  ProjectId,
  Project
>;
