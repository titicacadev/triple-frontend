import * as React from 'react'
import styled, { css } from 'styled-components'
import {
  GlobalColors,
  layeringMixin,
  LayeringMixinProps,
} from '@titicaca/core-elements'

const Overlay = styled.div<LayeringMixinProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);

  ${layeringMixin(3)}
`

const Box = styled.div<LayeringMixinProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 295px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: #fff;
  margin: 0;
  user-select: none;

  ${layeringMixin(0)}
`

const Actions = styled.div<{ children?: any }>`
  display: block;
  width: 100%;
  height: 50px;
  border-top-style: solid;
  border-width: 1px;
  border-color: #f5f5f5;

  a {
    ${({ children }) => {
      const childrenCount = React.Children.count(children)
      // Modal Box 의 width - 내부 Children 개수 - 1 / Children 개수
      const width = (295 - childrenCount - 1) / childrenCount
      return css`
        width: ${width}px;
      `
    }};

    padding-left: 0;
    padding-right: 0;
  }

  a:not(:first-child) {
    border-width: 1px;
    border-left-style: solid;
    border-color: #f5f5f5;
  }
`

const ACTION_COLORS: Partial<Record<GlobalColors, string>> = {
  gray: 'rgba(58, 58, 58, 0.5)',
  blue: '#368fff',
}

const Action = styled.a<{ color?: GlobalColors }>`
  display: inline-block;
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'gray']};
  cursor: pointer;
`

export default function ModalBase({
  open,
  onClose,
  children,
  zTier,
  zIndex,
}: {
  open?: boolean
  onClose?: (e: React.SyntheticEvent) => any
  children?: React.ReactNode
} & LayeringMixinProps) {
  return open ? (
    <Overlay onClick={onClose} zTier={zTier} zIndex={zIndex}>
      <Box
        role="dialog"
        onClick={(e?: React.SyntheticEvent) => silenceEvent(e)}
        zIndex={1}
      >
        {children}
      </Box>
    </Overlay>
  ) : null
}

function silenceEvent(e?: React.SyntheticEvent) {
  e && e.stopPropagation()
  e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation()
}

ModalBase.Actions = Actions
ModalBase.Action = Action
