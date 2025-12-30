import { useTheme } from 'styled-components'
import { gray as defaultSvgIconColor } from '@titicaca/color-palette'

import { IconBaseProps } from './types'
import { SvgIcon } from './base'

export default function Close({
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
        xlinkHref="https://assets.triple.guide/images/btn-com-close@3x.png"
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
      >
        <path d="M6.918 14L0 7.041 7 0" transform="matrix(-1 0 0 1 17 10)" />
        <path d="M6.918 14L0 7.041 7 0" transform="translate(17 10)" />
      </g>
    </SvgIcon>
  )
}
