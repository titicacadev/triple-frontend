import { Container } from '@titicaca/core-elements'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Core-Elements / Container',
  component: Container,
} as Meta

const Template: Story = (args) => <Container {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Basic Container' }
