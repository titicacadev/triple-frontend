import { ColorSet } from './colors'

type ColorString = keyof typeof ColorSet

export function getColor(color: ColorString): string {
  return ColorSet[color].replace(
    /^rgba\(((,?\s*\d+){3}(,?\s*\d.?\d?){1}).+$/,
    '$1',
  )
}
