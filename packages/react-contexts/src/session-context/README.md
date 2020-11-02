# SessionContext 사용 가이드

이 문서는 SessionContext 를 이용하여 세션 체크 및 트리플 앱 밖에서 유저 인증과 관련된 전반적인
기능들의 사용 방법을 가이드 합니다.

## 예시코드

```tsx
import { SessionContextProvider } from '@titicaca/react-contexts'

import User from './user-component'

export default Page() {
  if (!process.env.NEXT_PUBLIC_AUTH_WEB_BASE_PATH) {
    throw new Error(
      'Insufficient environment variables in `.env.*` files\n- NEXT_PUBLIC_AUTH_WEB_BASE_PATH',
    )
  }

  return (
    <SessionContextProvider
      authBasePath={process.env.NEXT_PUBLIC_AUTH_WEB_BASE_PATH}
      sessionId={sessionId}
    >
      <User />
    </SessionContextProvider>
  )
}
```

위와 같이 Context Provider 를 추가하고 다음과 같이 `hasSessionId` 값을 참조하여 로그인, 로그아웃
을 처리합니다.

```tsx
// user-component.tsx
import { useSessionContext } from '@titicaca/react-contexts'

export default function User() {
  const { hasSessionId, login, logout } = useSessionContext()

  return { hasSessionId
    ? <button onClick={logout}>login</button>
    : <button onClick={login}>logout</button>
  }
}
```
