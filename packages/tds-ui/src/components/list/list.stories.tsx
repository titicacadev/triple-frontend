import type { Meta, StoryObj } from '@storybook/react'

import { List } from './list'

export default {
  title: 'tds-ui / List',
  component: List,
} as Meta<typeof List>

export const Default: StoryObj<typeof List> = {
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

export const Marker: StoryObj<typeof List> = {
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

export const Divided: StoryObj<typeof List> = {
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
