import { ComponentStoryObj, Meta } from '@storybook/react'

import { Tabs } from '.'

export default {
  title: 'Core-Elements / Tabs',
  component: Tabs,
} as Meta

export const Basic: ComponentStoryObj<typeof Tabs> = {
  name: '이 근처 장소',
  args: {
    value: 'attractions',
    options: [
      { label: '관광지', value: 'attractions' },
      { label: '맛집', value: 'restaurants' },
    ],
  },
}

export const Line: ComponentStoryObj<typeof Tabs> = {
  name: '라인 탭',
  args: {
    type: 'pointing',
    options: [
      { label: '투어티켓', value: '투어티켓' },
      { label: '호텔', value: '호텔' },
    ],
    value: '투어티켓',
    labelPadding: {
      top: 11,
      bottom: 11,
    },
  },
}

export const LineWithScroll: ComponentStoryObj<typeof Tabs> = {
  name: '라인 탭 스크롤',
  args: {
    scroll: true,
    type: 'pointing',
    options: [
      { label: '투어티켓1', value: '투어티켓' },
      { label: '호텔2', value: '호텔2' },
      { label: '투어티켓3', value: '투어티켓3' },
      { label: '호텔4', value: '호텔4' },
      { label: '투어티켓5', value: '투어티켓5' },
      { label: '호텔6', value: '호텔6' },
      { label: '투어티켓7', value: '투어티켓7' },
      { label: '호텔8', value: '호텔8' },
    ],
    value: '투어티켓',
  },
}
export const RoundedTabWithScroll: ComponentStoryObj<typeof Tabs> = {
  name: '둥근 탭 스크롤',
  args: {
    scroll: true,
    type: 'rounded',
    options: [
      { label: '김포 - 제주', value: '김포 - 제주' },
      { label: '김포 - 여수', value: '김포 - 여수' },
      { label: '김포 - 동탄', value: '김포 - 동탄' },
      { label: '김포 - 부평', value: '김포 - 부평' },
      { label: '김포 - 부산', value: '김포 - 부산' },
      { label: '김포 - 트리플', value: '김포 - 트리플' },
      { label: '김포 - 백현동', value: '김포 - 백현동' },
      { label: '김포 - 김파이브', value: '김포 - 김파이브' },
    ],
    value: '김포 - 제주',
  },
}
