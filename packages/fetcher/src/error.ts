import { CustomError } from 'ts-custom-error'

import { HttpErrorResponse } from './types'

const DEFAULT_HTTP_ERROR_RESPONSE: HttpErrorResponse = {
  code: 'UNKNOWN',
  message: '알 수 없는 에러가 발생하였습니다.',
  name: 'UNKNOWN',
}

export class HttpError<E> extends CustomError {
  private readonly _statusCode: number

  private readonly _errorData: HttpErrorResponse

  constructor(errorData: HttpErrorResponse, response: Response) {
    const { status, statusText } = response
    super(statusText)
    this._statusCode = status
    this._errorData = errorData
  }

  is(code: number) {
    return this._statusCode === code
  }

  get responseError() {
    try {
      return {
        ...DEFAULT_HTTP_ERROR_RESPONSE,
        ...JSON.parse(this._errorData.message),
        status: this._statusCode,
      } as E
    } catch (error) {
      return {
        ...DEFAULT_HTTP_ERROR_RESPONSE,
        status: this._statusCode,
      }
    }
  }
}
