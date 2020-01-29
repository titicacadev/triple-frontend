import { ColorSet } from './colors'

type ColorString = keyof typeof ColorSet

export function getColor(color: ColorString): string {
  return ColorSet[color as ColorString]
}
