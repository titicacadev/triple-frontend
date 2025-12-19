import { styled } from 'styled-components'
import { format, isAfter, subMinutes } from 'date-fns'
import { formatNumber } from '@titicaca/view-utilities'
import { Button, Text } from '@titicaca/tds-ui'

import { CouponBubbleProp } from '../type'
import { ButtonBubble } from '../button'

const CouponContainer = styled.div<{ valid: boolean }>`
  display: inline-flex;
  border-radius: 14px;
  border: 1px solid ${({ valid }) => (valid ? '#B2BAFF' : '#E1E2E7')};
  overflow: hidden;
`

const Coupon = styled.div<{ valid: boolean }>`
  padding: 15px;
  width: 213px;
  text-align: left;
  display: inline-block;
  color: ${({ valid }) => (valid ? '#1B1C1F' : '#B6B7BB')};
  background-color: ${({ valid }) => (valid ? 'white' : '#FEFEFF')};
`

const DOWNLOAD_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2.5V11.25" stroke="#1B1C1F" stroke-width="1.625" stroke-linecap="round"/>
<path d="M5.625 8.75L9.73483 12.8598C9.88128 13.0063 10.1187 13.0063 10.2652 12.8598L14.375 8.75" stroke="#1B1C1F" stroke-width="1.625" stroke-linecap="round"/>
<path d="M4.375 16.75H15.625" stroke="#1B1C1F" stroke-width="1.625" stroke-linecap="round"/>
</svg>
`

const getSVG = (svg: string) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const DownloadButton = styled(Button)`
  padding: 0;
  border-radius: 0;
  border-left: 1px solid #ecedf7;
  background:
    no-repeat center url(${getSVG(DOWNLOAD_ICON)}),
    #f7f7ff;
  width: 39px;
  display: inline-block;

  &:disabled {
    background-color: #f7f8fb;
  }
`

const Badge = styled.div<{ valid: boolean }>`
  margin-bottom: 2px;
  padding: 0 6px;
  width: fit-content;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  line-height: 22px;
  color: ${({ valid, theme }) => (valid ? theme.nol.colorPrimaryNol : 'white')};
  background-color: ${({ valid }) =>
    valid ? '#F5F6FF' : 'rgba(0, 0, 0, 0.2)'};
`

export function NolCouponContentBubble({ coupon, onClick }: CouponBubbleProp) {
  const valid = isAfter(new Date(coupon.period.endAt), new Date())
  return (
    <CouponContainer valid={valid}>
      <Coupon valid={valid}>
        <Badge valid={valid}>쉿! 🤫 고객님께만 드려요!</Badge>
        <Text
          css={{
            color: 'inherit',
            fontSize: '30px',
            fontWeight: 700,
            lineHeight: '38px',
            marginBottom: '6px',
          }}
        >
          {formatNumber(coupon.discount.value)}원
        </Text>
        <Text
          css={{
            color: 'inherit',
            fontSize: '12px',
            fontWeight: 700,
            lineHeight: '14px',
            marginBottom: '2px',
          }}
        >
          중복사용가능
        </Text>
        <Text
          css={{
            color: 'inherit',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '14px',
            marginBottom: '2px',
          }}
        >
          {valid
            ? `${format(
                subMinutes(new Date(coupon.period.endAt), 1),
                'yyyy.MM.dd(HH:mm)',
              )}까지 사용`
            : '쿠폰 사용 기간 만료'}
        </Text>
        <Text
          css={{
            color: 'inherit',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '14px',
          }}
          maxLines={1}
        >
          {coupon.propertyName}
        </Text>
      </Coupon>
      <DownloadButton
        disabled={!valid}
        onClick={() => valid && onClick?.(coupon, 'download')}
      />
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
