import { ComponentStoryObj, Meta } from '@storybook/react'
import MockDate from 'mockdate'

import RangePicker from './range-picker'

export default {
  title: 'date-picker / RangePicker',
  component: RangePicker,
  decorators: [
    (Story) => {
      MockDate.set('1/1/2022')
      return <Story />
    },
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof RangePicker> = {
  name: '날짜 구간 선택 컴포넌트',
  args: {
    startDate: null,
    endDate: null,
    startDateLabel: '출국일',
    endDateLabel: '귀국일',
    sameDateLabel: '당일 왕복',
    numberOfMonths: 3,
    height: '300px',
    enableSameDay: false,
    hideTodayLabel: true,
  },
}
