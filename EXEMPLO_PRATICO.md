# 🎯 Exemplo Prático - Passo a Passo

## Vamos substituir os dados mockados pelos seus dados reais

---

## PASSO 1: Editar Projetos

### Abra: `src/data/projects.ts`

### Remova tudo e substitua por

```typescript
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
    title: 'Meu Primeiro Projeto',
    description: 'Uma descrição curta do projeto',
    longDescription: 'Uma descrição mais longa e detalhada do que o projeto faz',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/seu-usuario/seu-projeto',
    demo: 'https://seu-projeto.com',
    category: 'web',
  },
  {
    id: 2,
    title: 'Segundo Projeto',
    description: 'Descrição do segundo projeto',
    longDescription: 'Detalhes do segundo projeto',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    technologies: ['React Native', 'Firebase'],
    github: 'https://github.com/seu-usuario/segundo-projeto',
    demo: '#',
    category: 'mobile',
  },
]
```

---

## PASSO 2: Editar Tecnologias

### Abra: `src/data/technologies.ts`

### Remova tudo e substitua por

```typescript
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
    level: 'expert',
    icon: '⚛️',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 'advanced',
    icon: '📘',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'tailwindcss',
    name: 'TailwindCSS',
    category: 'frontend',
    level: 'expert',
    icon: '🎨',
    color: 'from-cyan-400 to-blue-500',
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 'advanced',
    icon: '🟢',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    level: 'advanced',
    icon: '🚂',
    color: 'from-gray-400 to-gray-600',
  },

  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    level: 'intermediate',
    icon: '🐘',
    color: 'from-blue-500 to-blue-700',
  },

  // DevOps
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    level: 'intermediate',
    icon: '🐳',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'git',
    name: 'Git/GitHub',
    category: 'devops',
    level: 'expert',
    icon: '🐙',
    color: 'from-gray-400 to-gray-600',
  },
]
```

---

## PASSO 3: Editar Experiência

### Abra: `src/data/experience.ts`

### Remova tudo e substitua por

```typescript
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
    title: 'Desenvolvedor Full Stack',
    company: 'Minha Empresa',
    period: '2023 - Presente',
    description: 'Desenvolvimento de aplicações web com React e Node.js',
    type: 'work',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    date: '2023',
  },
  {
    id: 2,
    title: 'Desenvolvedor Frontend',
    company: 'Outra Empresa',
    period: '2022 - 2023',
    description: 'Desenvolvimento de interfaces com React',
    type: 'work',
    technologies: ['React', 'JavaScript', 'TailwindCSS'],
    date: '2022',
  },
  {
    id: 3,
    title: 'Freelancer',
    company: 'Diversos Clientes',
    period: '2021 - Presente',
    description: 'Desenvolvimento de projetos customizados',
    type: 'freelance',
    technologies: ['React', 'Next.js', 'Node.js'],
    date: '2021',
  },
  {
    id: 4,
    title: 'Bootcamp Full Stack',
    company: 'Escola de Programação',
    period: '2021',
    description: 'Formação intensiva em desenvolvimento web',
    type: 'education',
    date: '2021',
  },
]
```

---

## PASSO 4: Editar Certificados

### Abra: `src/data/certificates.ts`

### Remova tudo e substitua por

```typescript
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
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    date: '2023',
    credentialId: 'FM-REACT-2023',
    credentialUrl: 'https://frontendmasters.com/certificates/...',
    icon: '⚛️',
  },
  {
    id: 2,
    title: 'TypeScript Professional',
    issuer: 'Scrimba',
    date: '2023',
    credentialId: 'SCRIMBA-TS-2023',
    credentialUrl: 'https://scrimba.com/certificates/...',
    icon: '📘',
  },
  {
    id: 3,
    title: 'Node.js Masterclass',
    issuer: 'Udemy',
    date: '2022',
    credentialId: 'UDEMY-NODE-2022',
    credentialUrl: 'https://udemy.com/certificates/...',
    icon: '🟢',
  },
]
```

---

## PASSO 5: Editar Links Sociais

### Abra: `src/utils/constants.ts`

### Substitua

```typescript
export const SOCIAL_LINKS = {
  github: 'https://github.com/seu-usuario',
  linkedin: 'https://linkedin.com/in/seu-perfil',
  twitter: 'https://twitter.com/seu-usuario',
  email: 'seu@email.com',
  whatsapp: 'https://wa.me/5511987654321',
}
```

---

## PASSO 6: Editar Meta Tags

### Abra: `index.html`

### Substitua

```html
<meta name="description" content="Seu Nome - Desenvolvedor Full Stack especializado em React e Node.js" />
<meta name="keywords" content="desenvolvedor, full stack, react, node.js, typescript" />
<meta name="author" content="Seu Nome" />
<title>Seu Nome - Desenvolvedor Full Stack</title>
```

---

## PASSO 7: Editar Hero Section

### Abra: `src/components/Hero.tsx`

### Procure por

```tsx
<h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
  <span className="text-white">Gustavo</span>
  <br />
  <span className="gradient-text">Silveira Soares</span>
</h1>
```

### Substitua por

```tsx
<h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
  <span className="text-white">Seu</span>
  <br />
  <span className="gradient-text">Nome</span>
</h1>
```

### Procure por

```tsx
<p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
  Especializado em criar aplicações web modernas, escaláveis e de alta performance.
  Apaixonado por React, TypeScript e arquitetura de sistemas. Transformando ideias em
  código que funciona.
</p>
```

### Substitua por

```tsx
<p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
  Sua descrição profissional aqui. Fale sobre suas especialidades, tecnologias favoritas
  e o que você gosta de fazer. Seja autêntico e profissional.
</p>
```

---

## PASSO 8: Editar Informações de Contato

### Abra: `src/components/Contact.tsx`

### Procure por

```typescript
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'gustavo@example.com',
    href: 'mailto:gustavo@example.com',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+55 (11) 99999-9999',
    href: 'https://wa.me/5511999999999',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'São Paulo, Brasil',
    href: '#',
  },
]
```

### Substitua por

```typescript
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'seu@email.com',
    href: 'mailto:seu@email.com',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+55 (11) 98765-4321',
    href: 'https://wa.me/5511987654321',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Sua Cidade, Seu Estado',
    href: '#',
  },
]
```

---

## ✅ Checklist Final

- [ ] Projetos atualizados
- [ ] Tecnologias atualizadas
- [ ] Experiência atualizada
- [ ] Certificados atualizados
- [ ] Links sociais atualizados
- [ ] Meta tags atualizadas
- [ ] Hero section atualizada
- [ ] Informações de contato atualizadas

---

## 🚀 Testar as Mudanças

```bash
# 1. Inicie o servidor
npm run dev

# 2. Abra no navegador
http://localhost:5173

# 3. Verifique todas as seções
# - Hero com seu nome
# - Projetos seus
# - Tecnologias suas
# - Experiência sua
# - Certificados seus
# - Contato com seus dados
```

---

## 💡 Dicas

1. **Imagens:** Use URLs de imagens do Unsplash ou suas próprias
2. **Links:** Certifique-se de que todos os links estão corretos
3. **Descrições:** Seja conciso e profissional
4. **Tecnologias:** Inclua apenas as que você realmente usa
5. **Certificados:** Adicione links para verificação se possível

---

**Pronto!** Seu portfólio agora tem seus dados reais! 🎉
