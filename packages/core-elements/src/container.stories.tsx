import { Container } from '@titicaca/core-elements'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Core-Elements / Container',
  component: Container,
} as Meta

const Template: Story = (args) => <Container {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Basic Container' }

export const CustomCss = Template.bind({})
CustomCss.args = {
  children: 'Custom CSS Container',
  css: { padding: 50, backgroundColor: 'gray', color: 'white' },
  borderRadius: 10,
}
