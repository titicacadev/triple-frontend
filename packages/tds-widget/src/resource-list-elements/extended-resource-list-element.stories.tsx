import type { Meta, StoryFn } from '@storybook/react'
import { Container } from '@titicaca/tds-ui'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { Pricing } from '../pricing'
import { ScrapButtonMask } from '../scrap-button'
import { ScrapsProvider } from '../scrap/provider'

import { ExtendedResourceListElement } from './extended-resource-list-element'

const meta: Meta<typeof ExtendedResourceListElement> = {
  title: 'tds-widget / resource-list-element / extended-resource-list-element',
  component: ExtendedResourceListElement,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <ScrapsProvider>
          <Story />
        </ScrapsProvider>
      </EventTrackingProvider>
    ),
  ],
}

const defaultArgs = {
  scrapResource: {
    id: 'scrapable_id',
    type: 'scrapable_type',
  },
  name: '카멜리아 힐 입장권',
  comment: '500여 품종 동백나무로 사계절 내내 아름다운 포토 스팟 수목원',
  note: '현장에서 입장권 확인이 필요합니다.',
  reviewsCount: 5,
  reviewsRating: 3,
  scrapsCount: 2,
  partnerName: '브이패스',
  areaName: '서울특별시',
}

export default meta

const Template: StoryFn<typeof ExtendedResourceListElement> = (args) => {
  return (
    <ExtendedResourceListElement {...args}>
      <Container
        css={{
          margin: '18px 0 0',
        }}
      >
        <Pricing basePrice={30000} basePriceUnit="원" salePrice={25000} rich />
      </Container>
    </ExtendedResourceListElement>
  )
}

export const Basic = {
  render: Template,
  args: {
    ...defaultArgs,
  },
}

export const NoScrap = {
  render: Template,
  decorators: [
    (Story: StoryFn) => (
      <ScrapButtonMask masked>
        <Story />
      </ScrapButtonMask>
    ),
  ],
  args: {
    ...defaultArgs,
  },
}

export const Tags = {
  render: Template,
  args: {
    ...defaultArgs,
    tags: [
      { color: 'blue', emphasized: true, text: 'blue' },
      { color: 'blue', emphasized: false, text: 'blue' },
      { color: 'red', emphasized: true, text: 'red' },
      { color: 'purple', emphasized: true, text: 'purple' },
      { color: 'purple', emphasized: false, text: 'purple' },
      { color: 'gray', emphasized: true, text: 'gray' },
      { color: 'gray', emphasized: false, text: 'gray' },
      { color: 'green', emphasized: true, text: 'green' },
      { color: 'green', emphasized: false, text: 'green' },
      { color: 'white', emphasized: true, text: 'white' },
      { color: 'white', emphasized: false, text: 'white' },
      { color: 'orange', emphasized: true, text: 'orange' },
      { color: 'orange', emphasized: false, text: 'orange' },
      { color: 'skyblue', emphasized: true, text: 'skyblue' },
      { color: 'skyblue', emphasized: false, text: 'skyblue' },
      { color: 'lightpurple', emphasized: true, text: 'lightpurple' },
      { color: 'lightpurple', emphasized: false, text: 'lightpurple' },
    ],
  },
}

export const Advertisement = {
  render: Template,
  args: {
    ...defaultArgs,
    isAdvertisement: true,
  },
}

export const Badge = {
  render: Template,

  args: {
    ...defaultArgs,
    badge: {
      icon: 'https://assets.triple.guide/images/seoulcon/default/ic_spot.svg',
      text: '즉시확정',
    },
  },
}
