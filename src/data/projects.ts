export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  caseStudy: {
    context: string
    objective: string
    scope: string[]
    note: string
    screenshotCaption: string
  }
  image: string
  technologies: string[]
  github: string
  demo: string
  demoLabel: string
  category: 'saas' | 'iot' | 'mobile' | 'ai' | 'dashboard' | 'web'
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Positivus landing page',
    description: 'Implementação da referência visual de uma agência digital, criada para a Parte 1 de um teste técnico da Asimov Academy.',
    longDescription: 'A Parte 1 do teste técnico foi documentada como uma implementação de Figma para código. O README do projeto registra ajustes manuais de espaçamento, cores, tipografia e integração de imagem.',
    caseStudy: {
      context: 'Teste técnico para uma vaga de Designer/Frontend Dev na Asimov Academy — Parte 1: Figma para código.',
      objective: 'Reproduzir uma landing page de agência digital a partir de uma referência visual.',
      scope: [
        'A página publicada apresenta navegação para serviços, cases, preços e blog, além de chamadas para orçamento.',
        'O README registra ajustes manuais de espaçamento, as cores #B9FF66 e #191A23, a tipografia Space Grotesk, a remoção da borda da navegação e a integração da imagem final do Figma.',
      ],
      note: 'Os percentuais exibidos nos cases da landing page fazem parte do conteúdo demonstrativo do layout; não são resultados atribuídos ao desenvolvimento.',
      screenshotCaption: 'Captura da navegação e da seção principal da implementação Positivus.',
    },
    image: '/Captura de tela 2026-08-20 160745.png',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/GustavoSilveira1012/asimov-test-gustavo-soares',
    demo: 'https://asimov-test-gustavo-soares.vercel.app/',
    demoLabel: 'Abrir demonstração',
    category: 'web',
  },
  {
    id: 2,
    title: 'Landing page Python + IA',
    description: 'Página de curso criada para a Parte 2 do mesmo teste técnico, com um hero desenvolvido do zero.',
    longDescription: 'O README do repositório identifica a Parte 2 como um hero criado do zero. A página publicada apresenta a oferta de um curso de Python e IA.',
    caseStudy: {
      context: 'Teste técnico para uma vaga de Designer/Frontend Dev na Asimov Academy — Parte 2: hero criado do zero.',
      objective: 'Apresentar visualmente uma oferta de curso de Python e IA em uma landing page.',
      scope: [
        'A página publicada inclui navegação, chamada principal, conteúdo do curso e chamadas para inscrição.',
        'O repositório documenta as duas partes como entregas distintas do teste técnico.',
      ],
      note: 'Os números de alunos, avaliações e carga horária visíveis na página são conteúdo promocional do layout; não são métricas verificadas do projeto ou credenciais do autor.',
      screenshotCaption: 'Captura da seção principal da landing page Python + IA.',
    },
    image: '/image.png',
    technologies: ['HTML', 'Tailwind CSS'],
    github: 'https://github.com/GustavoSilveira1012/asimov-test-gustavo-soares',
    demo: 'https://asimov-test-gustavo-soares-43za.vercel.app/',
    demoLabel: 'Abrir demonstração',
    category: 'web',
  },
  {
    id: 3,
    title: 'FreelaFlow',
    description: 'MVP full stack para organizar clientes, projetos e tarefas de freelancers em um só sistema.',
    longDescription: 'O README descreve um MVP com autenticação, gestão de clientes, projetos e tarefas, indicadores iniciais no dashboard e exportação de relatórios em PDF.',
    caseStudy: {
      context: 'MVP de gestão para freelancers, descrito no README do repositório.',
      objective: 'Centralizar clientes, projetos, tarefas e acompanhamento em um só produto.',
      scope: [
        'O README documenta cadastro e login, operações de criar, listar, editar e excluir clientes, projetos e tarefas, filtros e exportação de relatório em PDF.',
        'O escopo descrito também inclui um dashboard com indicadores iniciais e gráfico de ganhos mensais.',
      ],
      note: 'A captura disponível mostra o dashboard sem dados: os valores zerados e o gráfico vazio representam esse estado da tela, não um resultado de uso.',
      screenshotCaption: 'Captura do dashboard do FreelaFlow no estado vazio.',
    },
    image: '/FreelaFlow.png',
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    github: 'https://github.com/GustavoSilveira1012/Sistema_Freelancer',
    demo: 'https://sistema-freelancer-taupe.vercel.app/',
    demoLabel: 'Demo (login)',
    category: 'dashboard',
  },
]
