import React from 'react'
import { CSSTransition } from 'react-transition-group'

import {
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

const { Provider, Consumer } = React.createContext(undefined)

function ActionItem({
  buttonLabel,
  icon,
  checked,
  onClick,
  children,
}: {
  buttonLabel?: string
  icon?: string
  checked?: boolean
  onClick?: (e?: React.SyntheticEvent) => any
  children?: React.ReactNode
}) {
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
      {({ onClose }: { onClose?: (e?: React.SyntheticEvent) => any }) => (
        <ActionItemContainer
          onClick={
            buttonLabel
              ? null
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
  reverse = false,
  borderRadius = 12,
  bottomSpacing = 13,
  maxContentHeight = 'calc(100vh - 256px)',
  children,
}: {
  open?: boolean
  onClose?: (e?: React.SyntheticEvent) => any
  title?: React.ReactNode
  reverse?: boolean
  borderRadius?: number
  bottomSpacing?: number
  maxContentHeight?: string | number
  children?: React.ReactNode
}) {
  const actionSheetTitle = title ? (
    typeof title === 'string' ? (
      <Title>{title}</Title>
    ) : (
      title
    )
  ) : null

  return (
    <CSSTransition in={open} appear classNames="fade" timeout={500}>
      <Overlay
        reverse={reverse}
        borderRadius={borderRadius}
        bottomSpacing={bottomSpacing}
        onClick={onClose}
      >
        <Sheet onClick={silenceEvent}>
          {actionSheetTitle}
          <Provider value={{ onClose, reverse, borderRadius }}>
            <ContentContainer maxContentHeight={maxContentHeight}>
              {children}
            </ContentContainer>
          </Provider>
        </Sheet>
      </Overlay>
    </CSSTransition>
  )
}

function silenceEvent(e) {
  return e.stopPropagation()
}

ActionSheet.Item = ActionItem
