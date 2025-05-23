import { styled } from 'styled-components'
import moment from 'moment'
import { formatNumber } from '@titicaca/view-utilities'
import { Text } from '@titicaca/tds-ui'

import { CouponBubbleProp } from './type'

const CouponContainer = styled.div`
  display: inline-block;
  border-radius: 20px;
  background-color: #324b94;
  padding: 20px;
  width: 224px;
  height: 132px;
  text-align: left;
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CouponBubble({ id, my, coupon, ...props }: CouponBubbleProp) {
  return (
    <CouponContainer>
      <Text css={{ color: 'white;', fontSize: '12px', fontWeight: 400 }}>
        {moment(coupon.period.endAt).format('YY.M.D')} 까지 사용
      </Text>
      <Text css={{ color: 'white;', fontSize: '38px', fontWeight: 700 }}>
        {formatNumber(coupon.discount.value)}
        <span css={{ fontSize: '14px', marginLeft: '3px' }}>원</span>
      </Text>
      <Text
        css={{
          color: 'white;',
          fontSize: '12px',
          fontWeight: 700,
          float: 'right',
          marginTop: '24px',
        }}
      >
        쿠폰 받고 사용하러 가기
      </Text>
    </CouponContainer>
  )
}
