import type { Meta, StoryFn } from '@storybook/react'

import { NolThemeProvider } from '../nol-theme-provider'

import { ReservationInfo, type ReservationInfoProps } from './reservation-info'

const NOL_COLOR = {
  // black
  'color-neutral-b-100': 'rgba(41, 41, 45, 1)',
  'color-neutral-b-80': 'rgba(41, 41, 45, 0.8)',
  'color-neutral-b-60': 'rgba(41, 41, 45, 0.6)',
  'color-neutral-b-50': 'rgba(41, 41, 45, 0.5)',
  'color-neutral-b-15': 'rgba(41, 41, 45, 0.15)',
  'color-neutral-b-10': 'rgba(41, 41, 45, 0.1)',
  'color-neutral-b-5': 'rgba(41, 41, 45, 0.05)',

  // white
  'color-neutral-w-100': 'rgba(255, 255, 255, 1)',
  'color-neutral-w-20': 'rgba(255, 255, 255, 0.2)',

  // gray
  'color-neutral-g-80': 'rgba(84, 84, 87, 1)',
  'color-neutral-g-60': 'rgba(126, 126, 129, 1)',
  'color-neutral-g-50': 'rgba(148, 148, 150, 1)',
  'color-neutral-g-30': 'rgba(191, 191, 192, 1)',
  'color-neutral-g-15': 'rgba(223, 223, 224, 1)',
  'color-neutral-g-10': 'rgba(234, 234, 234, 1)',
  'color-neutral-g-5': 'rgba(244, 244, 245, 1)',

  // primary
  'color-primary-nol': 'rgba(65, 84, 255, 1)',

  // red
  'color-primary-red': 'rgba(255, 50, 46, 1)',
  'color-brand-shopping-red-400': 'rgba(255, 114, 98, 1)',
}

export default {
  title: 'tds-widget / chat / ReservationInfo',
  component: ReservationInfo,
  decorators: [
    (Story) => (
      <NolThemeProvider theme={NOL_COLOR}>
        <Story />
      </NolThemeProvider>
    ),
  ],
} as Meta<typeof ReservationInfo>

const BOOKING_INFO: ReservationInfoProps = {
  label: { text: '예약확정', color: 'blue' },
  title: '누사페나다 데이 크루즈&섬 투어 (발리 출발)',
  thumbnail:
    'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/42c71ad6-78bd-4f27-b777-cdb508b70ade',
  details: [
    { label: '예약확인번호', value: '5F72CD' },
    {
      label: '상품정보',
      value: '누사페나다 일일 투어(발리 출발) 아이템명아이템명아이템명',
    },
    { label: '이용예정', value: '2025.02.11(금)' },
    { label: '인원 · 수량', value: '성인 1명' },
  ],
}

export const WithDetails: StoryFn<ReservationInfoProps> = () => (
  <ReservationInfo {...BOOKING_INFO} />
)

const PRODUCT_INFO: ReservationInfoProps = {
  title:
    '누사페나다 데이 크루즈&섬 투어 (발리 출발)누사페나다 데이 크루즈&섬 투어 (발리 출발)누사페나다 데이 크루즈&섬 투어 (발리 출발)',
  thumbnail:
    'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/42c71ad6-78bd-4f27-b777-cdb508b70ade',
}

export const WithoutDetails: StoryFn<ReservationInfoProps> = () => (
  <ReservationInfo {...PRODUCT_INFO} />
)
