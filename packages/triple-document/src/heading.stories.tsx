import type { Meta, StoryFn } from '@storybook/react'

import ELEMENTS from './elements'

const {
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
} = ELEMENTS

export default { title: 'triple-document / heading' } as Meta

const Heading1Template: StoryFn<{
  // FIXME: HeadingProps
  value: { text: string; href?: string; emphasize?: boolean; headline?: string }
}> = (args) => <Heading1 {...args} />

export const Heading1Normal = {
  render: Heading1Template,

  args: {
    value: { text: '제목1: bold 21' },
  },

  name: '제목 1 기본',
}

export const Heading1Emphasized = {
  render: Heading1Template,

  args: {
    value: { emphasize: true, text: '제목0: bold 21 #2987F0' },
  },

  name: '제목 1 강조',
}

export const Heading1WithHeadline = {
  render: Heading1Template,

  args: {
    value: {
      text: '제목1: bold 21',
      headline: '보조: bold 13 #2987F0',
    },
  },

  name: '보조 문구가 있는 제목 1',
}

export function Heading2Example() {
  return <Heading2 value={{ text: '제목2: medium 19' }} />
}
Heading2Example.storyName = '제목 2'

export function Heading3Example() {
  return <Heading3 value={{ text: '제목3: bold 16' }} />
}
Heading3Example.storyName = '제목 3'

export function Heading4Example() {
  return <Heading4 value={{ text: '제목4: bold 16 #2987F0' }} />
}
Heading4Example.storyName = '제목 4'
