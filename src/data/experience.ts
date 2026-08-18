export interface Experience {
  id: number
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'freelance' | 'education' | 'project'
  technologies?: string[]
  date: string
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Suporte Técnico (Technology Support)',
    company: 'Beltis',
    period: 'Jan 2026 - Presente',
    description: 'Suporte a aplicações internas críticas ligadas a processos financeiros. Investigação e resolução de incidentes por análise de logs, reduzindo o tempo médio de diagnóstico. Ponte entre equipes de suporte e desenvolvimento com reporte estruturado de bugs.',
    type: 'work',
    technologies: ['Linux', 'Windows', 'Power BI', 'Logs Analysis', 'Troubleshooting'],
    date: '2026',
  },
  {
    id: 2,
    title: 'Desenvolvedor Full Stack',
    company: '2RP',
    period: 'Mar 2025 - Jan 2026',
    description: 'Desenvolvimento e manutenção de aplicações web com React e Node.js. Liderou implementação de módulos em sistema de lições estilo Duolingo com React Native integrado a AWS. Desenvolveu sistema de monitoramento agrícola (Agrotech) com sensores IoT e comunicação MQTT em tempo real.',
    type: 'work',
    technologies: ['React', 'React Native', 'Node.js', 'AWS', 'MQTT', 'APIs REST', 'SQL'],
    date: '2025',
  },
  {
    id: 3,
    title: 'Tecnólogo em Desenvolvimento de Software',
    company: 'SENAI, Sorocaba - SP',
    period: 'Conclusão: Jan 2025',
    description: 'Formação técnica em desenvolvimento de software com média 9,3/10,0. Educação técnica focada em tecnologias web modernas e práticas de desenvolvimento.',
    type: 'education',
    technologies: ['Web Development', 'Software Architecture', 'Best Practices'],
    date: '2025',
  },
]
