import styled from 'styled-components'
import {
  Drawer,
  Container,
  Button,
  safeAreaInsetMixin,
  ButtonProps,
  paddingMixin,
  DrawerProps,
  MarginPadding,
} from '@titicaca/core-elements'

const ButtonWithSafeAreaInset = styled(Button)<{ padding?: MarginPadding }>`
  ${paddingMixin}
  ${safeAreaInsetMixin}
`

export type DrawerButtonProps = Omit<DrawerProps, 'overflow'> & ButtonProps

function DrawerButton({
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
