import { IncomingMessage } from 'http'

import { HttpError } from './error'

export type RequestOptions = {
  /** request object ssr only */
  req?: IncomingMessage
  /** request body object */
  body?: { [key: string]: any }
  /** header object */
  headers?: { [key: string]: any }
  [key: string]: any
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

export interface HttpResponse<T> extends Response {
  result?: T
  error?: HttpError
}
