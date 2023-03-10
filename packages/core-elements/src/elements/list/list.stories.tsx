import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { List } from './list'

export default {
  title: 'core-elements / List',
  component: List,
} as ComponentMeta<typeof List>

export const Default: ComponentStoryObj<typeof List> = {
  args: {
    children: (
      <>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </>
    ),
  },
}

export const Marker: ComponentStoryObj<typeof List> = {
  args: {
    marker: true,
    children: (
      <>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </>
    ),
  },
}

export const Divided: ComponentStoryObj<typeof List> = {
  args: {
    divided: true,
    dividerWeight: 10,
    children: (
      <>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </>
    ),
  },
}
