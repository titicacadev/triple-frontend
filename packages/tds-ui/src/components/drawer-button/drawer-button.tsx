import { styled } from 'styled-components'

import { Drawer, DrawerProps } from '../drawer/drawer'
import { Container } from '../container'
import { Button, ButtonProps } from '../button'
import {
  paddingMixin,
  PaddingMixinProps,
  safeAreaInsetMixin,
} from '../../mixins'

const ButtonWithSafeAreaInset = styled(Button)<PaddingMixinProps>`
  ${paddingMixin}
  ${safeAreaInsetMixin}
`

export type DrawerButtonProps = Omit<DrawerProps, 'overflow'> & ButtonProps

export function DrawerButton({
  children,
  active = false,
  duration,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: DrawerButtonProps) {
  return (
    <Drawer
      active={active}
      duration={duration}
      overflow="hidden"
      onEnter={onEnter}
      onEntered={onEntered}
      onExit={onExit}
      onExited={onExited}
      {...props}
    >
      <Container backgroundColor="white">
        <ButtonWithSafeAreaInset
          size="large"
          borderRadius={0}
          fluid
          padding={{ top: 16, right: 25, bottom: 18, left: 25 }}
        >
          {children}
        </ButtonWithSafeAreaInset>
      </Container>
    </Drawer>
  )
}
