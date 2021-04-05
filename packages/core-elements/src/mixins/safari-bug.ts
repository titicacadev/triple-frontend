import { css } from 'styled-components'
/**
 * overflow: hidden과 border-radius 사용 시 사파리에서 발생하는 버그를 위한  CSS 추가
 * @param safariStackingContextWorkaround
 */

export const safariStackingContextWorkaround = css`
  mask-image: radial-gradient(white, black);
`
