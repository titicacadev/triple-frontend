import * as ColorSet from './colors'

export type Color = keyof typeof ColorSet

export function getColor(color: Color): string {
  return ColorSet[color].replace(
    /^rgba\(((,?\s*\d+){3}(,?\s*\d.?\d?){1}).+$/,
    '$1',
  )
}

export { ColorSet }
