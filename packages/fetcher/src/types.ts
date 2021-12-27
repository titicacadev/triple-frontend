import { IncomingMessage } from 'http'

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
  body?: unknown
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
}

export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
  Patch = 'PATCH',
}

export interface HttpErrorResponse extends Error {
  status?: number
  exception?: string
  code?: string
  title?: string
  message: string
}

export type SuccessOrFailureBody<SuccessBody, FailureBody> =
  | { ok: true; parsedBody: SuccessBody }
  | { ok: false; parsedBody: FailureBody }

export type HttpResponse<SuccessBody, FailureBody = unknown> = Pick<
  Response,
  'headers' | 'ok' | 'status' | 'url'
> &
  SuccessOrFailureBody<SuccessBody, FailureBody>
