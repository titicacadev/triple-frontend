import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

const unit = (value: number | string, suffix = 'px') =>
  typeof value === 'string' ? value : value !== 0 ? `${value}${suffix}` : value

export type MarginPadding = Partial<
  Record<
    'top' | 'right' | 'bottom' | 'left',
    CSS.Property.Margin<number | string>
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
  padding: MarginPadding
}>`
  box-sizing: border-box;
  ${({ maxContentHeight }) =>
    maxContentHeight ? `max-height: ${unit(maxContentHeight)};` : ''}
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ padding }) => css`
    padding: ${[0, padding.right, 0, padding.left]
      .map((n) => (n ? unit(n) : 0))
      .join(' ')};
  `}
`

const inactiveSheetSlideStyle = css<{ from: 'top' | 'bottom' }>`
  ${({ from }) => {
    switch (from) {
      case 'top':
        return 'transform: translate3d(0, -100%, 0);'
      case 'bottom':
        return 'transform: translate3d(0, 100%, 0);'
    }
  }}
`

const activeSheetSlideStyle = 'transform: translate3d(0, 0, 0);'

const sheetSlideConfig = css<{ duration: number }>`
  transition: transform ${({ duration }) => duration}ms ease-in;
`

interface SheetProps {
  from: 'top' | 'bottom'
  borderRadius: number
  padding: MarginPadding
  duration: number
}

export const Sheet = styled.div<SheetProps>`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0;
  user-select: none;

  ${inactiveSheetSlideStyle}

  &.action-sheet-slide-appear,
  &.action-sheet-slide-enter {
    ${inactiveSheetSlideStyle}
  }
  &.action-sheet-slide-appear-active,
  &.action-sheet-slide-enter-active {
    ${activeSheetSlideStyle}
    ${sheetSlideConfig}
  }

  &.action-sheet-slide-enter-done {
    ${activeSheetSlideStyle}
  }

  &.action-sheet-slide-exit {
    ${activeSheetSlideStyle}
  }

  &.action-sheet-slide-exit-active {
    ${inactiveSheetSlideStyle}
    ${sheetSlideConfig}
  }

  &.action-sheet-slide-exit-done {
    ${inactiveSheetSlideStyle}
    display: none;
  }

  ${({ from, borderRadius, padding }) => {
    switch (from) {
      case 'top':
        return `
          top: 0;
          border-radius: 0 0 ${unit(borderRadius)} ${unit(borderRadius)};
          ${padding.top ? `padding-top: ${unit(padding.top)};` : ''}
          ${padding.bottom ? `padding-bottom: ${unit(padding.bottom)};` : ''}
        `
      case 'bottom':
        return `
        bottom: 0;
        border-radius: ${unit(borderRadius)} ${unit(borderRadius)} 0 0;
        ${padding.top ? `padding-top: ${unit(padding.top)};` : ''}
        ${padding.bottom ? `padding-bottom: ${unit(padding.bottom)};` : ''}

        @supports (padding: max(0px)) and
          (padding: env(safe-area-inset-bottom)) {
          padding-bottom: max(
            ${padding.bottom ? unit(padding.bottom) : 0},
            calc(
              env(safe-area-inset-bottom) +
                ${unit(
                  typeof padding.bottom === 'number'
                    ? (padding.bottom as number) + 4
                    : padding.bottom || 0,
                )}
            )
          );
        }
        `
    }
  }}
`

const inactiveOverlayFadeStyle = `
  pointer-events: none;
  opacity: 0;
`

const activeOverlayFadeStyle = `
  pointer-events: auto;
  opacity: 1;
`

const overlayFadeConfig = css<{ duration: number }>`
  transition: opacity ${({ duration }) => duration}ms ease-in;
`

interface OverlayProps {
  duration: number
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(58, 58, 58, 0.7);

  ${inactiveOverlayFadeStyle}

  &.action-sheet-fade-appear,
  &.action-sheet-fade-enter {
    ${inactiveOverlayFadeStyle}
  }

  &.action-sheet-fade-appear-active,
  &.action-sheet-fade-enter-active {
    ${activeOverlayFadeStyle}
    ${overlayFadeConfig}
  }

  &.action-sheet-fade-enter-done {
    ${activeOverlayFadeStyle}
  }

  &.action-sheet-fade-exit {
    ${activeOverlayFadeStyle}
  }

  &.action-sheet-fade-exit-active {
    ${inactiveOverlayFadeStyle}
    ${overlayFadeConfig}
  }

  &.action-sheet-fade-exit-done {
    ${inactiveOverlayFadeStyle}
    display: none;
  }
`
