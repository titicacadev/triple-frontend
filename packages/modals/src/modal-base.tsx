import styled, { css } from 'styled-components'
import {
  GlobalColors,
  layeringMixin,
  LayeringMixinProps,
} from '@titicaca/core-elements'
import { ReactNode, Children, SyntheticEvent } from 'react'

const Overlay = styled.div<LayeringMixinProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);

  ${layeringMixin(3)}
`

const Box = styled.div<{ width?: number } & LayeringMixinProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ width }) => `${width}px`};
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: #fff;
  user-select: none;

  ${layeringMixin(0)}
`

const Actions = styled.div<{ children?: ReactNode }>`
  display: block;
  width: 100%;
  height: 50px;
  border-top-style: solid;
  border-width: 1px;
  border-color: #f5f5f5;

  a {
    ${({ children }) => {
      const childrenCount = Children.count(children)

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
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${({ color }) => ACTION_COLORS[color || 'gray']};
`

function ModalBase({
  open,
  onClose,
  children,
  width = 295,
  zTier,
  zIndex,
}: {
  open?: boolean
  onClose?: (e: SyntheticEvent) => unknown
  children?: ReactNode
  width?: number
} & LayeringMixinProps) {
  return open ? (
    <Overlay onClick={onClose} zTier={zTier} zIndex={zIndex}>
      <Box
        role="dialog"
        onClick={(e?: SyntheticEvent) => silenceEvent(e)}
        width={width}
        zIndex={1}
      >
        {children}
      </Box>
    </Overlay>
  ) : null
}

export function silenceEvent(e?: SyntheticEvent) {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent && e.nativeEvent.stopImmediatePropagation()
  }
}

ModalBase.Actions = Actions
ModalBase.Action = Action

export default ModalBase
