import { ComponentStoryObj, Meta } from '@storybook/react'
import MockDate from 'mockdate'

import { RangePickerV2, PickerFrame } from './range-picker-v2'

export default {
  title: 'date-picker / RangePickerV2',
  component: RangePickerV2,
  decorators: [
    (Story) => {
      MockDate.set('1/1/2022')
      return <Story />
    },
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof RangePickerV2> = {
  name: '날짜 구간 선택 컴포넌트 V2',
  args: {
    startDate: new Date().toDateString(),
    endDate: new Date(new Date().getTime() + 86400000 * 5).toDateString(),
    startDateLabel: '체크인',
    endDateLabel: '체크아웃',
    sameDateLabel: '당일',
    numberOfMonths: 3,
    height: '300px',
    enableSameDay: false,
    hideTodayLabel: false,
  },
}

Basic.decorators = [
  (Story) => (
    <PickerFrame
      height="300px"
      sideSpacing={10}
      monthPadding="30px"
      hideTodayLabel={false}
    >
      <Story />
    </PickerFrame>
  ),
]
