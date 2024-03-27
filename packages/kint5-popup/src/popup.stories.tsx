import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { Popup } from './popup'

export default {
  title: 'kint5-popup / Popup',
  component: Popup,
  parameters: {
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
} as Meta<typeof Popup>

const EmptyScroll = styled.div`
  height: 200vh;
`

export const Basic: StoryObj<typeof Popup> = {
  args: {
    open: true,
    title: '테스트',
    children: <EmptyScroll>Scroll........</EmptyScroll>,
  },
}

export const Borderless: StoryObj<typeof Popup> = {
  args: {
    open: true,
    title: '테스트',
    children: <EmptyScroll>Scroll........</EmptyScroll>,
  },
}

export const NoNavbar: StoryObj<typeof Popup> = {
  args: {
    open: true,
    noNavbar: true,
    title: '테스트',
    children: <EmptyScroll>Scroll........</EmptyScroll>,
  },
}
