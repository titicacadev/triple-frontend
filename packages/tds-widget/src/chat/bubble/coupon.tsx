import { styled } from 'styled-components'
import moment from 'moment'
import { formatNumber } from '@titicaca/view-utilities'
import { Text } from '@titicaca/tds-ui'

import { CouponBubbleProp } from './type'

const CouponContainer = styled.div`
  display: inline-block;
  background-color: inherit;
`

const Circle = styled.div`
  position: relative;
  background-color: inherit;

  &::before {
    content: '';
    position: absolute;
    top: 84px;
    left: -6px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    top: 84px;
    left: 230px;
    transform: translate(-100%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: inherit;
  }
`

const Coupon = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: #324b94;
  width: 224px;
  height: 132px;
  text-align: left;
  color: white;
`

export function CouponBubble({ coupon, onDownloadClick }: CouponBubbleProp) {
  return (
    <CouponContainer>
      <Circle />
      <Coupon>
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
            cursor: 'pointer',
          }}
          onClick={() => onDownloadClick?.(coupon)}
        >
          쿠폰 받고 사용하러 가기
        </Text>
      </Coupon>
    </CouponContainer>
  )
}
