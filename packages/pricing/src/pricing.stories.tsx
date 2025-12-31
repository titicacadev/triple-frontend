import type { Meta, StoryObj } from '@storybook/react'

import Pricing from './pricing'

export default {
  title: 'pricing / Pricing',
  component: Pricing,
} as Meta<typeof Pricing>

export const Basic: StoryObj<typeof Pricing> = {
  args: {
    basePrice: 30000,
    salePrice: 25000,
    isSoldOut: false,
  },
}

export const Rich: StoryObj<typeof Pricing> = {
  args: {
    rich: true,
    basePrice: 30000,
    basePriceUnit: '원',
    pricingNote: '1박, 세금포함',
    salePrice: 25000,
    label: '트리플가',
    hideDiscountRate: false,
    isSoldOut: false,
    description: '쿠폰적용시 10,000원',
  },
}

export const Fixed: StoryObj<typeof Pricing> = {
  args: {
    fixed: true,
    active: true,
    salePrice: 25000,
    priceLabelOverride: '25,000원',
    label: '1박 세금포함',
    buttonText: '객실예약',
    buttonDisabled: false,
    description: '쿠폰적용시 10,000원',
    discountRate: '5%',
    tooltipLabel: '쿠폰사용시 -15,000원 더 할인!',
    onTooltipClick: () => {},
    isSoldOut: false,
    maxWidth: 720,
  },
}
