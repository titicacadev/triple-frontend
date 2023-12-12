import { IncomingMessage } from 'http'

import Cookies from 'universal-cookie'

/**
 * 클라이언트 앱일 때의 session availability 확인
 * @param req
 */
export function checkClientAppSession(req: IncomingMessage) {
  const cookies = new Cookies(req.headers.cookie)

  const hasSession = !!cookies.get('x-soto-session')

  return hasSession
}

/**
 * 웹일 때의 session availability 확인
 * @param req
 */
export function checkWebSession(req: IncomingMessage) {
  const cookies = new Cookies(req.headers.cookie)

  let hasSession = !!req.headers['x-triple-web-login']

  if (process.env.NODE_ENV !== 'production') {
    hasSession = !!cookies.get('TP_SE')
  }

  return hasSession
}
