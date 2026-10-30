import breadShot from '../assets/screenshots/bread.jpg';
import liftsafeShot from '../assets/screenshots/liftsafe.jpg';
import chattyShot from '../assets/screenshots/chatty.jpg';
import bootyRushShot from '../assets/screenshots/booty-rush.jpg';
import productStoreShot from '../assets/screenshots/product-store.jpg';
import walmartShot from '../assets/screenshots/walmart-rfid.jpg';
import inquiryShot from '../assets/screenshots/inquiry-responder.jpg';
import calculatorShot from '../assets/screenshots/calculator.jpg';

export type ProjectId =
  | 'bread'
  | 'liftsafe'
  | 'chatty'
  | 'booty-rush'
  | 'product-store'
  | 'walmart-rfid'
  | 'inquiry-responder'
  | 'calculator';

export type ProjectIcon =
  'bread' | 'dumbbell' | 'chat' | 'coins' | 'cart' | 'tag' | 'bulb' | 'calculator';

export interface Project {
  id: ProjectId;
  name: string;
  tagline: string; // one line under the name
  blurb: string;
  links: { label: string; href: string }[];
  stack: string[]; // skill ids → plates in the tray
  extras: string[]; // tech with no plate → chips under "additional"
  icon: ProjectIcon; // matches assets/icons/<icon>.svg
  screenshot: string; // resolved asset URL
}

// menu order
export const projects: Project[] = [
  {
    id: 'bread',
    name: 'Bread',
    tagline: 'finance app with its own ML service',
    blurb:
      'connects to real bank accounts through Plaid and sorts transactions automatically. three ML models forecast spending, classify purchases and flag unusual charges. four containerised services, Redis caching, receipts to S3.',
    links: [
      { label: 'live', href: 'https://bread-topaz.vercel.app' },
      { label: 'code', href: 'https://github.com/zhengjason0814/bread' },
    ],
    stack: [
      'react',
      'js-ts',
      'node',
      'express',
      'mongodb',
      'python',
      'fastapi',
      'redis',
      'docker',
      'aws',
      'pandas',
      'sklearn',
    ],
    extras: ['Tailwind CSS', 'Plaid'],
    icon: 'bread',
    screenshot: breadShot,
  },
  {
    id: 'liftsafe',
    name: 'LiftSafe',
    tagline: 'lifting form feedback with vision and voice',
    blurb:
      'corrects your form on push-ups and bicep curls: MediaPipe tracks your body in real time, Gemini turns that into tips and ElevenLabs reads them out. 3rd place at HopperHacks 2026; 92% pose accuracy.',
    links: [{ label: 'devpost', href: 'https://devpost.com/software/liftsafe-c957kw' }],
    stack: ['python', 'js-ts', 'react'],
    extras: ['MediaPipe', 'OpenCV', 'Google Gemini', 'ElevenLabs', 'HTML', 'CSS'],
    icon: 'dumbbell',
    screenshot: liftsafeShot,
  },
  {
    id: 'chatty',
    name: 'Chatty',
    tagline: 'language exchange with chat and video',
    blurb:
      'chat and video call with other learners in real time to practise a language. JWT auth, under 200 ms messaging latency, and a theme switcher with light, dark and a handful of other looks.',
    links: [{ label: 'live', href: 'https://chatty-c3so.onrender.com' }],
    stack: ['js-ts', 'react', 'node', 'express', 'mongodb'],
    extras: ['GetStream', 'Tailwind CSS', 'HTML', 'CSS'],
    icon: 'chat',
    screenshot: chattyShot,
  },
  {
    id: 'booty-rush',
    name: 'Booty Rush',
    tagline: 'a pirate gambling game about the risks of gambling',
    blurb:
      'a silly pirate gambling game that shows how fast the house wins. 1st place in the Treasure Trove of Talent track at HopperHacks 2025.',
    links: [{ label: 'live', href: 'https://zhengjason0814.github.io/bootyRush/index.html' }],
    stack: ['js-ts'],
    extras: ['HTML', 'CSS'],
    icon: 'coins',
    screenshot: bootyRushShot,
  },
  {
    id: 'product-store',
    name: 'Product Store',
    tagline: 'my first MERN stack app',
    blurb:
      'add, edit, delete and browse products in a MongoDB database. hosted free on Render, so give it a minute to wake up.',
    links: [{ label: 'live', href: 'https://mern-product-store-wdmm.onrender.com/' }],
    stack: ['js-ts', 'react', 'node', 'express', 'mongodb'],
    extras: ['HTML', 'CSS'],
    icon: 'cart',
    screenshot: productStoreShot,
  },
  {
    id: 'walmart-rfid',
    name: 'Walmart RFID',
    tagline: 'department store inventory tracking demo',
    blurb:
      'a demo of a department store RFID system that tracks inventory and reports stock levels in real time.',
    links: [{ label: 'code', href: 'https://github.com/zhengjason0814/School-Projects' }],
    stack: ['java'],
    extras: [],
    icon: 'tag',
    screenshot: walmartShot,
  },
  {
    id: 'inquiry-responder',
    name: 'Inquiry Bot',
    tagline: 'customer service answers from a text file',
    blurb:
      'a demo customer service responder: feed it a text file of known issues and solutions and it answers inquiries with the matching fix.',
    links: [{ label: 'code', href: 'https://github.com/zhengjason0814/School-Projects' }],
    stack: ['java'],
    extras: [],
    icon: 'bulb',
    screenshot: inquiryShot,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    tagline: 'the basics, in the browser',
    blurb: 'an extremely basic online calculator for the four arithmetic operations.',
    links: [{ label: 'live', href: 'https://zhengjason0814.github.io/calculator/' }],
    stack: ['js-ts'],
    extras: ['HTML', 'CSS'],
    icon: 'calculator',
    screenshot: calculatorShot,
  },
];

export const projectsCopy = {
  hint: 'pick a dish from the menu — its plates will come up from the kitchen.',
  trayLabel: 'tech stack',
  extrasLabel: 'additional',
};

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<
  ProjectId,
  Project
>;
