import { CustomError } from 'ts-custom-error'

type ErrorType = 'NotBrowser' | 'Unavailable' | 'QuotaExceeded'

export class WebStorageError extends CustomError {
  constructor(type: 'localStorage' | 'sessionStorage', errorType: ErrorType) {
    const messageMap: { [key in ErrorType]: string } = {
      NotBrowser: '브라우저 환경일 때만 WebStorage API를 사용할 수 있습니다.',
      Unavailable: `${type}에 접근할 수 없습니다.`,
      QuotaExceeded: `${type}의 허용된 용량을 모두 사용했습니다.`,
    }

    super(messageMap[errorType])
  }
}
