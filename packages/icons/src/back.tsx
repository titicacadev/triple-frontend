import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { gray as defaultSvgIconColor } from '@titicaca/color-palette'

import { IconBaseProps } from './types'
import { SvgIcon } from './base'

export default function Back({
  color,
  width = 34,
  height = 34,
  strokeWidth = 1.6,
  opacity = 1,
  ...rest
}: IconBaseProps) {
  const { colors } = useContext(ThemeContext) || { colors: {} }
  const stroke = color || colors.primary || defaultSvgIconColor

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
        opacity={opacity}
      >
        <path d="M7.907 16L0 8.047 8 0M.2 8L16 8" transform="translate(9 9)" />
      </g>
    </SvgIcon>
  )
}
