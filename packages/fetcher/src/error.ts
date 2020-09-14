import { CustomError } from 'ts-custom-error'

import { HttpErrorResponse } from './types'
/**
 * 공통 에러 모듈
 *
 * 현재는 fetch 수행 이후 에러가 발생(`서버에서 에러를 응답을 내려주면` 이 아님)하면
 * Sentry 로깅을 하는 일만 수행함
 *
 * TODO:
 *
 * - [ ] 각 서비스별 error response 타입이 다를 수 있기 때문에 generic type 을 허용해야함
 * - [ ] fetch 가 정상 수행되고 서버에서 4xx, 5xx 의 응답을 반환하는 경우에도 공통 에러 객체를 반환하는 형태로 개선
 *
 * ref - https://github.com/adriengibrat/ts-custom-error
 */
export class HttpError extends CustomError {
  private readonly _statusCode: number

  private readonly _errorData: HttpErrorResponse

  constructor(errorData: HttpErrorResponse, response: Response) {
    const { status, statusText } = response
    super(statusText)
    this._statusCode = status
    this._errorData = errorData

    // Sentry.captureException(errorData)
  }

  is(code: number) {
    return this._statusCode === code
  }
}
