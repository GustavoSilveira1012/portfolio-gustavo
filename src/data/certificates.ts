export interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  icon: string
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Google Cloud — Cloud Certification',
    issuer: 'Google Cloud',
    date: 'Ago 2025',
    credentialId: 'GOOGLE-CLOUD-2025',
    credentialUrl: 'https://cloud.google.com',
    icon: '☁️',
  },
  {
    id: 2,
    title: 'AWS Academy Graduate – Cloud Developing',
    issuer: 'AWS Academy',
    date: 'Mai 2026',
    credentialId: 'AWS-ACADEMY-CLOUD-DEV',
    credentialUrl: 'https://www.credly.com',
    icon: '☁️',
  },
  {
    id: 3,
    title: 'Tecnólogo em Desenvolvimento de Software',
    issuer: 'SENAI, Sorocaba - SP',
    date: 'Jan 2025',
    credentialId: 'SENAI-TECH-2025',
    credentialUrl: '#',
    icon: '🎓',
  },
]
