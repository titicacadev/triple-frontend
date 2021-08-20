import { IncomingMessage } from 'http'

import { HttpError } from './error'

export type RequestOptions = Omit<RequestInit, 'body'> & {
  /**
   * @deprecated req보다는 cookie, withApiUriBase 사용을 권장합니다!
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
   * 브라우저의 fetch는 쿠키를 보내거나 받지 않기 때문에 SSR시에만 유효합니다.
   */
  cookie?: string
  /**
   * withApiUriBase true일 때
   * URL에 API base URL을 붙여 요청을 절대 경로로 보낼 수 있게 만듦
   */
  withApiUriBase?: boolean

  /**
   * SecondaryApiUriBase가 있다면 baseUrl 생성시 SecondaryApiUriBase를 우선시합니다.
   */
  SecondaryApiUriBase?: string
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
