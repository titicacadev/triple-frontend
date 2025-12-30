import { ShouldForwardProp } from 'styled-components'

// styled-components v5의 기본 동작을 구현합니다.
export const shouldForwardProp: ShouldForwardProp<'web'> = (
  propName,
  target,
) => {
  if (typeof target === 'string') {
    // css prop은 전달하지 않습니다
    if (propName === 'css') {
      return false
    }
    // HTML 요소인 경우, 표준 HTML 속성이거나 data-/aria- 속성이면 전달합니다
    return (
      propName.startsWith('data-') ||
      propName.startsWith('aria-') ||
      [
        'id',
        'className',
        'style',
        'title',
        'role',
        'tabIndex',
        'onClick',
        'onFocus',
        'onBlur',
        'children',
      ].includes(propName)
    )
  }
  // 다른 요소들에 대해서는 모든 props를 전달합니다.
  return true
}
