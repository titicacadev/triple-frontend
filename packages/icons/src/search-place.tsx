import { useTheme } from 'styled-components'
import { gray as defaultSvgIconColor } from '@titicaca/color-palette'

import { IconBaseProps } from './types'
import { SvgIcon } from './base'

export default function SearchPlace({
  color,
  width = 34,
  height = 34,
  strokeWidth = 0,
  opacity = 1,
  ...rest
}: IconBaseProps) {
  const theme = useTheme()
  const stroke =
    color ||
    (theme as { colors?: { primary?: string } })?.colors?.primary ||
    defaultSvgIconColor

  return (
    <SvgIcon
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...rest}
    >
      {/* <image
        xlinkHref="https://assets.triple.guide/images/ico-search-place@4x.png"
        width={width}
      /> */}
      <path
        fill={stroke}
        stroke={stroke}
        opacity={opacity}
        strokeWidth={strokeWidth}
        d="M20.67 10.664c-.368.185-.972.185-1.341 0l-4.658-2.329c-.37-.184-.973-.184-1.342 0L8 11v13.382c0 .552.448 1 1 1 .155 0 .308-.036.447-.106l3.882-1.94c.37-.185.973-.185 1.342 0l4.658 2.329c.37.184.973.184 1.342 0L26 23V9.618c0-.552-.448-1-1-1-.155 0-.308.036-.447.106l-3.882 1.94zm-5.92-.612l4.5 2.25v11.646l-4.5-2.25V10.052zM9.5 11.927l3.75-1.875v11.646L9.5 23.573V11.927zm15 10.146l-3.75 1.875V12.302l3.75-1.875v11.646z"
      />
    </SvgIcon>
  )
}
