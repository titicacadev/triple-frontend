import { DayPicker } from '@titicaca/date-picker'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'date-picker / DayPicker',
  component: DayPicker,
} as Meta

export const Basic: ComponentStoryObj<typeof DayPicker> = {
  storyName: '단일 날자 선택 컴포넌트',
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
