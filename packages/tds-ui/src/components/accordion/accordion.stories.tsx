import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../text'

import { Accordion } from './accordion'
import { AccordionContent } from './accordion-content'
import { AccordionFolded } from './accordion-folded'
import { AccordionTitle } from './accordion-title'

const meta: Meta<typeof Accordion> = {
  title: 'tds-ui / Accordion',
  component: Accordion,
  argTypes: {
    active: { control: 'boolean' },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: '콘텐츠를 확장하고 축소하는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
}

export default meta

export const BusinessHours: StoryObj<typeof Accordion> = {
  args: {
    active: true,
    children: (
      <>
        <AccordionTitle>
          <Text bold>이용가능시간, 휴무일</Text>
        </AccordionTitle>
        <AccordionFolded>
          <Text bold color="blue">
            오늘 09:00 - 18:00
          </Text>
        </AccordionFolded>
        <AccordionContent>
          <Text>
            월<br />화<br />수<br />목<br />금<br />토<br />일
          </Text>
        </AccordionContent>
      </>
    ),
  },
}
