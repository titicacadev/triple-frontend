import { styled } from 'styled-components'
import { format, isAfter, subDays } from 'date-fns'
import { formatNumber } from '@titicaca/view-utilities'
import { Button, Text } from '@titicaca/tds-ui'

import { CouponBubbleProp } from '../type'
import { ButtonBubble } from '../button'

import { nolBackgroundColor } from './index'

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
    top: 88px;
    left: -7px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${nolBackgroundColor};
  }

  &::after {
    content: '';
    position: absolute;
    top: 88px;
    left: 235px;
    transform: translateX(-100%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${nolBackgroundColor};
  }
`

const Divider = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 96px;
    left: 50%;
    transform: translateX(-50%);
    width: 188px;
    height: 1px;
    background-color: ${({ theme }) => theme.nol.colorNeutralW8};
  }
`

const Coupon = styled.div<{ valid: boolean }>`
  padding: 16px 20px;
  border-radius: 12px;
  background-color: ${({ valid, theme }) =>
    valid ? theme.nol.colorPrimaryDarkblue : '#B6B7BB'};
  width: 228px;
  height: 140px;
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

const DownloadButton = styled(Button)`
  color: white;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  float: right;
  margin-top: 20px;
  padding: 0;
  display: inline-block;
  border: none;
  background-color: transparent;

  > svg {
    margin-top: -2px;
    width: 16px;
    height: 16px;
    padding: 3px;
  }
`

export function NolCouponContentBubble({ coupon, onClick }: CouponBubbleProp) {
  const valid = isAfter(new Date(coupon.period.endAt), new Date())
  return (
    <CouponContainer>
      <Circle />
      <Divider />
      <Coupon valid={valid}>
        <Text
          css={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          {format(subDays(new Date(coupon.period.endAt), 1), 'yy.MM.dd')}
          까지 사용가능
        </Text>
        <Text
          css={{
            color: 'white',
            fontSize: '38px',
            fontWeight: 700,
            lineHeight: '44px',
            height: '44px',
          }}
        >
          {formatNumber(coupon.discount.value)}
          <span css={{ color: 'white', fontSize: '14px', marginLeft: '3px' }}>
            원
          </span>
        </Text>
        <DownloadButton
          disabled={!valid}
          onClick={() => valid && onClick?.(coupon, 'download')}
        >
          {valid ? '쿠폰 받기' : '기한 만료'}
          {valid && <Arrow />}
        </DownloadButton>
      </Coupon>
    </CouponContainer>
  )
}

export function NolCouponButtonBubble({
  id,
  my,
  coupon,
  onClick,
  ...props
}: CouponBubbleProp) {
  const valid = isAfter(new Date(coupon.period.endAt), new Date())
  return (
    <ButtonBubble
      id={id}
      my={my}
      label="쿠폰 바로 사용하기"
      action={{ type: 'button' }}
      onButtonClick={() => valid && onClick?.(coupon, 'product')}
      disabled={!valid}
      hasArrow={false}
      {...props}
    />
  )
}
