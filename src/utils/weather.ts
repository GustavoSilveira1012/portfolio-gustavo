export function getWeatherLabel(code: number) {
  if (code === 0) return 'Céu limpo'
  if (code <= 3) return 'Parcialmente nublado'
  if (code >= 51 && code <= 67) return 'Garoa e chuva'
  if (code >= 80 && code <= 82) return 'Pancadas de chuva'
  if (code >= 95 && code <= 99) return 'Tempestade'
  if (code >= 71 && code <= 77) return 'Neve'
  if (code >= 45 && code <= 48) return 'Neblina'
  return 'Condições variáveis'
}
