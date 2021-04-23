import styled, { css } from 'styled-components'

/**
 * 나열형 컴포넌트의 상하, 좌우 여백을 리셋하기 위한 컴포넌트
 *
 * - 새로형
 * <Stack>...</Stack>
 * <Stack vertical>...</Stack>
 *
 * - 가로형
 * <Stack horizontal>...</Stack>
 */
export const Stack = styled.div<{ vertical?: boolean; horizontal?: boolean }>`
  ${({ horizontal }) =>
    !horizontal
      ? css`
          > :first-child {
            margin-top: 0;
            padding-top: 0;
          }

          > :last-child {
            margin-bottom: 0;
            padding-top: 0;
          }
        `
      : css`
          > :first-child {
            margin-left: 0;
            padding-left: 0;
          }

          > :last-child {
            margin-right: 0;
            padding-right: 0;
          }
        `}
`
