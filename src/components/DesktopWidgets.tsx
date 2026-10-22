import { useEffect, useState } from 'react'
import { ArrowUpRight, Cloud, CloudDrizzle, CloudRain, CloudSun, Github, Loader2, RefreshCw, Sun, Thermometer, Wind } from 'lucide-react'
import { SOCIAL_LINKS } from '../utils/constants'

type WeatherNow = {
  temperature_2m: number
  relative_humidity_2m: number
  weather_code: number
  is_day: number
}
type GitHubStats = { public_repos: number; followers: number }

export function getWeatherLabel(code: number) {
  if (code === 0) return 'Céu limpo'
  if (code <= 3) return 'Parcialmente nublado'
  if (code >= 51 && code <= 67) return 'Garoa e chuva'
  if (code >= 80 && code <= 82) return 'Pancadas de chuva'
  if (code >= 95) return 'Tempestade'
  if (code >= 71 && code <= 77) return 'Neve'
  if (code >= 45 && code <= 48) return 'Neblina'
  return 'Condições variáveis'
}

function WeatherIcon({ code, daytime }: { code: number; daytime: number }) {
  if (code >= 51) return <CloudRain size={30} strokeWidth={1.7} />
  if (code >= 1 && code <= 3) return <CloudSun size={30} strokeWidth={1.7} />
  if (code >= 45) return <CloudDrizzle size={30} strokeWidth={1.7} />
  if (daytime === 1) return <Sun size={30} strokeWidth={1.7} />
  return <Cloud size={30} strokeWidth={1.7} />
}

/** Sorocaba coordinates are public city-centre approximation, not user location. */
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-23.5015&longitude=-47.4526&current=temperature_2m,relative_humidity_2m,weather_code,is_day&timezone=America%2FSao_Paulo'

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherNow | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [refresh, setRefresh] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setState('loading')
    fetch(WEATHER_URL, { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error('Serviço indisponível'); return res.json() })
      .then((data: { current?: WeatherNow }) => {
        if (!data.current || !Number.isFinite(data.current.temperature_2m)) throw new Error('Dados inválidos')
        setWeather(data.current)
        setState('ready')
      })
      .catch((error: unknown) => { if (!(error instanceof Error && error.name === 'AbortError')) setState('error') })
    return () => controller.abort()
  }, [refresh])

  return (
    <section className="os-widget os-weather-widget" aria-label="Previsão do tempo em Sorocaba">
      <div className="os-widget-header"><span className="os-eyebrow">SOROCABA / TEMPO AGORA</span><button type="button" onClick={() => setRefresh((n) => n + 1)} aria-label="Atualizar clima" title="Atualizar clima"><RefreshCw size={14} /></button></div>
      {state === 'ready' && weather ? (
        <div className="os-weather-info"><WeatherIcon code={weather.weather_code} daytime={weather.is_day} /><div><strong>{Math.round(weather.temperature_2m)}°C</strong><small>{getWeatherLabel(weather.weather_code)}</small></div><span title="Umidade relativa"><Wind size={14} /> {weather.relative_humidity_2m}%</span></div>
      ) : state === 'loading' ? (
        <p className="os-widget-feedback"><Loader2 size={17} className="os-spin" /> Consultando clima...</p>
      ) : <p className="os-widget-feedback">Clima indisponível no momento.</p>}
      <small className="os-weather-credit"><Thermometer size={12} /> Dados: Open-Meteo</small>
    </section>
  )
}

export function GitHubWidget() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/users/GustavoSilveira1012', { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error('GitHub unavailable'); return r.json() })
      .then((data: GitHubStats) => {
        if (Number.isFinite(data.public_repos) && Number.isFinite(data.followers)) setStats(data)
      })
      .catch(() => { /* public profile might be rate limited or blocked; link remains usable */ })
    return () => controller.abort()
  }, [])
  return <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="os-widget os-github-widget os-github-stats">
    <div className="os-github-icon"><Github size={24} /></div>
    <div className="os-github-content"><strong>GitHub / GustavoSilveira1012</strong>
      <small>{stats ? stats.public_repos + ' repositórios públicos · ' + stats.followers + ' seguidores' : 'Conheça meus projetos e código'}</small>
    </div>
    <ArrowUpRight size={17} />
  </a>
}
