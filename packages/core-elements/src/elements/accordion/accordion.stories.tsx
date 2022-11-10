/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentMeta, ComponentStoryFn } from '@storybook/react'

import { Text } from '../text'

import { Accordion } from './accordion'

export default {
  title: 'Core-Elements / Accordion',
  component: Accordion,
  subcomponents: {
    'Accordion.Title': Accordion.Title,
    'Accordion.Folded': Accordion.Folded,
    'Accordion.Content': Accordion.Content,
  },
} as ComponentMeta<typeof Accordion>

export const BusinessHours: ComponentStoryFn<typeof Accordion> = (args) => {
  return (
    <Accordion {...args}>
      <Accordion.Title>
        <Text bold>이용가능시간, 휴무일</Text>
      </Accordion.Title>
      <Accordion.Folded>
        <Text bold color="blue">
          오늘 09:00 - 18:00
        </Text>
      </Accordion.Folded>
      <Accordion.Content>
        <Text>
          월<br />화<br />수<br />목<br />금<br />토<br />일
        </Text>
      </Accordion.Content>
    </Accordion>
  )
}
BusinessHours.storyName = '영업시간'
