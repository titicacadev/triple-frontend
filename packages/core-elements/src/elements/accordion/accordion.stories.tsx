/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentMeta, ComponentStoryFn } from '@storybook/react'

import { Text } from '../text'

import { Accordion } from './accordion'
import { AccordionContent } from './accordion-content'
import { AccordionFolded } from './accordion-folded'
import { AccordionTitle } from './accordion-title'

export default {
  title: 'core-elements / Accordion',
  component: Accordion,
  subcomponents: {
    AccordionContent,
    AccordionFolded,
    AccordionTitle,
  },
} as ComponentMeta<typeof Accordion>

export const BusinessHours: ComponentStoryFn<typeof Accordion> = (args) => {
  return (
    <Accordion {...args}>
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
    </Accordion>
  )
}
BusinessHours.storyName = '영업시간'
