import type { Meta, StoryObj } from '@storybook/react'

import FixedPricingV2 from './fixed-pricing-v2'

export default {
  title: 'pricing / FixedPricingV2',
  component: FixedPricingV2,
  parameters: {
    story: {
      inline: false,
      iframeHeight: 300,
    },
  },
} as Meta<typeof FixedPricingV2>

export const Basic: StoryObj<typeof FixedPricingV2> = {
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

export const Loading: StoryObj<typeof FixedPricingV2> = {
  args: {
    ...Basic.args,
    loading: true,
  },
}

export const Soldout: StoryObj<typeof FixedPricingV2> = {
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

export const WithTooltip: StoryObj<typeof FixedPricingV2> = {
  args: {
    loading: false,
    active: true,
    salePrice: 25000,
    label: '1박 세금포함',
    buttonText: '객실예약',
    description: '쿠폰적용시 10,000원',
    tooltipLabel: '쿠폰사용시 -15,000원 더 할인!',
    onTooltipClick: () => {},
    discountRate: '5%',
    maxWidth: 720,
  },
}
