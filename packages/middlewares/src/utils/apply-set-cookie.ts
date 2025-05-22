import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest, NextResponse } from 'next/server'

/** Reference: https://github.com/vercel/next.js/discussions/50374#discussioncomment-6732402
 * response.cookies.set 사용 시 response의 set-cookie로 값이 적용되기 때문에 이를 response의 headers.cookie로 설정해주는 함수입니다.
 *
 */
export function applySetCookie(req: NextRequest, res: NextResponse) {
  const setCookies = new ResponseCookies(res.headers)
  const newReqHeaders = new Headers(req.headers)
  const newReqCookies = new RequestCookies(newReqHeaders)
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie))

  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } })

  dummyRes.headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-') ||
      key === 'x-middleware-set-cookie'
    ) {
      res.headers.set(key, value)
    }
  })
}
