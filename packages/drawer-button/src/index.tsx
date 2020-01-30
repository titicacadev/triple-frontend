import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import {
  Drawer,
  Button,
  safeAreaInsetMixin,
  ButtonProps,
  paddingMixin,
} from '@titicaca/core-elements'

const ButtonWithSafeAreaInset = styled(Button)`
  ${paddingMixin}
  ${safeAreaInsetMixin}
`

export default function DrawerButton({
  active,
  children,
  ...props
}: PropsWithChildren<{ active?: boolean } & ButtonProps>) {
  return (
    <Drawer active={active} overflow="hidden">
      <ButtonWithSafeAreaInset
        size="large"
        borderRadius={0}
        fluid
        padding={{ top: 16, right: 25, bottom: 18, left: 25 }}
        {...props}
      >
        {children}
      </ButtonWithSafeAreaInset>
    </Drawer>
  )
}
