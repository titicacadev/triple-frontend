import type { Meta, StoryObj } from '@storybook/react'

import DayPicker from './day-picker'

export default {
  title: 'date-picker / DayPicker',
  component: DayPicker,
  parameters: {
    date: new Date('1/1/2022'),
  },
} as Meta

export const Basic: StoryObj<typeof DayPicker> = {
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
