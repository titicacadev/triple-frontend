import { useTheme } from 'styled-components'
import { gray as defaultSvgIconColor } from '@titicaca/color-palette'

import { IconBaseProps } from './types'
import { SvgIcon } from './base'

const SVG_ATTRIBUTES_BY_DIRECTION = {
  left: {
    d: 'M33.942 35L29 30.029 34 25',
    transform:
      'translate(-132 -541) translate(132 541) matrix(-1 0 0 1 60 0) matrix(-1 0 0 1 63 0)',
  },
  right: {
    d: 'M23.942 25L19 20.029 24 15',
    transform:
      'translate(-833 -541) translate(833 541) translate(10 10) matrix(-1 0 0 1 43 0)',
  },
}

export default function ArrowIcon({
  color,
  strokeWidth = 2,
  opacity = 1,
  direction,
}: Omit<IconBaseProps, 'width' | 'height'> & {
  direction: 'left' | 'right'
}) {
  const { d, transform } = SVG_ATTRIBUTES_BY_DIRECTION[direction]
  const theme = useTheme()
  const stroke =
    color ||
    (theme as { colors?: { primary?: string } }).colors?.primary ||
    defaultSvgIconColor

  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 60 60"
      width={60}
      height={60}
    >
      <defs>
        <filter
          id="flg20b2sqa"
          width="137.5%"
          height="137.5%"
          x="-18.8%"
          y="-18.8%"
          filterUnits="objectBoundingBox"
        >
          <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="2.5"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
        </filter>
        <circle id="t13s0b9p6b" cx="30" cy="30" r="20" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-132 -541) translate(132 541) matrix(-1 0 0 1 60 0)">
                <use
                  fill="#000"
                  filter="url(#flg20b2sqa)"
                  xlinkHref="#t13s0b9p6b"
                />
                <use fill="#FFF" xlinkHref="#t13s0b9p6b" />
              </g>
              <path
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
                opacity={opacity}
                d={d}
                transform={transform}
              />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  )
}
