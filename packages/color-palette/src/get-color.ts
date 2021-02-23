import * as ColorSet from './colors'

export type Color = keyof typeof ColorSet

/**
 * @deprecated :root에 선언된 colorSet를 사용해주세요.
 * ex) color: rgba(${getColor('gray700')}) -> color: var(--color-gray700)
 */
export function getColor(color: Color | string): string {
  return (ColorSet[color as Color] ?? color).replace(
    /^rgba\(((,?\s*\d+){3}(,?\s*\d.?\d?){2}).+$/,
    '$1',
  )
}

export { ColorSet }
