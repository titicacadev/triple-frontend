import { useTheme } from 'styled-components'
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
  const theme = useTheme()
  const stroke =
    color ||
    (theme as { colors?: { primary?: string } }).colors?.primary ||
    defaultSvgIconColor

  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...rest}
    >
      {/* <image
        xlinkHref="https://assets.triple.guide/images/btn-com-back@4x.png"
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
        <path d="M7.907 16L0 8.047 8 0M.2 8L16 8" />
      </g>
    </SvgIcon>
  )
}
