import { ColorSet } from './colors'

type ColorString = keyof typeof ColorSet

export function GetColor(color: ColorString): string {
  return ColorSet[color as ColorString] || ''
}
