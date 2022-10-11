import Pricing from '@titicaca/pricing'
import { Container } from '@titicaca/core-elements'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import ExtendedResourceListElement from './extended-resource-list-element'

export default {
  title: 'resource-list-element / extended-resource-list-element',
  component: ExtendedResourceListElement,
} as ComponentMeta<typeof ExtendedResourceListElement>

export const Basic: ComponentStoryObj<typeof ExtendedResourceListElement> = {
  args: {
    name: '카멜리아 힐 입장권',
    comment: '500여 품종 동백나무로 사계절 내내 아름다운 포토 스팟 수목원',
    reviewsCount: 5,
    reviewsRating: 3,
    hideScrapButton: true,
    partnerName: '브이패스',
    areaName: '서울특별시',
    children: (
      <Container
        css={{
          margin: '18px 0 0',
        }}
      >
        <Pricing basePrice={30000} basePriceUnit="원" salePrice={25000} rich />
      </Container>
    ),
  },
}
