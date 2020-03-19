import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { GlobalColors } from '@titicaca/core-elements'
import { generateUniqueKey } from '@titicaca/view-utilities'
import { useBodyScrollLock } from '@titicaca/react-hooks'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);
  z-index: 10;
`

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 295px;
  transform: translate(-50%, -50%);
  z-index: 11;
  border-radius: 6px;
  background-color: #fff;
  margin: 0;
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

      return css`
        width: calc((100% - ${childrenCount - 1}px) / ${childrenCount});
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
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'gray']};
  cursor: pointer;
`

export default function ModalBase({
  open = false,
  onClose,
  children,
}: {
  open: boolean
  onClose?: (e: React.SyntheticEvent) => any
  children?: React.ReactNode
}) {
  const elementId = useMemo(() => generateUniqueKey('modal'), [])

  useBodyScrollLock(elementId, open)

  return open ? (
    <Overlay id={elementId} onClick={onClose}>
      <Box onClick={(e?: React.SyntheticEvent) => silenceEvent(e)}>
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
