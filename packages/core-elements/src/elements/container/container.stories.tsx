import { Meta, Story } from '@storybook/react'

import { Container } from './container'

export default {
  title: 'core-elements / Container',
  component: Container,
} as Meta

const Template: Story = (args) => <Container {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Basic Container' }

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
// export const CustomCss = Template.bind({})
// CustomCss.args = {
//   children: 'Custom CSS Container',
//   css: { padding: 50, backgroundColor: 'gray', color: 'white' },
//   borderRadius: 10,
// }
