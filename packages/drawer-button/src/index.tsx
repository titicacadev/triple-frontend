import styled from 'styled-components'
import {
  Drawer,
  Container,
  Button,
  safeAreaInsetMixin,
  ButtonProps,
  paddingMixin,
  DrawerProps,
} from '@titicaca/core-elements'

const ButtonWithSafeAreaInset = styled(Button)`
  ${paddingMixin}
  ${safeAreaInsetMixin}
`

export type DrawerButtonProps = Omit<DrawerProps, 'overflow'> & ButtonProps

function DrawerButton({
  children,
  active = false,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}: DrawerButtonProps) {
  return (
    <Drawer
      active={active}
      overflow="hidden"
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      <Container backgroundColor="white">
        <ButtonWithSafeAreaInset
          size="large"
          borderRadius={0}
          fluid
          padding={{ top: 16, right: 25, bottom: 18, left: 25 }}
          {...props}
        >
          {children}
        </ButtonWithSafeAreaInset>
      </Container>
    </Drawer>
  )
}

export default DrawerButton
