import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

const unit = (value: number | string, suffix = 'px') =>
  typeof value === 'string' ? value : value !== 0 ? `${value}${suffix}` : value

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.MarginProperty<number | string>
  >
>

export const Title = styled.div`
  height: 16px;
  font-size: 13px;
  font-weight: bold;
  color: rgba(73, 73, 73, 0.7);
  margin: 0 0 10px 27px;
`

// eslint-disable-next-line no-unexpected-multiline
export const ContentContainer = styled.div<{
  maxContentHeight?: string | number
}>`
  box-sizing: border-box;
  max-height: ${({ maxContentHeight }) => unit(maxContentHeight)};
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Sheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0;
`

// eslint-disable-next-line no-unexpected-multiline
export const Overlay = styled.div<{
  from: 'bottom' | 'top'
  borderRadius: number
  padding: MarginPadding
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  background-color: rgba(58, 58, 58, 0.7);
  opacity: 0;
  pointer-events: none;

  ${Sheet} {
    ${({ from, padding, borderRadius }) =>
      from === 'top'
        ? css`
            top: 0;
            border-radius: 0 0 ${unit(borderRadius)} ${unit(borderRadius)};
            padding-top: ${unit(padding.top)};
            padding-bottom: ${unit(padding.bottom)};
            transform: translate3d(0, -100%, 0);
          `
        : css`
            bottom: 0;
            border-radius: ${unit(borderRadius)} ${unit(borderRadius)} 0 0;
            padding-top: ${unit(padding.top)};
            padding-bottom: ${unit(padding.bottom)};

            @supports (padding: max(0px)) and
              (padding: env(safe-area-inset-bottom)) {
              padding-bottom: max(
                ${unit(padding.bottom)},
                calc(
                  env(safe-area-inset-bottom) +
                    ${unit(
                      typeof padding.bottom === 'number'
                        ? padding.bottom + 4
                        : padding.bottom,
                    )}
                )
              );
            }

            transform: translate3d(0, 100%, 0);
          `}
  }

  &.fade-enter-active {
    z-index: 10;
    opacity: 1;
    transition: opacity 10ms;
    pointer-events: auto;

    ${Sheet} {
      ${({ from }) =>
        from === 'top'
          ? css`
              transition: transform 120ms ease-in;
              transform: translate3d(0, 0, 0);
            `
          : css`
              transition: transform 120ms ease-in;
              transform: translate3d(0, 0, 0);
            `}
    }
  }

  &.fade-appear,
  &.fade-enter-done {
    z-index: 10;
    opacity: 1;
    pointer-events: auto;

    ${Sheet} {
      ${({ from }) =>
        from === 'top'
          ? css`
              transform: translate3d(0, 0, 0);
            `
          : css`
              transform: translate3d(0, 0, 0);
            `}
    }
  }

  &.fade-exit {
    z-index: 10;
    opacity: 1;

    ${Sheet} {
      ${({ from }) =>
        from === 'top'
          ? css`
              transform: translate3d(0, 0, 0);
            `
          : css`
              transform: translate3d(0, 0, 0);
            `}
    }
  }

  &.fade-exit-active {
    z-index: 0;
    opacity: 0;
    transition: opacity 120ms;

    ${Sheet} {
      ${({ from }) =>
        from === 'top'
          ? css`
              transition: transform 120ms ease-in;
              transform: translate3d(0, -100%, 0);
            `
          : css`
              transition: transform 120ms ease-in;
              transform: translate3d(0, 100%, 0);
            `}
    }
  }

  &.fade-exit-done {
    display: none;
  }

  ${ContentContainer} {
    ${({ padding }) => css`
      padding: ${[0, padding.right, 0, padding.left]
        .map((n) => unit(n))
        .join(' ')};
    `}
  }
`
