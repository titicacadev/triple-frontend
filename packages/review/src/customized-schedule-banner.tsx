import { Container, FlexBox, Text } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useExternalRouter } from '@titicaca/router'
import { useEffect } from 'react'

export default function CustomizedScheduleBanner() {
  const routeExternally = useExternalRouter()
  const { trackEvent } = useEventTrackingContext()

  useEffect(() => {
    trackEvent({
      ga: ['맞춤일정배너_노출'],
      fa: {
        action: '맞춤일정배너_노출',
      },
    })
  }, [])

  function handleClick() {
    trackEvent({
      ga: ['맞춤일정배너_선택'],
      fa: {
        action: '맞춤일정배너_선택',
      },
    })

    routeExternally({
      href: `${
        process.env.NEXT_PUBLIC_WEB_URL_BASE || 'https://triple.guide'
      }/trips/promotion/customized-schedule`,
      target: 'new',
    })
  }

  return (
    <Container
      css={{
        padding: '12.5px 16px 12.5px 20px',
        backgroundColor: '#DBE9FF',
        borderRadius: 6,
        marginTop: 20,
        marginBottom: 28,
        cursor: 'pointer',
      }}
      onClick={() => handleClick()}
    >
      <FlexBox flex justifyContent="space-between">
        <FlexBox flex flexDirection="column" justifyContent="center" gap="2px">
          <Text size={16} css={{ fontWeight: 700 }}>
            일정 알아서 다 짜드려요
          </Text>
          <Text size={12}>트리플 맞춤 일정 추천 받으러 가기</Text>
        </FlexBox>
        <img
          src="http://assets.triple-dev.titicaca-corp.com/images/img-map-with-pin.svg"
          alt=""
          width={52}
        />
      </FlexBox>
    </Container>
  )
}
