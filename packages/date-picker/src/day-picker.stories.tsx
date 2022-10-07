import { ComponentStoryObj, Meta } from '@storybook/react'
import MockDate from 'mockdate'

import DayPicker from './day-picker'

export default {
  title: 'date-picker / DayPicker',
  component: DayPicker,
  decorators: [
    (Story) => {
      MockDate.set('1/1/2022')
      return <Story />
    },
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof DayPicker> = {
  name: '단일 날짜 선택 컴포넌트',
  args: {
    day: null,
    hideTodayLabel: true,
    canChangeMonth: false,
    height: '300px',
    numberOfMonths: 3,
    fromMonth: new Date().toDateString(),
    toMonth: new Date().toDateString(),
  },
}
