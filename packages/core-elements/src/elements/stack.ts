import styled, { css } from 'styled-components'

/**
 * 나열형 컴포넌트의 상하, 좌우 여백을 리셋하기 위한 컴포넌트
 */
export const Stack = styled.div<{ vertical?: boolean; horizontal?: boolean }>`
  ${({ vertical }) =>
    vertical &&
    css`
      > :first-child {
        margin-top: 0;
      }

      > :last-child {
        margin-bottom: 0;
      }
    `}

  ${({ horizontal }) =>
    horizontal &&
    css`
      > :not(:first-child) {
        margin-left: 0;
      }
    `}
`
