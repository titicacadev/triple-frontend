import type { Meta, StoryObj } from '@storybook/react'
import MockDate from 'mockdate'

import { PickerFrameV2, RangePickerV2 } from './range-picker-v2'

export default {
  title: 'date-picker / RangePickerV2',
  component: RangePickerV2,
  decorators: [
    (Story) => {
      MockDate.set('1/1/2022')
      return Story()
    },
  ],
} as Meta

export const Basic: StoryObj<typeof RangePickerV2> = {
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
    <PickerFrameV2
      height="300px"
      sideSpacing={10}
      monthPadding="30px"
      hideTodayLabel={false}
    >
      <Story />
    </PickerFrameV2>
  ),
]
