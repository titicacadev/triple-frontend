import { IncomingMessage } from 'http'

import { HttpError } from './error'

export type RequestOptions = Omit<RequestInit, 'body'> & {
  /** request object ssr only */
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
