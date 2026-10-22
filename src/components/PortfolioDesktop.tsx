import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type FormEvent } from 'react'
import {
  Award, Briefcase, Check, ChevronRight, Code2, Download,
  ExternalLink, FolderOpen, Github, Grid2X2, Linkedin,
  Mail, MapPin, Maximize2, Minus, Moon, RotateCcw, Send,
  Settings2, Sun, Terminal, UserRound, X,
} from 'lucide-react'
import Gustavo3D from './Gustavo3D'
import { WeatherWidget, GitHubWidget } from './DesktopWidgets'
import { projects } from '../data/projects'
import { experiences } from '../data/experience'
import { technologies } from '../data/technologies'
import { certificates } from '../data/certificates'
import { CONTACT_INFO, CV_FILES, SOCIAL_LINKS } from '../utils/constants'
import './portfolio-desktop.css'

type WindowId = 'about' | 'projects' | 'experience' | 'skills' | 'certificates' | 'contact' | 'terminal'
type WindowStatus = 'open' | 'minimized' | 'closed'
type WindowState = {
  status: WindowStatus
  x: number
  y: number
  width: number
  height: number
  z: number
  maximized: boolean
}
type Gesture = {
  id: WindowId
  kind: 'move' | 'resize'
  pointerId: number
  startX: number
  startY: number
  initial: WindowState
}
const entries = [
  { id: 'about', label: 'Sobre mim', icon: UserRound, subtitle: 'Quem eu sou' },
  { id: 'projects', label: 'Projetos', icon: FolderOpen, subtitle: 'Trabalhos selecionados' },
  { id: 'experience', label: 'Experiência', icon: Briefcase, subtitle: 'Minha trajetória' },
  { id: 'skills', label: 'Tecnologias', icon: Code2, subtitle: 'Ferramentas e stacks' },
  { id: 'certificates', label: 'Formação', icon: Award, subtitle: 'Certificações e estudos' },
  { id: 'contact', label: 'Contato', icon: Mail, subtitle: 'Vamos conversar' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, subtitle: 'Experimente comandos' },
] as const

const initialWindows: Record<WindowId, WindowState> = {
  about: { status: 'open', x: 175, y: 92, width: 575, height: 520, z: 12, maximized: false },
  projects: { status: 'closed', x: 285, y: 112, width: 765, height: 555, z: 10, maximized: false },
  experience: { status: 'closed', x: 330, y: 106, width: 640, height: 520, z: 10, maximized: false },
  skills: { status: 'closed', x: 280, y: 88, width: 670, height: 525, z: 10, maximized: false },
  certificates: { status: 'closed', x: 360, y: 140, width: 605, height: 490, z: 10, maximized: false },
  contact: { status: 'closed', x: 360, y: 154, width: 540, height: 430, z: 10, maximized: false },
  terminal: { status: 'closed', x: 350, y: 175, width: 620, height: 430, z: 10, maximized: false },
}

function focusNextFrame(target: () => HTMLElement | null) {
  const focus = () => {
    const element = target()
    if (element?.isConnected) element.focus()
  }
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(focus)
  } else {
    window.setTimeout(focus, 0)
  }
}

const categoryNames = {
  frontend: 'Front-end & interfaces',
  backend: 'Back-end & APIs',
  database: 'Bancos de dados',
  devops: 'Cloud, DevOps & ferramentas',
} as const

