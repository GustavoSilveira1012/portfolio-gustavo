export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: 'saas' | 'iot' | 'mobile' | 'ai' | 'dashboard' | 'web'
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Sistema de Monitoramento Agrícola (Agrotech)',
    description: 'Plataforma IoT para monitoramento em tempo real de temperatura e umidade com sensores distribuídos.',
    longDescription: 'Sistema completo de monitoramento agrícola desenvolvido com React, Node.js e MQTT. Integra sensores de temperatura e umidade para coleta de dados em tempo real, oferecendo dashboard interativo para acompanhamento de plantações.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['React', 'Node.js', 'MQTT', 'IoT Sensors', 'APIs REST', 'SQL'],
    github: 'https://github.com/RyanALO/PI3-Sistema-Inteligente-para-o-Agronegocio',
    demo: '#',
    category: 'iot',
  },
  {
    id: 2,
    title: 'Plataforma de Aprendizado Duolingo-style',
    description: 'Aplicativo mobile em React Native com lições interativas integrado a serviços AWS.',
    longDescription: 'Plataforma de aprendizado moderno desenvolvida com React Native e integrada à AWS. Oferece lições interativas, progresso sincronizado em nuvem e experiência fluida em iOS e Android.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['React Native', 'AWS', 'Node.js', 'PostgreSQL', 'APIs REST'],
    github: 'https://github.com/GustavoSilveira1012/duolingo-tech/tree/mobile',
    demo: '#',
    category: 'mobile',
  },
  {
    id: 3,
    title: 'FreelaFlow',
    description: 'Sistema full stack para gestão de freelancers, clientes, projetos e tarefas.',
    longDescription: 'MVP para centralizar o fluxo operacional de freelancers, com autenticação JWT, controle de clientes, projetos e tarefas, dashboard com métricas de receita e produtividade e exportação de relatórios em PDF.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/GustavoSilveira1012/Sistema_Freelancer',
    demo: 'https://sistema-freelancer-taupe.vercel.app/',
    category: 'dashboard',
  },
]
