import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { styled } from 'styled-components'

import { shouldForwardProp } from '../../utils/should-forward-prop'

import { basicButtonMixin, BasicButtonOwnProps } from './basic-button'
import { ButtonBase } from './button-base'
import { iconButtonMixin, IconButtonMixinProps } from './icon-button'
import { normalButtonMixin, NormalButtonMixinProps } from './normal-button'

export interface ButtonOwnProps
  extends BasicButtonOwnProps,
    Omit<IconButtonMixinProps, 'icon'>,
    NormalButtonMixinProps {
  /**
   * Basic 유형 버튼을 사용합니다.
   */
  basic?: boolean
  /**
   * Block Icon 유형 버튼을 사용합니다.
   */
  icon?: IconButtonMixinProps['icon']
}

export type ButtonProps = ButtonOwnProps &
  PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button = styled(ButtonBase).withConfig({
  shouldForwardProp,
})<ButtonProps>((props) => {
  if (props.basic) {
    return basicButtonMixin({
      ...props,
      bold: true,
      size: props.size || 'small',
      textAlpha: props.textAlpha || 0.5,
      textColor: props.textColor || 'gray',
    })
  }

  if (props.icon) {
    return iconButtonMixin({
      ...props,
      icon: props.icon,
      size: props.size || 'tiny',
      textAlpha: props.textAlpha || 0.5,
      textColor: props.textColor || 'gray',
    })
  }

  return normalButtonMixin({
    ...props,
    bold: true,
    borderRadius: props.borderRadius ?? 21,
    size: props.size || 'tiny',
    textAlpha: props.textAlpha,
    textColor: props.textColor || 'white',
  })
})
