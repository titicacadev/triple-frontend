import { Container, Button } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useSessionControllers,
} from '@titicaca/react-contexts'

export function AuthButton() {
  const { logout } = useSessionControllers()
  const { trackEvent } = useEventTrackingContext()

  return (
    <Container css={{ margin: '0 20px' }}>
      <Button
        basic
        fluid
        css={{
          height: 44,
          padding: '11.5px 16px',
          fontSize: 15,
          border: '1px solid var(--color-gray300)',
          borderRadius: 8,
        }}
        onClick={() => {
          trackEvent({
            fa: { category: '메인메뉴', action: '로그아웃_선택' },
          })
          logout()
        }}
      >
        로그아웃
      </Button>
    </Container>
  )
}
