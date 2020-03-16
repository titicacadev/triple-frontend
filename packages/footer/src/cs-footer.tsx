import * as React from 'react'
import qs from 'qs'
import styled from 'styled-components'
import { Button, Container, Text } from '@titicaca/core-elements'
import { useHistoryContext } from '@titicaca/react-contexts'

const SupportContainer = styled(Container)`
  background-color: #f5f5f5;
  height: 311px;
`

type SERVICE_TYPE = 'AIR' | 'TNA' | 'HOTEL'

const SUPPORT_TYPES_BY_SERVICE: {
  [key in SERVICE_TYPE]: string
} = {
  TNA: 'tna',
  HOTEL: 'hotel',
  AIR: 'airline',
}

export default function CSFooter({
  serviceType,
  csTime,
  csMessage,
  appUrlScheme,
  showCSButton = true,
  onFAQButtonClick = () => {},
  onCSButtonClick = () => {},
}: {
  serviceType: SERVICE_TYPE
  csTime: string
  csMessage: string
  appUrlScheme: string
  showCSButton: boolean
  onFAQButtonClick?: () => void
  onCSButtonClick?: () => void
}) {
  const { navigate } = useHistoryContext()
  const supportType = SUPPORT_TYPES_BY_SERVICE[serviceType]

  const movetoFAQ = () => {
    onFAQButtonClick()

    navigate(
      `${appUrlScheme}:///outlink?${qs.stringify({
        url: 'https://triple.oc.toast.com/triple/hc/mobile/article/',
        target: 'browser',
      })}`,
    )
  }

  const moveToCsInquiry = React.useCallback(async () => {
    onCSButtonClick()

    const response = await fetch('/api/users/me', {
      credentials: 'same-origin',
    })

    if (response.ok) {
      const { uid } = await response.json()

      navigate(
        `${appUrlScheme}:///inlink?path=${encodeURIComponent(
          `/cs-bridge/outlink?service=${supportType}&type=${supportType}&data=${encodeURIComponent(
            `user_id=${uid}`,
          )}`,
        )}`,
      )
    }
  }, [appUrlScheme, navigate, onCSButtonClick, supportType])

  return (
    <SupportContainer padding={{ top: 32, left: 30, right: 30 }}>
      <Container>
        <Text bold color="gray" size="huge">
          도움이 필요하신가요?
        </Text>
        <Text
          bold
          color="blue"
          size="huge"
          margin={{ bottom: 20 }}
          onClick={() => {
            window.location.href = 'tel:1588-2539'
          }}
        >
          1588-2539
        </Text>
        <Text
          size="small"
          color="gray"
          bold
          lineHeight={1.69}
          alpha={0.8}
          margin={{ bottom: 3 }}
        >
          해외에서 +82-2-1588-2539
          <br />
          {csTime}
        </Text>

        <Text lineHeight={1.54} color="gray" alpha={0.4} size="tiny">
          {csMessage}
        </Text>

        {showCSButton ? (
          <Button.Group margin={{ top: 20 }} horizontalGap={7}>
            <Button basic color="gray" onClick={movetoFAQ}>
              자주 묻는 질문
            </Button>
            <Button basic color="gray" onClick={moveToCsInquiry}>
              1:1 문의
            </Button>
          </Button.Group>
        ) : (
          <Button
            fluid
            margin={{ top: 20 }}
            basic
            color="gray"
            onClick={movetoFAQ}
          >
            자주 묻는 질문
          </Button>
        )}
      </Container>
    </SupportContainer>
  )
}
