import * as React from 'react'
import qs from 'qs'
import styled from 'styled-components'
import { Button, Container, Text } from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'

const SupportContainer = styled.footer`
  background-color: #f5f5f5;
  height: 311px;
  padding: 32px 30px 0 30px;
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
  overrideFAQButtonClick,
  overrideCSuttonClick,
}: {
  serviceType: SERVICE_TYPE
  csTime: string
  csMessage: string
  appUrlScheme: string
  showCSButton: boolean
  onFAQButtonClick?: () => void
  onCSButtonClick?: () => void
  overrideFAQButtonClick?: () => void
  overrideCSuttonClick?: () => void
}) {
  const { navigate } = useHistoryFunctions()
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
    <SupportContainer>
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
        <Button.Group
          margin={{ top: 20 }}
          horizontalGap={7}
          buttonCount={showCSButton ? 2 : 1}
        >
          <Button
            basic
            color="gray"
            onClick={overrideFAQButtonClick || movetoFAQ}
          >
            자주 묻는 질문
          </Button>
          {showCSButton ? (
            <Button
              basic
              color="gray"
              onClick={overrideCSuttonClick || moveToCsInquiry}
            >
              1:1 문의
            </Button>
          ) : null}
        </Button.Group>
      </Container>
    </SupportContainer>
  )
}
