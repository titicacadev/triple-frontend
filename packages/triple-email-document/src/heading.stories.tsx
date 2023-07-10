import type { Meta, StoryFn } from '@storybook/react'

import ELEMENTS from './elements'

const {
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
} = ELEMENTS

export default {
  title: 'triple-email-document / Heading',
} as Meta

const Heading1Template: StoryFn<typeof Heading1> = (args) => (
  <Heading1 {...args} />
)

export const Heading1Normal = {
  render: Heading1Template,

  args: {
    value: {
      text: '제목 1: bold 21px',
    },
  },

  name: '제목 1 기본',
}

export const Heading1WithHeadline = {
  render: Heading1Template,

  args: {
    value: {
      headline: '헤드라인: bold 13px #2987F0',
      text: '제목 1: bold 21px',
    },
  },

  name: '제목 1 헤드라인 포함',
}

export function Heading2Example() {
  return <Heading2 value={{ text: '제목2: medium 19px' }} />
}
Heading2Example.storyName = '제목 2'

export function Heading3Example() {
  return <Heading3 value={{ text: '제목3: bold 16px' }} />
}
Heading3Example.storyName = '제목 3'

export function Heading4Example() {
  return <Heading4 value={{ text: '제목4: bold 16px #2987F0' }} />
}
Heading4Example.storyName = '제목 4'
