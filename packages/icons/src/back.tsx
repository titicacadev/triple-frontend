import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { gray } from '@titicaca/color-palette'

import { IconBaseProps } from '.'

const SvgIcon = styled.svg`
  width: ${(props) => props.width || 36}px;
  height: ${(props) => props.height || 36}px;
`

export default function Back({
  color,
  width = 34,
  height = 34,
  strokeWidth = 1.6,
  ...rest
}: IconBaseProps) {
  const { colors } = useContext(ThemeContext) || { colors: {} }
  const stroke = color || colors.primary || gray

  return (
    <SvgIcon
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...rest}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      >
        <path d="M7.907 16L0 8.047 8 0M.2 8L16 8" transform="translate(9 9)" />
      </g>
    </SvgIcon>
  )
}
