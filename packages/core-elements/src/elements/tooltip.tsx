import * as React from 'react'
import * as CSS from 'csstype'
import styled, { css } from 'styled-components'
import { GetGlobalColor } from '../commons'

interface PointingOptions {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
  horizontalOffset?: number
}

interface TooltipFrameProps {
  positioning?: Partial<Record<CSS.Position<string>, number | string>>
  borderRadius?: string
  floating?: boolean
  backgroundColor?: string

  pointing?: PointingOptions
}
interface TooltipProps extends TooltipFrameProps {
  label: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  nowrap?: boolean
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

  ${({ backgroundColor = 'rgba(13, 208, 175, 1)' }) =>
    backgroundColor && `background-color: ${backgroundColor}`};

  ${({ pointing, backgroundColor = 'rgba(13, 208, 175, 1)' }) => {
    switch (pointing.vertical) {
      case 'top':
        return `
          &::before {
            ${POINTING_BASE_STYLE}

            top: -6px;
            ${pointing.horizontal}: ${pointing.horizontalOffset}px;
            border-bottom: 5px solid ${backgroundColor};
          }
        `
      case 'bottom':
        return `
          &::after {
            ${POINTING_BASE_STYLE}

            bottom: -6px;
            ${pointing.horizontal}: ${pointing.horizontalOffset}px;
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

  ${({ positioning }) =>
    positioning &&
    css`
      position: absolute;
      ${typeof positioning.top === 'number' ? `top: ${positioning.top}px;` : ''}
      ${
        typeof positioning.right === 'number'
          ? `right: ${positioning.right}px;`
          : ''
      }
      ${
        typeof positioning.bottom === 'number'
          ? `bottom: ${positioning.bottom}px;`
          : ''
      }
      ${
        typeof positioning.left === 'number'
          ? `left: ${positioning.left}px;`
          : ''
      }
    `}

  ${({ floating }) => floating && 'box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);'}
`

const TooltipContainer = styled.div<{ paddingRight?: number; nowrap: boolean }>`
  position: relative;
  font-size: 12px;
  font-weight: bold;

  ${({ paddingRight }) =>
    paddingRight &&
    css`
      padding-right: ${paddingRight}px;
    `}

  ${({ nowrap }) => nowrap && 'white-space: nowrap;'}
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
  nowrap,

  ...frameProps
}: TooltipProps) {
  return (
    <TooltipFrame
      {...{
        ...frameProps,
        pointing: frameProps.pointing || {
          vertical: 'bottom',
          horizontal: 'left',
          horizontalOffset: 26,
        },
      }}
    >
      <TooltipContainer paddingRight={onClick && 12} nowrap={nowrap}>
        {label}
        {onClick && <ArrowRight />}
      </TooltipContainer>
    </TooltipFrame>
  )
}

export default Tooltip
