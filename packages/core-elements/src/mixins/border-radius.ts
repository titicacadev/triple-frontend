import { css } from 'styled-components'

/**
 * border-radius를 지정하는 mixin
 * 자식 엘리먼트가 border-radius를 무시하지 않도록 overflow: hidden이 추가됩니다.
 * 또한, 관련한 safari 버그를 우회하는 workaround도 포함합니다.
 * @param  borderRadiusMixin
 */
export const borderRadiusMixin = css<{ borderRadius?: number }>`
  ${({ borderRadius }) =>
    borderRadius &&
    `
    overflow: hidden;
    mask-image: radial-gradient(white, black);
    border-radius: ${borderRadius}px;
  `}
`
