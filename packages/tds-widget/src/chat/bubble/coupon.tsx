import { css, styled } from 'styled-components'
import moment from 'moment'
import { formatNumber } from '@titicaca/view-utilities'
import { Text } from '@titicaca/tds-ui'

import { CouponBubbleProp } from './type'
import { nolBackgroundColor } from './nol'

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
    background-color: ${nolBackgroundColor};
  }

  &::after {
    content: '';
    position: absolute;
    top: 84px;
    left: 230px;
    transform: translateX(-100%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${nolBackgroundColor};
  }
`

const Divider = styled.div<{ valid: boolean }>`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    width: 184px;
    height: 1px;
    background-color: ${({ valid }) => (valid ? '#42599d' : '#C4C4C5')};
  }
`

const Coupon = styled.div<{ valid: boolean }>`
  padding: 17px 20px;
  border-radius: 12px;
  background-color: ${({ valid }) => (valid ? '#324b94' : '#BFBFC0')};
  width: 224px;
  height: 132px;
  text-align: left;
  color: white;
`

function Arrow() {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 4.97649L1 9"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const DownloadButton = styled(Text)<{ valid: boolean }>`
  color: white;
  font-size: 12px;
  font-weight: 700;
  float: right;
  margin-top: 27px;
  display: inline-block;
  ${({ valid }) =>
    valid &&
    css`
      cursor: pointer;
    `};

  > svg {
    margin-top: -2px;
    width: 16px;
    height: 16px;
    padding: 3px;
  }
`

export function CouponBubble({ coupon, onDownloadClick }: CouponBubbleProp) {
  const valid = moment(coupon.period.endAt).isAfter(moment())
  return (
    <CouponContainer>
      <Circle />
      <Divider valid={valid} />
      <Coupon valid={valid}>
        <Text
          css={{
            color: valid ? '#ABB5D3' : '#E5E5E5',
            fontSize: '12px',
            fontWeight: 400,
          }}
        >
          {moment(coupon.period.endAt).subtract(1, 'day').format('YY.M.D')} 까지
          사용
        </Text>
        <Text css={{ color: 'white', fontSize: '38px', fontWeight: 700 }}>
          {formatNumber(coupon.discount.value)}
          <span css={{ color: 'white', fontSize: '14px', marginLeft: '3px' }}>
            원
          </span>
        </Text>
        <DownloadButton
          valid={valid}
          onClick={() => valid && onDownloadClick?.(coupon)}
        >
          {valid ? '쿠폰 받고 사용하러 가기' : '기한 만료'}
          {valid && <Arrow />}
        </DownloadButton>
      </Coupon>
    </CouponContainer>
  )
}
