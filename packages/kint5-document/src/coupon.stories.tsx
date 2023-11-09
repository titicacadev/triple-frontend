import type { Meta } from '@storybook/react'
import { rest } from 'msw'

import ELEMENTS from './elements'
import { DeepLinkProvider } from './prop-context/deep-link'

const { coupon: Coupon } = ELEMENTS

export default { title: 'kint5-document / coupon' } as Meta

const value = {
  identifier: 'TEST_IDENTIFIER',
  description:
    '쿠폰은 최초 1회만 지급되며, 이미 쿠폰을 받았다면  ‘쿠폰함’에서 확인 할 수 있습니다.',
  enabledAt: '2023-07-03',
}

export function CouponExample() {
  return (
    <DeepLinkProvider value="https://triple-dev.onelink.me">
      <Coupon value={value} />
    </DeepLinkProvider>
  )
}
CouponExample.storyName = '기본'

CouponExample.parameters = {
  msw: {
    handlers: [
      rest.get('/api/benefit/coupons/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            downloaded: true,
          }),
        )
      }),
      rest.get('/api/users/smscert', (req, res, ctx) => {
        return res(
          ctx.json({
            verified: true,
          }),
        )
      }),
    ],
  },
}
