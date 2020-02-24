import React from 'react'
import { Container, Text, Button } from '@titicaca/core-elements'
import styled from 'styled-components'

interface BookingCompletionProps {
  title?: string
  onMoveToBookingDetail?: () => void
  onMoveToList?: () => void
  listButtonLabel?: string
  descriptions?: string[]
  regionButtonLabel?: string
  onMoveToRegion?: () => void
}

const DescriptionText = styled(Text)`
  &::before {
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    background-image: url(https://assets.triple.guide/images/img-bullet-check-b@3x.png);
    background-size: 10px;
    background-repeat: no-repeat;
    margin-right: 5px;
  }
`

const RegionButton = styled(Button)`
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #3a3a3a;
  font-weight: bold;
  font-size: 14px;
  height: 45px;
  line-height: normal;
`

function BookingCompletion({
  title,
  onMoveToBookingDetail,
  onMoveToList,
  listButtonLabel,
  descriptions,
  regionButtonLabel,
  onMoveToRegion,
}: BookingCompletionProps) {
  return (
    <>
      <Container margin={{ bottom: 12 }}>
        <Text size={28} bold>
          {title || `예약이 \n 접수되었습니다.`}
        </Text>
      </Container>
      {(descriptions || []).map((description, idx) => (
        <DescriptionText
          key={idx}
          size="small"
          color="blue"
          bold
          margin={{ bottom: 8 }}
        >
          {description}
        </DescriptionText>
      ))}
      <Text color="gray" size="mini" alpha={0.5}>
        자세한 사항은 내 예약에서 확인해주세요.
      </Text>
      {onMoveToList || onMoveToBookingDetail ? (
        <Container margin={{ top: 30 }}>
          <Button.Group horizontalGap={7}>
            {onMoveToBookingDetail ? (
              <Button
                basic
                inverted
                color="blue"
                size="small"
                onClick={onMoveToBookingDetail}
              >
                내 예약에서 확인
              </Button>
            ) : null}
            {onMoveToList ? (
              <Button
                basic
                inverted
                color="gray"
                size="small"
                onClick={onMoveToList}
              >
                {listButtonLabel || '메인으로 가기'}
              </Button>
            ) : null}
          </Button.Group>
        </Container>
      ) : null}
      {onMoveToRegion ? (
        <RegionButton fluid margin={{ top: 6 }} onClick={onMoveToRegion}>
          {regionButtonLabel}
        </RegionButton>
      ) : null}
    </>
  )
}

export default BookingCompletion
