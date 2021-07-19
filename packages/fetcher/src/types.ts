import { IncomingMessage } from 'http'

import { HttpError } from './error'

export type RequestOptions = Omit<RequestInit, 'body'> & {
  /** request object ssr only */
  /**
   * @deprecated TF v3.x부터 req를 한번에 받지 않고 용도별로 세분화하여 받도록 합니다.
   * cookie, absoluteUrl을 사용해주세요!
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
  cookie?: string
  absoluteUrl?: boolean
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
