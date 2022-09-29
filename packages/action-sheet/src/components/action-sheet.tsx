import { PropsWithChildren, ReactNode, MouseEvent, useRef } from 'react'
import styled, { css } from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import {
  MarginPadding,
  Container,
  safeAreaInsetMixin,
  paddingMixin,
  Text,
  layeringMixin,
  LayeringMixinProps,
} from '@titicaca/core-elements'
import { white } from '@titicaca/color-palette'
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition'

const unit = (value: number | string, suffix = 'px') =>
  typeof value === 'string' ? value : value !== 0 ? `${value}${suffix}` : value

const ContentContainer = styled(Container)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
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

const Sheet = styled.div<SheetProps & LayeringMixinProps>`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 768px;
  user-select: none;
  background-color: ${white};

  ${layeringMixin(0)}

  &:not([class*='action-sheet-slide-']) {
    ${inactiveSheetSlideStyle}
    display: none;
  }

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

  ${paddingMixin}

  ${({ from, borderRadius }) => {
    switch (from) {
      case 'top':
        return `
          top: 0;
          border-radius: 0 0 ${unit(borderRadius)} ${unit(borderRadius)};
        `
      case 'bottom':
        return css<{ padding: MarginPadding }>`
          bottom: 0;
          border-radius: ${unit(borderRadius)} ${unit(borderRadius)} 0 0;

          ${safeAreaInsetMixin}
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

const Overlay = styled.div<OverlayProps & LayeringMixinProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.7);

  ${layeringMixin(3)}

  &:not([class*='action-sheet-fade-']) {
    ${inactiveOverlayFadeStyle}
    display: none;
  }

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

const TRANSITION_DURATION = 120
const DEFAULT_FROM = 'bottom'
const DEFAULT_BORDER_RADIUS = 12

export default function ActionSheet({
  open,
  onOverlayClick,
  title,
  from = DEFAULT_FROM,
  borderRadius = DEFAULT_BORDER_RADIUS,
  bottomSpacing = 13,
  maxContentHeight = 'calc(100vh - 256px)',
  padding,
  children,
  className,
  zTier,
  zIndex,
  unmountOnExit,
  ...restProps
}: PropsWithChildren<
  {
    open?: boolean
    title?: ReactNode
    onOverlayClick?: () => void
    from?: 'top' | 'bottom'
    borderRadius?: number
    bottomSpacing?: number
    maxContentHeight?: string | number
    padding?: MarginPadding
    className?: string
    unmountOnExit?: boolean
  } & LayeringMixinProps &
    Partial<CSSTransitionProps<HTMLDivElement>>
>) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const actionSheetTitle = title ? (
    typeof title === 'string' ? (
      <Container
        css={{
          height: '16px',
          margin: '0 0 10px 27px',
        }}
      >
        <Text size="tiny" bold color="gray700">
          {title}
        </Text>
      </Container>
    ) : (
      title
    )
  ) : null
  const paddingValue = {
    top: from === 'top' ? 0 : 30,
    right: 25,
    left: 25,
    bottom: from === 'top' ? 30 : bottomSpacing || 0,
    ...(padding || {}),
  }

  return (
    <CSSTransition
      nodeRef={overlayRef}
      in={open}
      appear
      classNames="action-sheet-fade"
      timeout={TRANSITION_DURATION}
      mountOnEnter={unmountOnExit}
      unmountOnExit={unmountOnExit}
      {...restProps}
    >
      <Overlay
        ref={overlayRef}
        duration={TRANSITION_DURATION}
        onClick={(e) => {
          silenceEvent(e)
          if (onOverlayClick) {
            onOverlayClick()
          }
        }}
        zTier={zTier}
        zIndex={zIndex}
        data-testid="overlay"
      >
        <CSSTransition
          nodeRef={sheetRef}
          in={open}
          classNames="action-sheet-slide"
          timeout={TRANSITION_DURATION}
          appear
          mountOnEnter={unmountOnExit}
          unmountOnExit={unmountOnExit}
        >
          <Sheet
            ref={sheetRef}
            duration={TRANSITION_DURATION}
            from={from}
            borderRadius={borderRadius}
            padding={{
              top: paddingValue.top,
              bottom: paddingValue.bottom,
            }}
            onClick={silenceEvent}
            className={className}
            zIndex={1}
            data-testid="action-sheet"
          >
            {actionSheetTitle}

            <ContentContainer
              css={{
                maxHeight: maxContentHeight,
                paddingLeft: paddingValue.left,
                paddingRight: paddingValue.right,
              }}
            >
              {children}
            </ContentContainer>
          </Sheet>
        </CSSTransition>
      </Overlay>
    </CSSTransition>
  )
}

function silenceEvent(e: MouseEvent) {
  return e.stopPropagation()
}
