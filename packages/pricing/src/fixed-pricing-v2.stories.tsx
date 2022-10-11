import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import FixedPricingV2 from './fixed-pricing-v2'

export default {
  title: 'pricing / FixedPricingV2',
  component: FixedPricingV2,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
  },
} as ComponentMeta<typeof FixedPricingV2>

export const Basic: ComponentStoryObj<typeof FixedPricingV2> = {
  args: {
    loading: false,
    active: true,
    salePrice: 25000,
    label: '1박 세금포함',
    buttonText: '객실예약',
    description: '쿠폰적용시 10,000원',
    discountRate: '5%',
    maxWidth: 720,
  },
}

export const Soldout: ComponentStoryObj<typeof FixedPricingV2> = {
  args: {
    loading: false,
    active: true,
    salePrice: 25000,
    label: '1박 세금포함',
    buttonText: '객실예약',
    description: '쿠폰적용시 10,000원',
    discountRate: '5%',
    isSoldOut: true,
    buttonDisabled: true,
    maxWidth: 720,
  },
}

export const WithTooltip: ComponentStoryObj<typeof FixedPricingV2> = {
  args: {
    loading: false,
    active: true,
    salePrice: 25000,
    label: '1박 세금포함',
    buttonText: '객실예약',
    description: '쿠폰적용시 10,000원',
    tooltipLabel: '쿠폰사용시 -15,000원 더 할인!',
    discountRate: '5%',
    maxWidth: 720,
  },
}
