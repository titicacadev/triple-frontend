import ExtendedResourceListElement from '@titicaca/resource-list-element'
import Pricing from '@titicaca/pricing'
import { Container } from '@titicaca/core-elements'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'resource-list-element / extended-resource-list-element',
  component: ExtendedResourceListElement,
} as Meta

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
      <Container margin={{ top: 18 }}>
        <Pricing basePrice={30000} basePriceUnit="원" salePrice={25000} rich />
      </Container>
    ),
  },
}
