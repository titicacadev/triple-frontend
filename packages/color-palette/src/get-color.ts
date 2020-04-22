import { ColorSet } from './colors'

type ColorString = keyof typeof ColorSet

export function getColor(color: ColorString): string {
  const colorCodes = (ColorSet[color] as unknown) as string

  return colorCodes.replace(/^rgba\(((,?\s*\d+){3}(,?\s*\d.\d){1}).+$/, '$1')
}
