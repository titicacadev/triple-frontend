import * as React from 'react'
import * as CSS from 'csstype'
import styled, { css } from 'styled-components'
import { GetGlobalColor } from '../commons'

const TooltipFrame = styled.div<{
  absolute?: Partial<Record<CSS.Position<string | number>, string>>
  borderRadius?: string
}>`
  background: rgba(13, 208, 175, 1);
  color: rgba(${GetGlobalColor('white')}, 1);
  padding: 6px 11px;

  &::before {
    position: absolute;
    content: '';
    width: 1px;
    height: 1px;
    border-top: 5px solid rgba(13, 208, 175, 1);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    top: 100%;
    left: 26px;
  }

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `}

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      ${typeof absolute.top === 'number' ? `top: ${absolute.top}px;` : ''}
      ${typeof absolute.right === 'number' ? `right: ${absolute.right}px;` : ''}
      ${
        typeof absolute.bottom === 'number'
          ? `bottom: ${absolute.bottom}px;`
          : ''
      }
      ${typeof absolute.left === 'number' ? `left: ${absolute.left}px;` : ''}
    `}
`

const TooltipContainer = styled.div<{ paddingRight?: number }>`
  position: relative;
  font-size: 12px;
  font-weight: bold;

  ${({ paddingRight }) =>
    paddingRight &&
    css`
      padding-right: ${paddingRight}px;
    `}
`

const ArrowRight = styled.span`
  width: 9px;
  height: 13px;
  margin: 0;
  padding: 0;
  top: 50%;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-size: 9px 13px;
  background-image: url(https://assets.triple.guide/images/ico-arrow-right-w@3x.png);
`

function Tooltip({ label, onClick, borderRadius, absolute }) {
  return (
    <TooltipFrame
      borderRadius={borderRadius}
      absolute={absolute}
      onClick={onClick}
    >
      <TooltipContainer paddingRight={onClick && 12}>
        {label}
        {onClick && <ArrowRight />}
      </TooltipContainer>
    </TooltipFrame>
  )
}

export default Tooltip