function DesktopClock() {
  const [date, setDate] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setDate(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <time className="os-clock" dateTime={date.toISOString()}>
      <strong>{date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</strong>
      <span>{date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
    </time>
  )
}

function AboutView({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className="os-body">
      <div className="os-profile-top">
        <img src="/perfil.jpg" alt="Retrato de Gustavo Silveira Soares" className="os-profile-photo" />
        <div>
          <span className="os-eyebrow">PROFILE / 001</span>
          <h2>Gustavo Silveira Soares</h2>
          <p className="os-muted">Full Stack Developer · Sorocaba, SP</p>
          <span className="os-pill os-pill-green"><span className="os-pulse" /> Construindo soluções reais</span>
        </div>
      </div>
      <div className="os-separator" />
      <h3>Olá, eu sou o Gustavo! <span aria-hidden="true">👋</span></h3>
      <p>Sou desenvolvedor Full Stack com experiência em aplicações web, APIs e resolução de problemas reais. Gosto de unir interfaces bem cuidadas, arquitetura sólida e produtos que fazem diferença.</p>
      <p>Trabalho com React, TypeScript e Node.js e tenho interesse em IoT, automação, cloud e monitoramento de sistemas. Aqui você pode explorar o que já construí e conhecer minha trajetória.</p>
      <div className="os-action-row">
        <button className="os-primary" onClick={() => onOpen('projects')}>Explorar projetos <ChevronRight size={17} /></button>
        {CV_FILES.map((cv) => <a key={cv.href} href={cv.href} download={cv.filename} className="os-secondary"><Download size={16} /> {cv.label}</a>)}
      </div>
      <div className="os-mini-stats">
        <div><strong>{projects.length.toString().padStart(2, '0')}</strong><span>Projetos em destaque</span></div>
        <div><strong>{experiences.filter((e) => e.type === 'work').length.toString().padStart(2, '0')}</strong><span>Experiências</span></div>
        <div><strong>{technologies.length.toString().padStart(2, '0')}</strong><span>Tecnologias</span></div>
      </div>
    </div>
  )
}

function ProjectsView() {
  const [filter, setFilter] = useState('todos')
  const categories = [{ value: 'todos', label: 'Todos' }, ...Array.from(new Set(projects.map((p) => p.category))).map((c) => ({ value: c, label: c.toUpperCase() }))]
  const filtered = filter === 'todos' ? projects : projects.filter((p) => p.category === filter)
  return (
    <div className="os-body">
      <div className="os-section-heading"><div><span className="os-eyebrow">PORTFOLIO / SELECTED WORK</span><h2>Projetos em destaque<span className="os-accent">.</span></h2><p className="os-muted">Produtos, experiências e soluções construídas na prática.</p></div><span className="os-count">{projects.length} projetos</span></div>
      <div className="os-filters" role="group" aria-label="Filtrar projetos">
        {categories.map(({ value, label }) => <button key={value} aria-pressed={filter === value} className={filter === value ? 'os-filter active' : 'os-filter'} onClick={() => setFilter(value)}>{label}</button>)}
      </div>
      <p className="os-project-result-count" role="status" aria-live="polite" aria-atomic="true">{filtered.length} {filtered.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}</p>
      <div className="os-project-grid">
        {filtered.map((p, index) => (
          <article key={p.id} className="os-project-card">
            <figure className="os-project-media">
              <img src={p.image} alt={'Captura do projeto ' + p.title} loading="lazy" />
              <span className="os-project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </figure>
            <div className="os-project-details">
              <div className="os-project-title"><h3>{p.title}</h3><span className="os-category">{p.category}</span></div>
              <p>{p.description}</p>
              <div className="os-tags">{p.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              <details className="os-case-study">
                <summary>Ver estudo de caso: {p.title}</summary>
                <div className="os-case-study-content">
                  <h4>Contexto</h4>
                  <p>{p.caseStudy.context}</p>
                  <h4>Objetivo</h4>
                  <p>{p.caseStudy.objective}</p>
                  <h4>Escopo documentado</h4>
                  <ul>{p.caseStudy.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                  <p className="os-project-note">{p.caseStudy.note}</p>
                  <figure className="os-case-study-image">
                    <img src={p.image} alt={'Captura de tela: ' + p.title} loading="lazy" />
                    <figcaption>{p.caseStudy.screenshotCaption}</figcaption>
                  </figure>
                </div>
              </details>
              <div className="os-project-actions">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={'Código de ' + p.title + ' no GitHub (abre em nova aba)'}><Github size={16} aria-hidden="true" /> Código no GitHub <ExternalLink size={13} aria-hidden="true" /></a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={p.demoLabel + ' de ' + p.title + ' (abre em nova aba)'}><ExternalLink size={16} aria-hidden="true" /> {p.demoLabel} <ExternalLink size={13} aria-hidden="true" /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p role="status">Nenhum projeto nesta categoria.</p>}
    </div>
  )
}

function ExperienceView() {
  return (
    <div className="os-body">
      <span className="os-eyebrow">CAREER / JOURNEY</span>
      <h2>Minha trajetória<span className="os-accent">.</span></h2>
      <p className="os-muted">Desenvolvimento, suporte a sistemas e evolução contínua.</p>
      <div className="os-timeline">
        {experiences.map((experience) => (
          <article key={experience.id} className="os-timeline-item">
            <span className="os-timeline-dot" />
            <div className="os-timeline-meta"><span className="os-pill">{experience.type === 'education' ? 'Formação' : 'Experiência'}</span><span>{experience.period}</span></div>
            <h3>{experience.title}</h3>
            <strong className="os-company">{experience.company}</strong>
            <p>{experience.description}</p>
            <div className="os-tags">{experience.technologies?.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </div>
  )
}

function SkillsView() {
  return (
    <div className="os-body">
      <span className="os-eyebrow">SYSTEM / TOOLKIT</span>
      <h2>Minha stack<span className="os-accent">.</span></h2>
      <p className="os-muted">Tecnologias que utilizo para tirar ideias do papel.</p>
      <div className="os-skill-groups">
        {(Object.keys(categoryNames) as Array<keyof typeof categoryNames>).map((category) => (
          <section key={category} className="os-skill-section"><div className="os-skill-title"><h3>{categoryNames[category]}</h3><span>{technologies.filter((t) => t.category === category).length} ferramentas</span></div>
            <div className="os-skill-list">
              {technologies.filter((t) => t.category === category).map((t) => <div className="os-skill" key={t.id}><span aria-hidden="true">{t.icon}</span><strong>{t.name}</strong></div>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function CertificatesView() {
  return (
    <div className="os-body">
      <span className="os-eyebrow">LEARNING / ALWAYS ON</span><h2>Formação & certificados<span className="os-accent">.</span></h2>
      <p className="os-muted">Aprendizado constante, de cursos técnicos à computação em nuvem.</p>
      <div className="os-cert-grid">
        {certificates.map((c) => <article className="os-cert" key={c.id}><span className="os-cert-icon" aria-hidden="true">{c.icon}</span><div><span className="os-eyebrow">{c.date}</span><h3>{c.title}</h3><p>{c.issuer}</p></div><Check size={18} aria-label="Registrado no portfólio" /></article>)}
      </div>
    </div>
  )
}

function ContactView() {
  return (
    <div className="os-body">
      <span className="os-eyebrow">NETWORK / SAY HELLO</span><h2>Vamos criar algo juntos<span className="os-accent">?</span></h2>
      <p>Está pensando em um projeto, vaga ou colaboração? Me chama. Adoro trocar ideias sobre tecnologia e produtos.</p>
      <a className="os-contact-feature" href={'mailto:' + CONTACT_INFO.email.address + '?subject=' + encodeURIComponent(CONTACT_INFO.email.subject)}><Mail size={24} /><span><small>Envie um e-mail</small><strong>{CONTACT_INFO.email.address}</strong></span><ExternalLink size={18} /></a>
      <div className="os-contact-grid">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"><Github size={24} /><strong>GitHub</strong><span>Conheça meu código <ExternalLink size={13} /></span></a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={24} /><strong>LinkedIn</strong><span>Vamos conectar <ExternalLink size={13} /></span></a>
        <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer"><Send size={24} /><strong>WhatsApp</strong><span>Enviar mensagem <ExternalLink size={13} /></span></a>
      </div>
      <p className="os-location"><MapPin size={15} /> Sorocaba, São Paulo · Brasil</p>
    </div>
  )
}

function TerminalView({ onOpen }: { onOpen: (id: WindowId) => void }) {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<string[]>(['GustavoOS Terminal v1.0', 'Digite help para listar comandos disponíveis.'])
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cmd = command.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') { setHistory([]); setCommand(''); return }
    const responses: Record<string, string> = {
      help: 'Comandos: help, about, projects, skills, experience, contact, clear',
      about: 'Gustavo Silveira Soares — Desenvolvedor Full Stack em Sorocaba/SP.',
      projects: 'Abrindo pasta de projetos...',
      skills: 'Abrindo tecnologias...',
      experience: 'Abrindo experiência...',
      contact: 'Abrindo contato...',
    }
    if (cmd === 'about') onOpen('about')
    if (cmd === 'projects') onOpen('projects')
    if (cmd === 'skills') onOpen('skills')
    if (cmd === 'experience') onOpen('experience')
    if (cmd === 'contact') onOpen('contact')
    setHistory((prev) => [...prev, '> ' + cmd, responses[cmd] || 'Comando não encontrado. Digite help.'])
    setCommand('')
  }
  return <div className="os-terminal"><div className="os-terminal-lines" role="log" aria-live="polite">{history.map((line, i) => <p key={i}>{line}</p>)}</div><form onSubmit={onSubmit}><label htmlFor="os-command">guest@gustavo:~$</label><input id="os-command" autoComplete="off" spellCheck={false} value={command} onChange={(e) => setCommand(e.target.value)} placeholder="help" /><button type="submit" aria-label="Executar comando"><ChevronRight size={20} /></button></form></div>
}

export default function PortfolioDesktop() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => structuredClone(initialWindows))
  const [active, setActive] = useState<WindowId | null>('about')
  const [startOpen, setStartOpen] = useState(false)
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('gustavo-os-theme') === 'dark' } catch { return false } })
  const order = useRef(13)
  const gesture = useRef<Gesture | null>(null)
  const windowElements = useRef<Partial<Record<WindowId, HTMLElement | null>>>({})
  const returnFocusElements = useRef<Partial<Record<WindowId, HTMLElement | null>>>({})
  const startMenuRef = useRef<HTMLElement | null>(null)
  const startButtonRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => { try { localStorage.setItem('gustavo-os-theme', dark ? 'dark' : 'light') } catch { /* unavailable in private mode */ } }, [dark])
  const closeStartMenu = useCallback(() => {
    setStartOpen(false)
    focusNextFrame(() => startButtonRef.current)
  }, [])
  const openWindow = (id: WindowId, trigger?: HTMLElement) => {
    const focusedElement = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    returnFocusElements.current[id] = startOpen ? startButtonRef.current : focusedElement
    setWindows((previous) => {
      const next = { ...previous }
      if (window.innerWidth <= 760) {
        for (const item of entries) {
          if (item.id !== id && next[item.id].status === 'open') next[item.id] = { ...next[item.id], status: 'minimized' }
        }
      }
      next[id] = { ...next[id], status: 'open', z: ++order.current }
      return next
    })
    setActive(id)
    setStartOpen(false)
    focusNextFrame(() => windowElements.current[id] ?? null)
  }
  const changeWindow = (id: WindowId, patch: Partial<WindowState>) => {
    setWindows((previous) => ({ ...previous, [id]: { ...previous[id], ...patch } }))
  }
  const focusWindow = (id: WindowId) => {
    if (active !== id) setActive(id)
    setWindows((previous) => ({ ...previous, [id]: { ...previous[id], z: ++order.current } }))
  }
  const closeWindow = useCallback((id: WindowId) => {
    setWindows((previous) => ({ ...previous, [id]: { ...previous[id], status: 'closed' } }))
    if (active === id) {
      const availableWindows = entries
        .filter(({ id: otherId }) => otherId !== id && windows[otherId].status === 'open')
        .sort((left, right) => windows[left.id].z - windows[right.id].z)
      setActive(availableWindows[availableWindows.length - 1]?.id ?? null)
    }
    focusNextFrame(() => {
      const trigger = returnFocusElements.current[id]
      return trigger?.isConnected ? trigger : document.getElementById('os-shortcut-' + id)
    })
  }, [active, windows])
  const minimizeWindow = (id: WindowId) => {
    changeWindow(id, { status: 'minimized' })
    if (active === id) {
      const availableWindows = entries
        .filter(({ id: otherId }) => otherId !== id && windows[otherId].status === 'open')
        .sort((left, right) => windows[left.id].z - windows[right.id].z)
      setActive(availableWindows[availableWindows.length - 1]?.id ?? null)
    }
    focusNextFrame(() => document.getElementById('os-task-window-' + id))
  }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (startOpen) {
        event.preventDefault()
        closeStartMenu()
        return
      }
      if (active && windows[active].status === 'open') {
        event.preventDefault()
        closeWindow(active)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, closeStartMenu, closeWindow, startOpen, windows])
  const gestureStart = (event: ReactPointerEvent<HTMLElement>, id: WindowId, kind: Gesture['kind']) => {
    if (event.button !== 0 || windows[id].maximized || window.innerWidth <= 760) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    gesture.current = { id, kind, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, initial: windows[id] }
    focusWindow(id)
  }
  const gestureMove = (event: ReactPointerEvent<HTMLElement>) => {
    const g = gesture.current
    if (!g || event.pointerId !== g.pointerId) return
    const dx = event.clientX - g.startX
    const dy = event.clientY - g.startY
    if (g.kind === 'move') {
      changeWindow(g.id, { x: Math.max(4, Math.min(window.innerWidth - 120, g.initial.x + dx)), y: Math.max(4, Math.min(window.innerHeight - 95, g.initial.y + dy)) })
    } else {
      changeWindow(g.id, { width: Math.max(375, Math.min(window.innerWidth - g.initial.x - 8, g.initial.width + dx)), height: Math.max(260, Math.min(window.innerHeight - g.initial.y - 65, g.initial.height + dy)) })
    }
  }
  const gestureEnd = (event: ReactPointerEvent<HTMLElement>) => {
    if (gesture.current?.pointerId === event.pointerId) gesture.current = null
  }
  const resetLayout = () => {
    setWindows(structuredClone(initialWindows))
    order.current = 13
    setActive('about')
    setStartOpen(false)
    focusNextFrame(() => windowElements.current.about ?? null)
  }
  const toggleStartMenu = () => {
    if (startOpen) {
      closeStartMenu()
      return
    }
    setStartOpen(true)
    focusNextFrame(() => startMenuRef.current?.querySelector('button') ?? null)
  }
  const renderContent = (id: WindowId) => {
    switch (id) {
      case 'about': return <AboutView onOpen={openWindow} />
      case 'projects': return <ProjectsView />
      case 'experience': return <ExperienceView />
      case 'skills': return <SkillsView />
      case 'certificates': return <CertificatesView />
      case 'contact': return <ContactView />
      case 'terminal': return <TerminalView onOpen={openWindow} />
    }
  }
  const running = entries.filter(({ id }) => windows[id].status !== 'closed')
  return (
    <main className={'os-root ' + (dark ? 'os-dark' : 'os-light')}>
      <div className="os-wallpaper" aria-hidden="true">
        <div className="os-heading-art"><span>SOFTWARE ENGINEER / PORTFOLIO 2026</span><strong>GUSTAVO<br />SILVEIRA<span>.</span></strong><p>Code. Design. Solve.</p></div>
        <div className="os-portrait"><Gustavo3D /></div>
        <div className="os-wallpaper-caption">FULL STACK DEVELOPER <span>✳</span> SOROCABA, BR</div>
      </div>
      <div className="os-top-left"><span className="os-dot-online" /> WELCOME TO GUSTAVO OS <span className="os-top-version">v1.0</span></div>
      <nav className="os-desktop-icons" aria-label="Aplicativos na área de trabalho">
        {entries.map(({ id, label, icon: Icon }) => (
          <button type="button" id={'os-shortcut-' + id} aria-label={'Abrir ' + label} key={id} className="os-desktop-icon" onClick={(event) => openWindow(id, event.currentTarget)}><span className="os-icon-surface"><Icon size={27} strokeWidth={1.7} aria-hidden="true" /></span><span>{label}</span></button>
        ))}
      </nav>
      <aside className="os-widget-area" aria-label="Atalhos e informações">
        <WeatherWidget />
        <div className="os-widget os-status-widget"><span className="os-eyebrow">STATUS / CURRENTLY</span><strong><span className="os-dot-online" /> Desenvolvendo e aprendendo</strong><p>Full Stack · React · Node.js</p></div>
        <GitHubWidget />
      </aside>
      <div className="os-window-layer">
        {entries.filter(({ id }) => windows[id].status === 'open').map(({ id, label, icon: Icon }) => {
          const win = windows[id]
          return (
            <section
              key={id}
              ref={(element) => { windowElements.current[id] = element }}
              id={'os-window-' + id}
              role="dialog"
              aria-labelledby={'os-window-title-' + id}
              tabIndex={-1}
              className={'os-window ' + (active === id ? 'os-window-active ' : '') + (win.maximized ? 'os-maximized' : '')}
              style={win.maximized ? { zIndex: win.z } : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.z }}
              onPointerDown={() => { if (active !== id) focusWindow(id) }}
              onPointerMove={gestureMove}
              onPointerUp={gestureEnd}
              onPointerCancel={gestureEnd}
            >
              <header className="os-window-title" onPointerDown={(event) => { if ((event.target as HTMLElement).closest('button')) return; gestureStart(event, id, 'move') }} onDoubleClick={() => changeWindow(id, { maximized: !win.maximized })}>
                <span className="os-window-title-text" id={'os-window-title-' + id}><Icon size={17} aria-hidden="true" /> {label}<small>— Gustavo OS</small></span>
                <span className="os-window-actions">
                  <button type="button" aria-label={'Minimizar ' + label} onClick={() => minimizeWindow(id)}><Minus size={16} aria-hidden="true" /></button>
                  <button type="button" aria-label={(win.maximized ? 'Restaurar ' : 'Maximizar ') + label} onClick={() => changeWindow(id, { maximized: !win.maximized })}><Maximize2 size={14} aria-hidden="true" /></button>
                  <button type="button" aria-label={'Fechar ' + label} className="os-close" onClick={() => closeWindow(id)}><X size={17} aria-hidden="true" /></button>
                </span>
              </header>
              <div className="os-window-inner">{renderContent(id)}</div>
              {!win.maximized && <span className="os-resize-grip" aria-hidden="true" onPointerDown={(event) => gestureStart(event, id, 'resize')} />}
            </section>
          )
        })}
      </div>
      {startOpen && <div className="os-menu-backdrop" aria-hidden="true" onClick={closeStartMenu} />}
      {startOpen && <nav ref={startMenuRef} id="os-start-menu" className="os-start-menu" aria-label="Menu Iniciar">
        <div className="os-start-header"><span className="os-start-mark"><Grid2X2 size={22} aria-hidden="true" /></span><div><strong>Gustavo OS</strong><small>Meu espaço na web</small></div><button type="button" className="os-start-close" aria-label="Fechar menu Iniciar" onClick={closeStartMenu}><X size={19} aria-hidden="true" /></button></div>
        <span className="os-eyebrow">APLICATIVOS</span>
        <div className="os-start-grid">{entries.map(({ id, icon: Icon, label, subtitle }) => <button type="button" key={id} onClick={(event) => openWindow(id, event.currentTarget)}><Icon size={20} aria-hidden="true" /><span><strong>{label}</strong><small>{subtitle}</small></span><ChevronRight size={15} aria-hidden="true" /></button>)}</div>
        <div className="os-start-footer"><img src="/perfil.jpg" alt="" /><span>Gustavo Silveira Soares<small>Full Stack Developer</small></span><a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="Abrir GitHub"><ExternalLink size={17} /></a></div>
      </nav>}
      <footer className="os-taskbar" aria-label="Barra de tarefas">
        <button ref={startButtonRef} type="button" className={'os-start-button ' + (startOpen ? 'selected' : '')} onClick={toggleStartMenu} aria-label="Abrir menu Iniciar" aria-expanded={startOpen} aria-controls={startOpen ? 'os-start-menu' : undefined}><Grid2X2 size={23} aria-hidden="true" /><span>Iniciar</span></button>
        <span className="os-taskbar-divider" />
        <nav className="os-running" aria-label="Janelas abertas">
          {running.map(({ id, label, icon: Icon }) => <button type="button" key={id} id={'os-task-window-' + id} onClick={(event) => (windows[id].status === 'open' && active === id ? minimizeWindow(id) : openWindow(id, event.currentTarget))} className={windows[id].status === 'open' && active === id ? 'selected' : ''} aria-current={windows[id].status === 'open' && active === id ? 'true' : undefined} aria-label={'Alternar janela ' + label} title={label}><Icon size={19} aria-hidden="true" /><span>{label}</span><i aria-hidden="true" /></button>)}
        </nav>
        <div className="os-system-tray">
          <button type="button" onClick={() => setDark(!dark)} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} title="Alternar tema">{dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</button>
          <button type="button" onClick={resetLayout} title="Restaurar disposição" aria-label="Restaurar disposição das janelas"><RotateCcw size={18} aria-hidden="true" /></button>
          <DesktopClock />
        </div>
      </footer>
      <nav className="os-mobile-dock" aria-label="Navegação móvel">
        {(['about', 'projects', 'experience', 'skills', 'contact'] as const).map((id) => {
          const item = entries.find((e) => e.id === id)!
          const Icon = item.icon
          return <button type="button" key={id} className={windows[id].status === 'open' && active === id ? 'selected' : ''} aria-current={windows[id].status === 'open' && active === id ? 'true' : undefined} aria-label={'Abrir ' + item.label} onClick={(event) => openWindow(id, event.currentTarget)}><Icon size={21} aria-hidden="true" /><span>{item.label}</span></button>
        })}
        <button type="button" onClick={toggleStartMenu} aria-label="Mais opções" aria-expanded={startOpen} aria-controls={startOpen ? 'os-start-menu' : undefined}><Settings2 size={21} aria-hidden="true" /><span>Mais</span></button>
      </nav>
      <span className="os-sr-only">Portfólio interativo de Gustavo Silveira Soares. Abra os atalhos para navegar.</span>
    </main>
  )
}
