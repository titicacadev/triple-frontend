import { ComponentStoryObj } from '@storybook/react'

import FixedPricingV2 from './fixed-pricing-v2'

export default {
  title: 'pricing / FixedPricingV2',
  component: FixedPricingV2,
}

export const Basic: ComponentStoryObj<typeof FixedPricingV2> = {
  args: {
    loading: true,
    active: true,
    salePrice: 25000,
    priceLabelOverride: '메세지',
    label: '1박 세금포함',
    buttonText: '객실예약',
    buttonDisabled: false,
    description: '쿠폰적용시 10,000원',
    discountRate: '5%',
    tooltipLabel: '쿠폰사용시 -15,000원 더 할인!',
    isSoldOut: false,
    maxWidth: 720,
  },
}
