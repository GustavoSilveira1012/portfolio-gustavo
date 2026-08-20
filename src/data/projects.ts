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
    title: 'Positivus landing page',
    description: 'Landing page para agência de marketing digital com foco em crescimento e presença online.',
    longDescription: 'Landing page responsiva para uma agência de marketing digital, apresentando serviços de SEO, PPC, redes sociais, criação de conteúdo, cases de sucesso e chamadas para conversão.',
      image: '/Captura de tela 2026-08-20 160745.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Marketing Digital', 'SEO'],
    github: 'https://github.com/GustavoSilveira1012/asimov-test-gustavo-soares',
    demo: 'https://asimov-test-gustavo-soares.vercel.app/',
    category: 'web',
  },
  {
    id: 2,
    title: 'Landing page Python',
    description: 'Landing page para curso de Python e inteligência artificial com foco em projetos reais.',
    longDescription: 'Landing page educacional com proposta de curso prático de Python e IA, destacando trilha de aprendizado, comunidade, carga horária, benefícios e chamadas para inscrição.',
      image: '/image.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'IA'],
    github: 'https://github.com/GustavoSilveira1012/asimov-test-gustavo-soares',
    demo: 'https://asimov-test-gustavo-soares-43za.vercel.app/',
    category: 'ai',
  },
  {
    id: 3,
    title: 'FreelaFlow',
    description: 'Sistema full stack para gestão de freelancers, clientes, projetos e tarefas.',
    longDescription: 'MVP para centralizar o fluxo operacional de freelancers, com autenticação JWT, controle de clientes, projetos e tarefas, dashboard com métricas de receita e produtividade e exportação de relatórios em PDF.',
    image: '/FreelaFlow.png',
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/GustavoSilveira1012/Sistema_Freelancer',
    demo: 'https://sistema-freelancer-taupe.vercel.app/',
    category: 'dashboard',
  },
]
