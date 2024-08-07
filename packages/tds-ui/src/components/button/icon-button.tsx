import { css } from 'styled-components'

import { buttonBaseMixin, ButtonBaseMixinProps } from './button-base'
import { ButtonSize } from './types'

const ICON_BUTTON_URLS = {
  saveEmpty: 'https://assets.triple.guide/images/btn-end-save-off@4x.png',
  saveFilled: 'https://assets.triple.guide/images/btn-end-save-on@4x.png',
  starEmpty: 'https://assets.triple.guide/images/btn-end-review@4x.png',
  starFilled: 'https://assets.triple.guide/images/btn-end-review-on@4x.png',
  map: 'https://assets.triple.guide/images/btn-end-search-place@2x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@3x.png',
  schedule: 'https://assets.triple.guide/images/btn-end-schedule@4x.png',
} as const

export type Icon = keyof typeof ICON_BUTTON_URLS

const ICON_PADDINGS: Partial<Record<ButtonSize, ReturnType<typeof css>>> = {
  tiny: css({ padding: '12px' }),
}

export interface IconButtonMixinProps extends ButtonBaseMixinProps {
  icon: Icon
}

export const iconButtonMixin = ({
  icon,
  size = 'tiny',
  ...props
}: IconButtonMixinProps) => css`
  ${buttonBaseMixin({ size, ...props })}
  ${ICON_PADDINGS[size]}

  &::before {
    content: '';
    display: block;
    height: 30px;
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('${ICON_BUTTON_URLS[icon]}');
  }
`
