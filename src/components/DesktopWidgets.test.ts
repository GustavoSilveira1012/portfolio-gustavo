import { describe, expect, it } from 'vitest'
import { getWeatherLabel } from './DesktopWidgets'

describe('getWeatherLabel', () => {
  it('maps WMO codes to Portuguese weather summaries', () => {
    expect(getWeatherLabel(0)).toBe('Céu limpo')
    expect(getWeatherLabel(2)).toBe('Parcialmente nublado')
    expect(getWeatherLabel(61)).toBe('Garoa e chuva')
    expect(getWeatherLabel(95)).toBe('Tempestade')
    expect(getWeatherLabel(120)).toBe('Condições variáveis')
  })
})
