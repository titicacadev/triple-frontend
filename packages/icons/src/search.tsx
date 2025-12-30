import { useTheme } from 'styled-components'
import { gray as defaultSvgIconColor } from '@titicaca/color-palette'

import { IconBaseProps } from './types'
import { SvgIcon } from './base'

export default function Search({
  color,
  width = 34,
  height = 34,
  strokeWidth = 1.6,
  opacity = 1,
  ...rest
}: IconBaseProps) {
  const theme = useTheme()
  const stroke =
    color ||
    (theme as { colors?: { primary?: string } }).colors?.primary ||
    defaultSvgIconColor

  return (
    <SvgIcon
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...rest}
    >
      {/* <image
        xlinkHref="https://assets.triple.guide/images/btn-com-search@3x.png"
        width={width}
      /> */}
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        opacity={opacity}
        transform="translate(9 9)"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 11L16.5 16.5"
        />
        <circle cx="6.25" cy="6.25" r="6.25" />
      </g>
    </SvgIcon>
  )
}
