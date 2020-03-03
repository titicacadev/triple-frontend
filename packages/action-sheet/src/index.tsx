import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import {
  MarginPadding,
  Title,
  ActionItemContainer,
  ItemText,
  ItemButton,
  URL_BY_NAMES,
  ItemIcon,
  CheckedIcon,
  ContentContainer,
  Sheet,
  Overlay,
} from './components'

interface ActionSheetContext {
  onClose?: (e?: React.SyntheticEvent) => any
  from: 'bottom' | 'top'
  borderRadius: number
}

const DEFAULT_FROM = 'bottom'
const DEFAULT_BORDER_RADIUS = 12

const { Provider, Consumer } = React.createContext<ActionSheetContext>({
  from: DEFAULT_FROM,
  borderRadius: DEFAULT_BORDER_RADIUS,
})

function ActionItem({
  buttonLabel,
  icon,
  checked,
  onClick,
  children,
}: React.PropsWithChildren<{
  buttonLabel?: string
  icon?: string
  checked?: boolean
  onClick?: (e?: React.SyntheticEvent) => any
}>) {
  let textWidth = '100%'

  if (buttonLabel && icon) {
    textWidth = 'calc(100% - 100px)'
  } else if (buttonLabel || checked) {
    textWidth = 'calc(100% - 60px)'
  } else if (icon) {
    textWidth = 'calc(100% - 40px)'
  }

  return (
    <Consumer>
      {({ onClose }) => (
        <ActionItemContainer
          onClick={
            buttonLabel
              ? undefined
              : () =>
                  onClick
                    ? !onClick() && onClose && onClose()
                    : onClose && onClose()
          }
        >
          {icon ? <ItemIcon src={URL_BY_NAMES[icon]} /> : null}
          <ItemText width={textWidth} checked={checked}>
            {children}
          </ItemText>
          {buttonLabel ? (
            <ItemButton
              onClick={() =>
                onClick
                  ? !onClick() && onClose && onClose()
                  : onClose && onClose()
              }
            >
              {buttonLabel}
            </ItemButton>
          ) : null}
          {checked ? <CheckedIcon /> : null}
        </ActionItemContainer>
      )}
    </Consumer>
  )
}

export default function ActionSheet({
  open,
  onClose,
  title,
  from = DEFAULT_FROM,
  borderRadius = DEFAULT_BORDER_RADIUS,
  bottomSpacing = 13,
  maxContentHeight = 'calc(100vh - 256px)',
  padding,
  children,
  className,
}: React.PropsWithChildren<{
  open?: boolean
  onClose?: ActionSheetContext['onClose']
  title?: React.ReactNode
  from?: ActionSheetContext['from']
  borderRadius?: ActionSheetContext['borderRadius']
  bottomSpacing?: number
  maxContentHeight?: string | number
  padding?: MarginPadding
  className?: string
}>) {
  useEffect(() => {
    const actionSheetElem = document.querySelector(
      '#action-sheet',
    ) as HTMLElement

    if (open) {
      disableBodyScroll(actionSheetElem)
    } else {
      enableBodyScroll(actionSheetElem)
    }
  }, [open])

  const actionSheetTitle = title ? (
    typeof title === 'string' ? (
      <Title>{title}</Title>
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
      id="action-sheet"
      in={open}
      appear
      classNames="fade"
      timeout={500}
    >
      <Overlay
        from={from}
        borderRadius={borderRadius}
        padding={paddingValue}
        onClick={onClose}
      >
        <Sheet onClick={silenceEvent} className={className}>
          {actionSheetTitle}
          <Provider value={{ onClose, from, borderRadius }}>
            <ContentContainer maxContentHeight={maxContentHeight}>
              {children}
            </ContentContainer>
          </Provider>
        </Sheet>
      </Overlay>
    </CSSTransition>
  )
}

function silenceEvent(e: React.MouseEvent) {
  return e.stopPropagation()
}

ActionSheet.Item = ActionItem
