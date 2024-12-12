# `@titicaca/middlewares`

트리플 서비스에서 공통으로 사용할 미들웨어 함수들을 제공합니다.  
새로운 미들웨어를 추가하거나 확장할 수 있습니다.

## Description

현재 `@titicaca/middlewares` 패키지에서 제공해주는 2가지 미들웨어에 대한 설명입니다.

### old-ios-cookie

트리플 iOS 6.5.0 미만 버전에서 쿠키가 설정되지 않는 오류를 우화하기 위한 cookie fixation 로직입니다.

[관련 PR](https://github.com/titicacadev/triple-frontend/pull/2635)

### session-cookie

페이지 진입 단계에서 사용자 인증 처리가 필요할 경우 사용하는 미들웨어 입니다.

- ex. App Directory

해당 미들웨어에서는 다음 순서로 사용자 인증 여부를 확인합니다.

1. 요청 헤더에 포함된 쿠키로 /user/me를 호출합니다.
2. 401 응답을 받으면, refresh 요청을 보내서 토큰을 갱신합니다.
3. 갱신된 토큰을 response의 _set-cookie_ header와 set-cookie와 request의 _cookie_ header에 전달합니다.
4. 브라우저는 response의 _set-cookie_ 를 통해 브라우저 쿠키값을 갱신합니다.
5. refresh token 갱신 실패 시 response의 header에 `x-auth-status` = 'NEED_LOGIN'를 전달합니다.

## Usage

적용하고자 하는 Next.js 프로젝트 루트에 `middleware.ts` 파일을 추가합니다.

```typescript
// middleware.ts

import {
  chain,
  oldIosCookiesMiddleware,
  sessionCookieMiddleware,
} from './middlewares'

export default chain([
  oldIosCookiesMiddleware,
  sessionCookieMiddleware([/^\/test$/]),
])
```

여러 개의 미들웨어가 필요한 경우애는, `chain` 함수로 미들웨어들을 연속적으로 실행할 수 있습니다.

**`session-cookie` 미들웨어는 인자로 사용자 인증이 필요한 페이지 경로를 설정해야 합니다.**

## 새로운 미들웨어 추가하기

`chain` 함수가 인자로 받는 middleware factory 함수 타입은 다음과 같습니다.

```typescript
type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware
```

각 middleware는 `CustomMiddleware`를 반환해야 합니다. 그렇지 않으면 middleware chain이 정상적으로 동작하지 않게 됩니다.

```typescript
export function myCustomMiddleware(customMiddleware: CustomMiddleware) {
  return function middleware(request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next()
    // ...
    return customMiddleware(request, event, response)
  }
}
```

## 세션 인증 실패처리 예시

```typescript
import { headers } from 'next/headers'

export default function TestPage() {
  const xAuthStatus = headers().get(X_AUTH_STATUS)

  if (xAuthStatus === NEED_LOGIN_IDENTIFIER) {
    // 인증 실패 시 실행할 로직을 작성합니다.
    return redirect('/401')
  }
  return <ServerComponent />
}
```
