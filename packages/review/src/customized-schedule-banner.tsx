import { Container, FlexBox, Text } from '@titicaca/core-elements'
import { useExternalRouter } from '@titicaca/router'

export default function CustomizedScheduleBanner() {
  const routeExternally = useExternalRouter()

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
      onClick={() => {
        routeExternally({
          href: `${
            process.env.NEXT_PUBLIC_WEB_URL_BASE || 'https://triple.guide'
          }/trips/promotion/customized-schedule`,
          target: 'new',
        })
      }}
    >
      <FlexBox flex justifyContent="space-between">
        <FlexBox flex flexDirection="column" justifyContent="center" gap="2px">
          <Text size={16} css={{ fontWeight: 700 }}>
            여행일정 알아서 다 짜드려요
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
