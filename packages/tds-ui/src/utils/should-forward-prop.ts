import isPropValid from '@emotion/is-prop-valid'
import { ShouldForwardProp } from 'styled-components'

// styled-components v5의 기본 동작을 구현합니다.
export const shouldForwardProp: ShouldForwardProp<'web'> = (
  propName,
  target,
) => {
  if (typeof target === 'string') {
    // HTML 요소인 경우, 유효한 HTML 속성이면 prop을 전달합니다.
    return isPropValid(propName)
  }
  // 다른 요소들에 대해서는 모든 props를 전달합니다.
  return true
}
