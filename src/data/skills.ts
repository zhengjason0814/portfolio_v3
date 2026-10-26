export type SkillCategory = 'languages' | 'frameworks' | 'data' | 'infra';

export interface Skill {
  id: string; // matches assets/foods/<id>.svg
  label: string; // shown under the plate
  fullName: string; // tooltip
  category: SkillCategory;
  colors: [string, string]; // --c1, --c2 brand colours used by the food SVG
}

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: 'languages', label: 'languages' },
  { id: 'frameworks', label: 'frameworks' },
  { id: 'data', label: 'data & ML' },
  { id: 'infra', label: 'databases & infra' },
];

// conveyor order
export const skills: Skill[] = [
  // languages
  {
    id: 'python',
    label: 'Python',
    fullName: 'Python',
    category: 'languages',
    colors: ['#306998', '#FFD43B'],
  },
  {
    id: 'js-ts',
    label: 'JS / TS',
    fullName: 'JavaScript / TypeScript',
    category: 'languages',
    colors: ['#F7DF1E', '#007ACC'],
  },
  {
    id: 'java',
    label: 'Java',
    fullName: 'Java',
    category: 'languages',
    colors: ['#EA2D2E', '#5382A1'],
  },
  {
    id: 'cpp',
    label: 'C++',
    fullName: 'C++',
    category: 'languages',
    colors: ['#00599C', '#00599C'],
  },
  {
    id: 'c',
    label: 'C',
    fullName: 'C',
    category: 'languages',
    colors: ['#5C6E80', '#A9BACD'],
  },

  // frameworks
  {
    id: 'react',
    label: 'React',
    fullName: 'React',
    category: 'frameworks',
    colors: ['#61DAFB', '#20232A'],
  },
  {
    id: 'node',
    label: 'Node.js',
    fullName: 'Node.js',
    category: 'frameworks',
    colors: ['#339933', '#F2B134'],
  },
  {
    id: 'express',
    label: 'Express',
    fullName: 'Express',
    category: 'frameworks',
    colors: ['#222222', '#222222'],
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    fullName: 'FastAPI',
    category: 'frameworks',
    colors: ['#049688', '#049688'],
  },

  // data & ML
  {
    id: 'pandas',
    label: 'pandas',
    fullName: 'pandas',
    category: 'data',
    colors: ['#150458', '#FFCA00'],
  },
  {
    id: 'numpy',
    label: 'NumPy',
    fullName: 'NumPy',
    category: 'data',
    colors: ['#4DABCF', '#013243'],
  },
  {
    id: 'sklearn',
    label: 'scikit-learn',
    fullName: 'scikit-learn',
    category: 'data',
    colors: ['#F7931E', '#29ABE2'],
  },
  {
    id: 'pytorch',
    label: 'PyTorch',
    fullName: 'PyTorch',
    category: 'data',
    colors: ['#EE4C2C', '#252525'],
  },

  // databases & infra
  {
    id: 'mongodb',
    label: 'MongoDB',
    fullName: 'MongoDB',
    category: 'infra',
    colors: ['#00ED64', '#47A248'],
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    fullName: 'PostgreSQL',
    category: 'infra',
    colors: ['#336791', '#336791'],
  },
  {
    id: 'redis',
    label: 'Redis',
    fullName: 'Redis',
    category: 'infra',
    colors: ['#D82C20', '#A41E11'],
  },
  {
    id: 'git',
    label: 'Git',
    fullName: 'Git',
    category: 'infra',
    colors: ['#F34F29', '#F34F29'],
  },
  {
    id: 'docker',
    label: 'Docker',
    fullName: 'Docker',
    category: 'infra',
    colors: ['#00AADA', '#00AADA'],
  },
  {
    id: 'aws',
    label: 'AWS',
    fullName: 'Amazon Web Services',
    category: 'infra',
    colors: ['#FF9900', '#232F3E'],
  },
];

export const skillById = Object.fromEntries(skills.map((s) => [s.id, s])) as Record<string, Skill>;
