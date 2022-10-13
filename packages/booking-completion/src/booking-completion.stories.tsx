import { ComponentStoryObj, Meta } from '@storybook/react'

import BookingCompletion from '.'

export default {
  title: 'booking-completion / Booking Complete',
  component: BookingCompletion,
} as Meta

export const Basic: ComponentStoryObj<typeof BookingCompletion> = {
  args: {
    descriptions: [
      '공급사 확인 후 예약이 확정됩니다.',
      '예약이 확정되면 이메일로 바우처가 발송됩니다.',
    ],
  },
}

export const Compact: ComponentStoryObj<typeof BookingCompletion> = {
  args: {
    ...Basic.args,
    compact: true,
  },
}

export const WithRegion: ComponentStoryObj<typeof BookingCompletion> = {
  args: {
    ...Basic.args,
    region: {
      id: '',
      names: { ko: '바르셀로나', en: 'Barcelona', local: null },
    },
  },
}
