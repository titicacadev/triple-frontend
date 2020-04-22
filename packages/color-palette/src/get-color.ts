import { ColorSet } from './colors'

type ColorString = keyof typeof ColorSet

export function getColor(color: ColorString, cssValue?: boolean): string {
  const colorCodes = ColorSet[color]

  return cssValue ? `rgba(${colorCodes})` : colorCodes
}
