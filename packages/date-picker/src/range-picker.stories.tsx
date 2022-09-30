import { RangePicker } from '@titicaca/date-picker'
import { ComponentStoryObj, Meta } from '@storybook/react'

import { newDateMockingDecorator } from '../../decorators'

export default {
  title: 'date-picker / RangePicker',
  component: RangePicker,
  decorators: [newDateMockingDecorator],
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
