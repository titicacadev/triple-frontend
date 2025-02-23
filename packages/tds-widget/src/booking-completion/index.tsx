import { useCallback } from 'react'
import { Container, Text, Button, ButtonGroup } from '@titicaca/tds-ui'
import { styled } from 'styled-components'
import { TranslatedProperty } from '@titicaca/type-definitions'
import { useClientAppCallback, useTranslation } from '@titicaca/triple-web'
import { useNavigate } from '@titicaca/router'

interface Region {
  id: string
  names: TranslatedProperty
}

interface BookingCompletionProps {
  /**
   * 최상단에 보여지는 제목입니다.
   */
  title?: string
  myBookingButtonTitle?: string
  compact?: boolean
  /**
   * `내 예약에서 확인` 버튼을 눌렀을 때 발생하는 이벤트입니다.
   */
  onMoveToBookingDetail: () => void
  onMoveToMain?: () => void
  onMoveToRegion?: () => void
  onAddToSchedule?: () => void
  /**
   * 해당 예약에 대한 설명 문구입니다. 없을 경우 표시되지 않습니다.
   */
  descriptions?: string[]
  /**
   * 해당 예약에 대한 region 정보 있습니다. region 정보가 존재할 경우, 추가로 버튼이 표시되며, 해당 버튼을 클릭시 도시메인으로 이동합니다.
   *
   * `names.ko를` 우선으로 표시하며, 없을 경우 `names.en` 정보를 노출합니다.
   */
  region?: Region
}

const DescriptionText = styled(Text)`
  &::before {
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    background-image: url('https://assets.triple.guide/images/img-bullet-check-b@3x.png');
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

/**
 * 항공/호텔/TNA에서 예약이 최종적으로 완료 되었을 때 보여주는 페이지입니다.
 */
export function BookingCompletion({
  title,
  myBookingButtonTitle,
  compact = false,
  onMoveToBookingDetail,
  onMoveToMain,
  onMoveToRegion,
  onAddToSchedule,
  descriptions,
  region,
}: BookingCompletionProps) {
  const t = useTranslation()

  const regionName = region?.names.ko || region?.names.en
  const { navigate } = useNavigate()

  const handleMoveToRegion = useClientAppCallback(
    useCallback(() => {
      onMoveToRegion?.()
      navigate(`/regions/${region?.id}`)
    }, [navigate, onMoveToRegion, region?.id]),
  )

  return (
    <>
      <Container
        css={{
          margin: '0 0 12px',
        }}
      >
        <Text size={28} bold>
          {title || t('예약이 접수되었습니다.')}
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
        {t('자세한 사항은 내 예약에서 확인해주세요.')}
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
          {myBookingButtonTitle || t('내 예약에서 확인')}
        </Button>
      ) : (
        <>
          <Container
            css={{
              margin: '30px 0 0',
            }}
          >
            <ButtonGroup horizontalGap={7}>
              <Button
                basic
                inverted
                color="blue"
                size="small"
                onClick={onMoveToBookingDetail}
              >
                {myBookingButtonTitle || t('내 예약에서 확인')}
              </Button>
              <Button
                basic
                inverted
                color="gray"
                size="small"
                onClick={() => {
                  onMoveToMain?.()
                  navigate('/main')
                }}
              >
                {t('트리플 홈으로 가기')}
              </Button>
            </ButtonGroup>
          </Container>
          {regionName ? (
            <GrayButton fluid margin={{ top: 6 }} onClick={handleMoveToRegion}>
              {t('{{regionName}} 여행 준비하러 가기', { regionName })}
            </GrayButton>
          ) : null}

          {onAddToSchedule ? (
            <GrayButton fluid margin={{ top: 6 }} onClick={onAddToSchedule}>
              {t('내 일정에 추가하기')}
            </GrayButton>
          ) : null}
        </>
      )}
    </>
  )
}
