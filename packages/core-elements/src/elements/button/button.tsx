import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

import { basicButtonMixin, BasicButtonProps } from './basic-button'
import { ButtonBase } from './button-base'
import { ButtonContainer } from './button-container'
import { ButtonGroup } from './button-group'
import { ButtonIcon } from './button-icon'
import { iconButtonMixin, IconButtonProps } from './icon-button'
import { normalButtonMixin, NormalButtonProps } from './normal-button'

export interface ButtonOwnProps
  extends BasicButtonProps,
    Omit<IconButtonProps, 'icon'>,
    NormalButtonProps {
  /**
   * Basic 유형 버튼을 사용합니다.
   */
  basic?: boolean
  /**
   * Block Icon 유형 버튼을 사용합니다.
   */
  icon?: IconButtonProps['icon']
}

export type ButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement>

const ButtonComponent = styled(ButtonBase)<ButtonOwnProps>((props) => {
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

ButtonComponent.displayName = 'Button'

type CompoundedButton = typeof ButtonComponent & {
  Container: typeof ButtonContainer
  Group: typeof ButtonGroup
  Icon: typeof ButtonIcon
}

export const Button = ButtonComponent as CompoundedButton

Button.Container = ButtonContainer
Button.Group = ButtonGroup
Button.Icon = ButtonIcon
