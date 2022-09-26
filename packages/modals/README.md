# modals

모달 UI 컴포넌트와 이를 이용해 특정 행동을 유도하는 모달 컴포넌트를 모아놓은 패키지입니다.

## 사용법

### Login CTA Modal

`useLoginCTAModal` 훅을 사용하세요.

```ts
import { useSessionAvailability } from '@titicaca/react-contexts'

function Reviews() {
  const sessionAvailable = useSessionAvailability()
  const { show: showLoginCTA } = useLoginCTAModal()

  const handleClick = () => {
    if (!sessionAvailable) {
      showLoginCTA()
    }
  }
}
```

로그인 유도 모달을 사용한 컴포넌트를 `LoginCTAModalProvider`로 감쌉니다.

```tsx
return (
  <LoginCTAModalProvider>
    <Reviews />
  </LoginCTAModalProvider>
)
```

HOC를 사용할 수도 있습니다.

```tsx
export default withLoginCTAModal(Reviews)
```
