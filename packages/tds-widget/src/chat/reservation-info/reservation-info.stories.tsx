import type { Meta, StoryFn } from '@storybook/react'

import { ReservationInfo, type ReservationInfoProps } from './reservation-info'
import { ReservationInfoThemeProvider } from './theme-provider'

export default {
  title: 'tds-widget / chat / ReservationInfo',
  component: ReservationInfo,
  decorators: [
    (Story) => (
      <ReservationInfoThemeProvider>
        <Story />
      </ReservationInfoThemeProvider>
    ),
  ],
} as Meta<typeof ReservationInfo>

const BOOKING_INFO: ReservationInfoProps = {
  label: { text: '예약확정', color: 'blue' },
  title: '누사페나다 데이 크루즈&섬 투어 (발리 출발)',
  thumbnail:
    'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/42c71ad6-78bd-4f27-b777-cdb508b70ade',
  details: [
    { label: '예약번호', value: '5F72CD' },
    {
      label: '상품정보',
      value: '누사페나다 일일 투어(발리 출발) 아이템명아이템명아이템명',
    },
    { label: '이용예정', value: '2025.02.11(금)' },
    { label: '옵션정보', value: '성인 1명' },
  ],
}

export const WithDetails: StoryFn<ReservationInfoProps> = () => (
  <ReservationInfo {...BOOKING_INFO} />
)

const PRODUCT_INFO: ReservationInfoProps = {
  title: '누사페나다 데이 크루즈&섬 투어 (발리 출발)',
  thumbnail:
    'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/42c71ad6-78bd-4f27-b777-cdb508b70ade',
}

export const WithoutDetails: StoryFn<ReservationInfoProps> = () => (
  <ReservationInfo {...PRODUCT_INFO} />
)
