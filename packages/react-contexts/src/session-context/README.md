# SessionContext 사용 가이드

이 문서는 SessionContext 를 이용하여 세션 체크 및 트리플 앱 밖에서 유저 인증과 관련된 전반적인
기능들의 사용 방법을 가이드 합니다.

## 예시코드

```tsx
export default function Page({ hasWebSession }: { hasWebSession: boolean }) {
  if (!process.env.NEXT_PUBLIC_AUTH_WEB_BASE_PATH) {
    throw new Error(
      'Insufficient environment variables in `.env.*` files\n- NEXT_PUBLIC_AUTH_WEB_BASE_PATH',
    )
  }

  return (
    <EnvProvider authBasePath={process.env.NEXT_PUBLIC_AUTH_WEB_BASE_PATH}>
      <SessionContextProvider
        hasWebSession={hasWebSession}
        sessionId={sessionId} // Deprecate 되었습니다.
      >
        <User />
      </SessionContextProvider>
    </EnvProvider>
  )
}

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<{ hasWebSession: boolean }>
> {
  return { props: { hasWebSession: checkWebSessionAvailability(req) } }
}
```

위와 같이 Context Provider 를 추가하고 다음과 같이 로그인 여부를 참조합니다.
로그인, 로그아웃 메서드도 사용할 수 있습니다.

```tsx
// user-component.tsx
import { useSessionContext } from '@titicaca/react-contexts'

export default function User() {
  const { hasWebSession, hasSessionId, login, logout } = useSessionContext()

  const isLoggedIn = hasWebSession || hasSessionId

  return { isLoggedIn
    ? <button onClick={logout}>login</button>
    : <button onClick={login}>logout</button>
  }
}
```
