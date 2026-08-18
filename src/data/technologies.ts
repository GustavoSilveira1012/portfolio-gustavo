export interface Technology {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops'
  level: 'expert' | 'advanced' | 'intermediate'
  icon: string
  color: string
}

export const technologies: Technology[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    level: 'intermediate',
    icon: '⚛️',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 'intermediate',
    icon: '📘',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    level: 'intermediate',
    icon: '⚡',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'frontend',
    level: 'intermediate',
    icon: '📱',
    color: 'from-blue-400 to-purple-500',
  },
  {
    id: 'tailwindcss',
    name: 'TailwindCSS',
    category: 'frontend',
    level: 'intermediate',
    icon: '🎨',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'frontend',
    level: 'intermediate',
    icon: '✨',
    color: 'from-pink-400 to-purple-500',
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 'intermediate',
    icon: '🟢',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'restapis',
    name: 'REST APIs',
    category: 'backend',
    level: 'intermediate',
    icon: '🔗',
    color: 'from-indigo-400 to-purple-500',
  },

  // Database
  {
    id: 'sql',
    name: 'SQL',
    category: 'database',
    level: 'intermediate',
    icon: '🗄️',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    level: 'intermediate',
    icon: '🐘',
    color: 'from-blue-500 to-blue-700',
  },

  // DevOps & Cloud
  {
    id: 'aws',
    name: 'AWS',
    category: 'devops',
    level: 'intermediate',
    icon: '☁️',
    color: 'from-orange-400 to-yellow-500',
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'devops',
    level: 'intermediate',
    icon: '☁️',
    color: 'from-blue-400 to-red-500',
  },
  {
    id: 'mqtt',
    name: 'MQTT',
    category: 'devops',
    level: 'intermediate',
    icon: '📡',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'git',
    name: 'Git/GitHub',
    category: 'devops',
    level: 'intermediate',
    icon: '🐙',
    color: 'from-gray-400 to-gray-600',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'devops',
    level: 'intermediate',
    icon: '🐧',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'devops',
    level: 'intermediate',
    icon: '📊',
    color: 'from-yellow-400 to-orange-500',
  },
]
