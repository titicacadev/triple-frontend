import * as React from 'react'
import * as CSS from 'csstype'
import styled, { css } from 'styled-components'
import { GetGlobalColor } from '../commons'

interface TooltipFrameProps {
  absolute?: Partial<Record<CSS.Position<string | number>, string>>
  borderRadius?: string
  pointingPosition?: 'above' | 'below'
  floating?: boolean
  backgroundColor?: string
}
interface TooltipProps extends TooltipFrameProps {
  label: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const POINTING_BASE_STYLE = css`
  position: absolute;
  content: '';
  width: 1px;
  height: 1px;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
`

const TooltipFrame = styled.div<TooltipFrameProps>`
  position: relative;
  color: rgba(${GetGlobalColor('white')}, 1);
  padding: 6px 11px;

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`};

  ${({ pointingPosition, backgroundColor }) => {
    switch (pointingPosition) {
      case 'above':
        return `
          &::before {
            ${POINTING_BASE_STYLE}

            top: -6px;
            left: 26px;
            border-bottom: 5px solid ${backgroundColor};
          }
        `
      case 'below':
        return `
          &::after {
            ${POINTING_BASE_STYLE}

            top: 100%;
            left: 26px;
            border-top: 5px solid ${backgroundColor};
          }
         `
    }
  }}

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

  ${({ floating }) => floating && 'box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);'}
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

function Tooltip({
  label,
  onClick,
  borderRadius,
  absolute,
  pointingPosition,
  floating,
  backgroundColor,
}: TooltipProps) {
  return (
    <TooltipFrame
      borderRadius={borderRadius}
      absolute={absolute}
      onClick={onClick}
      pointingPosition={pointingPosition || 'below'}
      floating={floating}
      backgroundColor={backgroundColor || 'rgba(13, 208, 175, 1)'}
    >
      <TooltipContainer paddingRight={onClick && 12}>
        {label}
        {onClick && <ArrowRight />}
      </TooltipContainer>
    </TooltipFrame>
  )
}

export default Tooltip
