/**
 * @reference https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color
 */
export function safeParseHexColor(color?: string) {
  if (!color) {
    return
  }

  const HEX_ALPHA_PATTERN = /^#([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i
  const colorCode = color.startsWith('#') ? color : `#${color}`

  return HEX_ALPHA_PATTERN.test(colorCode) ? colorCode : color
}
