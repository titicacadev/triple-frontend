import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

interface PointingOptions {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
  horizontalOffset?: number
}

interface TooltipFrameProps {
  positioning?: Partial<
    Record<'top' | 'right' | 'bottom' | 'left', number | string>
  >
  borderRadius?: string
  hasShadow?: boolean
  backgroundColor: string
  pointing: PointingOptions
}

interface TooltipProps extends Partial<TooltipFrameProps> {
  label: string
  onClick?: MouseEventHandler<HTMLDivElement>
  nowrap?: boolean
}

const DEFAULT_POINTING_OPTION = {
  vertical: 'bottom',
  horizontal: 'left',
  horizontalOffset: 26,
} as const

const DEFAULT_BACKGROUND_COLOR = 'rgba(13, 208, 175, 1)'

const POINTING_BASE_STYLE = css`
  position: absolute;
  content: '';
  width: 11px;
  height: 11px;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
`

const TooltipFrame = styled.div<TooltipFrameProps>`
  position: relative;
  color: rgba(${getColor('white')});
  padding: 6px 11px;

  ${({ backgroundColor }) => `background-color: ${backgroundColor}`};

  ${({ pointing, backgroundColor }) => {
    switch (pointing.vertical) {
      case 'top':
        return `
          &::before {
            ${POINTING_BASE_STYLE}

            top: -11px;
            ${pointing.horizontal}: ${pointing.horizontalOffset}px;
            border-bottom: 5px solid ${backgroundColor};
          }
        `
      case 'bottom':
        return `
          &::after {
            ${POINTING_BASE_STYLE}

            bottom: -11px;
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
      ${typeof positioning.right === 'number'
        ? `right: ${positioning.right}px;`
        : ''}
      ${typeof positioning.bottom === 'number'
        ? `bottom: ${positioning.bottom}px;`
        : ''}
      ${typeof positioning.left === 'number'
        ? `left: ${positioning.left}px;`
        : ''}
    `}

  ${({ hasShadow }) => hasShadow && 'box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);'}
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
  top: 50%;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-size: 9px 13px;
  background-image: url('https://assets.triple.guide/images/ico-arrow-right-w@3x.png');
`

export function Tooltip({
  label,
  onClick,
  nowrap,
  ...frameProps
}: TooltipProps) {
  return (
    <TooltipFrame
      {...{
        ...frameProps,
        backgroundColor: frameProps.backgroundColor || DEFAULT_BACKGROUND_COLOR,
        pointing: frameProps.pointing || DEFAULT_POINTING_OPTION,
      }}
      onClick={onClick}
    >
      <TooltipContainer paddingRight={onClick && 12} nowrap={!!nowrap}>
        {label}
        {onClick && <ArrowRight />}
      </TooltipContainer>
    </TooltipFrame>
  )
}
