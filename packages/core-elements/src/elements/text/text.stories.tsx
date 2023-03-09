import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Text, TextTitle } from './text'

export default {
  title: 'core-elements / Text',
  component: Text,
} as ComponentMeta<typeof Text>

export const Default: ComponentStoryObj<typeof Text> = {
  args: {
    size: 'small',
    children: 'default text example',
  },
}

export const Bullet: ComponentStoryObj<typeof Text> = {
  args: {
    size: 'small',
    color: 'gray500',
    bullet: true,
    children: 'bullet text example',
  },
}

export const Title: ComponentStoryObj<typeof TextTitle> = {
  args: {
    children: 'text title example',
  },
}
