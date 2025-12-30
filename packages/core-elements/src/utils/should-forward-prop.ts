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
    // HTML 요소인 경우, data-/aria- 속성이거나 유효한 HTML 속성이면 전달합니다
    if (propName.startsWith('data-') || propName.startsWith('aria-')) {
      return true
    }

    // styled-components의 스타일링 props는 전달하지 않습니다
    const styledComponentsProps = [
      'as',
      'forwardedAs',
      'theme',
      '$shouldForwardProp',
    ]
    if (styledComponentsProps.includes(propName)) {
      return false
    }

    // DOM에서 사용하는 커스텀 props는 전달하지 않습니다
    // (이들은 styled-components의 스타일링에만 사용됨)
    if (
      propName === 'alpha' ||
      propName === 'bold' ||
      propName === 'center' ||
      propName === 'cursor' ||
      propName === 'ellipsis' ||
      propName === 'floated' ||
      propName === 'inline' ||
      propName === 'inlineBlock' ||
      propName === 'letterSpacing' ||
      propName === 'lineHeight' ||
      propName === 'margin' ||
      propName === 'maxLines' ||
      propName === 'padding' ||
      propName === 'size' ||
      propName === 'strikethrough' ||
      propName === 'textAlign' ||
      propName === 'textStyle' ||
      propName === 'underline' ||
      propName === 'whiteSpace' ||
      propName === 'wordBreak' ||
      propName === 'borderRadius' ||
      propName === 'dimmed' ||
      propName === 'absolute' ||
      propName === 'basic' ||
      propName === 'icon' ||
      propName === 'textAlpha' ||
      propName === 'textColor'
    ) {
      return false
    }

    // 나머지 props는 유효한 HTML 속성으로 간주하고 전달합니다
    return true
  }
  // 다른 요소들에 대해서는 모든 props를 전달합니다.
  return true
}
