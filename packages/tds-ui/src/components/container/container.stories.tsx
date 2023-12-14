import type { Meta } from '@storybook/react'

import { Container } from './container'

export default {
  title: 'tds-ui / Container',
  component: Container,
} as Meta

export const Basic = {
  args: { children: 'Basic Container' },
}

export const CustomCss = () => {
  return (
    <Container
      css={{ padding: 50, backgroundColor: 'gray', color: 'white' }}
      borderRadius={10}
    >
      Custom CSS Container
    </Container>
  )
}
