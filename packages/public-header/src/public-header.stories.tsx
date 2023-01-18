import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'

import { PublicHeader } from './public-header'

export default {
  title: 'public-header / PublicHeader',
  component: PublicHeader,
  argTypes: {
    category: {
      control: { type: 'select' },
      options: ['air', 'hotels', 'tna'],
    },
  },
} as ComponentMeta<typeof PublicHeader>

export const Basic: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    disableAutoHide: true,
  },
}

export const DeeplinkPath: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    ...Basic.args,
    deeplinkPath: 'https://triple.guide',
  },
}

export const LoungeHome: ComponentStoryObj<typeof PublicHeader> = {
  args: {
    ...Basic.args,
    ...DeeplinkPath.args,
    isLoungeHome: true,
    loungeHomeEventLabel: '웹_메인',
  },
}

export const Categories: ComponentStory<typeof PublicHeader> = () => {
  return (
    <>
      <PublicHeader disableAutoHide category="air" />
      <PublicHeader disableAutoHide category="hotels" />
      <PublicHeader disableAutoHide category="tna" />
    </>
  )
}
