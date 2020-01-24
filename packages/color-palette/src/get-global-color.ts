import { ColorSet } from './colors'

export function GetGlobalColor(color: keyof ColorSet): string {
  return ColorSet[color as ColorSet] || ''
}
