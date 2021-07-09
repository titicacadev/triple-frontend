import { CustomError } from 'ts-custom-error'

type ErrorType = 'NotBrowser' | 'Unavailable' | 'QuotaExceeded'

export class WebStorageError extends CustomError {
  private type: ErrorType

  private storageType: 'localStorage' | 'sessionStorage'

  constructor(type: 'localStorage' | 'sessionStorage', errorType: ErrorType) {
    const messageMap: { [key in ErrorType]: string } = {
      NotBrowser: '브라우저 환경일 때만 WebStorage API를 사용할 수 있습니다.',
      Unavailable: `${type}에 접근할 수 없습니다.`,
      QuotaExceeded: `${type}의 허용된 용량을 모두 사용했습니다.`,
    }

    super(messageMap[errorType])
    this.type = errorType
    this.storageType = type
  }

  get userGuideMessage() {
    switch (this.type) {
      case 'NotBrowser':
        return '브라우저에서 사용해주세요.'
      case 'QuotaExceeded':
        if (this.storageType === 'sessionStorage') {
          return '브라우저를 완전히 종료하고 다시 접속해 주세요.'
        }
        return '브라우저 캐시를 모두 비워주세요.'
      case 'Unavailable':
        return '브라우저의 쿠키 차단 설정을 해제해주세요.'
      default:
        return '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    }
  }
}
