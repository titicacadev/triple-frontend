import { ElementType, forwardRef, ReactElement } from 'react'

import { PolymorphicPropsWithRef, PolymorphicRef } from '../../polymorphic'

import { BasicButton, BasicButtonProps } from './basic-button'
import { ButtonContainer } from './button-container'
import { ButtonGroup } from './button-group'
import { ButtonIcon } from './button-icon'
import { IconButton, IconButtonProps } from './icon-button'
import { NormalButton, NormalButtonProps } from './normal-button'

const ButtonDefaultElement = 'button'

export type ButtonProps<C extends ElementType = typeof ButtonDefaultElement> =
  PolymorphicPropsWithRef<
    C,
    BasicButtonProps &
      Omit<IconButtonProps, 'icon'> &
      NormalButtonProps & {
        basic?: boolean
        icon?: IconButtonProps['icon']
      }
  >

type ButtonComponentType = <
  C extends ElementType = typeof ButtonDefaultElement,
>(
  props: ButtonProps<C>,
) => ReactElement | null

const ButtonComponent: ButtonComponentType = forwardRef(function Button<
  C extends ElementType = typeof ButtonDefaultElement,
>(
  {
    children,
    as,
    basic,
    borderRadius,
    icon,
    size,
    textAlpha,
    textColor,
    ...props
  }: ButtonProps<C>,
  ref?: PolymorphicRef<C>,
) {
  const Element = as || ButtonDefaultElement

  if (basic) {
    return (
      <BasicButton
        ref={ref}
        as={Element}
        bold
        size={size || 'small'}
        textAlpha={textAlpha || 0.5}
        textColor={textColor || 'gray'}
        {...props}
      >
        {children}
      </BasicButton>
    )
  }

  if (icon) {
    return (
      <IconButton
        ref={ref}
        as={Element}
        icon={icon}
        size={size || 'tiny'}
        textColor={textColor || 'gray'}
        textAlpha={textAlpha || 0.5}
        {...props}
      >
        {children}
      </IconButton>
    )
  }

  return (
    <NormalButton
      ref={ref}
      as={Element}
      bold
      size={size || 'tiny'}
      textColor={textColor || 'white'}
      textAlpha={textAlpha}
      borderRadius={borderRadius ?? 21}
      {...props}
    >
      {children}
    </NormalButton>
  )
})

type CompoundedButton = typeof ButtonComponent & {
  Container: typeof ButtonContainer
  Group: typeof ButtonGroup
  Icon: typeof ButtonIcon
}

export const Button = ButtonComponent as CompoundedButton

Button.Container = ButtonContainer
Button.Group = ButtonGroup
Button.Icon = ButtonIcon
