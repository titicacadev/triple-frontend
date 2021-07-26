import { IncomingMessage } from 'http'

import { HttpError } from './error'

export type RequestOptions = Omit<RequestInit, 'body'> & {
  /**
   * @deprecated req보다는 cookie, absoluteUrl의 사용을 권장합니다!
   * req를 직접 참조할 시 생기는 이슈
   * 1. "서버환경에서 쿠키가 필요없는 상황"에서 사용하기 애매 (우회를 해야하는 번거로움)
   * 2. 쿠키가 누락되는 현상 발생
   *
   * 참조: https://github.com/titicacadev/triple-frontend/issues/1334
   */
  req?: IncomingMessage
  /** don't stringfy body */
  useBodyAsRaw?: boolean
  retryable?: boolean

  /**
   * RequestInit.body의 타입 오버라이드
   */
  body?: BodyInit | { [key: string]: any }
  /**
   * cookie를 인자로 받을 시 해당 cookie를 헤더에 삽입
   * 브라우저의 fetch는 헤더를 무시하기 때문에 SSR시에만 유효합니다.
   */
  cookie?: string
  /**
   * withApiUriBase true일 때
   * URL에 API base URL을 붙여 요청을 절대 경로로 보낼 수 있게 만듦
   */
  withApiUriBase?: boolean
}

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export interface HttpErrorResponse extends Error {
  status?: number
  exception?: string
  code?: string
  title?: string
  message: string
}

export interface HttpResponse<T, E = HttpErrorResponse> extends Response {
  result?: T
  error?: HttpError<E>
}
