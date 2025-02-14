# react-contexts

## middleware

기본적으로 세션을 갱신하는 로직을 실행하는 미들웨어를 제공합니다.

`middleware.ts` 파일 예시

```ts
import {
  constructMiddleware,
  oldTripleIosCookiesMiddleware,
  CustomMiddleware,
} from '@titicaca/react-contexts'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

function testMiddleware(customMiddleware: CustomMiddleware) {
  return function middleware(request: NextRequest, event: NextFetchEvent) {
    return customMiddleware(request, event, NextResponse.next())
  }
}

export default constructMiddleware([
  oldTripleIosCookiesMiddleware,
  testMiddleware,
])
```

직접 `CustomMiddleware`를 작성하여 미들웨어 구성이 가능합니다.

`middleware.ts` 파일에서 `next/server`로부터 타입을 import하기 때문에 `next.config.js`에 `config.resolve.fallback = { fs: false }`를 추가해야 오류가 발생하지 않습니다.
