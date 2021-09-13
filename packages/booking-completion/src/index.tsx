import React, { useCallback } from 'react'
import { Container, Text, Button } from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import styled from 'styled-components'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { useAppCallback } from '@titicaca/ui-flow'
import { TransitionType } from '@titicaca/modals'

interface Region {
  id: string
  names: TranslatedProperty
}

interface BookingCompletionProps {
  title?: string
  myBookingButtonTitle?: string
  compact?: boolean
  onMoveToBookingDetail: () => void
  onMoveToMain?: () => void
  onMoveToRegion?: () => void
  onAddToSchedule?: () => void
  descriptions?: string[]
  region?: Region
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

const GrayButton = styled(Button)`
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
  myBookingButtonTitle,
  compact,
  onMoveToBookingDetail,
  onMoveToMain = () => {},
  onMoveToRegion = () => {},
  onAddToSchedule,
  descriptions,
  region,
}: BookingCompletionProps) {
  const { navigate } = useHistoryFunctions()

  const handleMoveToRegion = useAppCallback(
    TransitionType.General,
    useCallback(() => {
      onMoveToRegion()
      navigate(`/regions/${region?.id}`)
    }, [navigate, onMoveToRegion, region?.id]),
  )

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
      {compact ? (
        <Button
          margin={{ top: 30 }}
          basic
          inverted
          color="blue"
          size="small"
          onClick={onMoveToBookingDetail}
          fluid
        >
          {myBookingButtonTitle || '내 예약에서 확인'}
        </Button>
      ) : (
        <>
          <Container margin={{ top: 30 }}>
            <Button.Group horizontalGap={7}>
              <Button
                basic
                inverted
                color="blue"
                size="small"
                onClick={onMoveToBookingDetail}
              >
                {myBookingButtonTitle || '내 예약에서 확인'}
              </Button>
              <Button
                basic
                inverted
                color="gray"
                size="small"
                onClick={() => {
                  onMoveToMain()
                  navigate('/main')
                }}
              >
                트리플 홈으로 가기
              </Button>
            </Button.Group>
          </Container>
          {region ? (
            <GrayButton fluid margin={{ top: 6 }} onClick={handleMoveToRegion}>
              {region.names.ko || region.names.en} 여행 준비하러 가기
            </GrayButton>
          ) : null}

          {onAddToSchedule ? (
            <GrayButton fluid margin={{ top: 6 }} onClick={onAddToSchedule}>
              내 일정에 추가하기
            </GrayButton>
          ) : null}
        </>
      )}
    </>
  )
}

export default BookingCompletion
