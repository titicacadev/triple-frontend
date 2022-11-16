import { CustomError } from 'ts-custom-error'

import { ErrorType, WebStorageType } from './types'

export class WebStorageError extends CustomError {
  private type: ErrorType

  private storageType: WebStorageType

  public constructor({
    type,
    storageType,
  }: {
    type: ErrorType
    storageType: WebStorageType
  }) {
    const messageMap: { [key in ErrorType]: string } = {
      notBrowser: '브라우저 환경일 때만 WebStorage API를 사용할 수 있습니다.',
      unavailable: `${storageType}에 접근할 수 없습니다.`,
      quotaExceeded: `${storageType}의 허용된 용량을 모두 사용했습니다.`,
    }

    super(messageMap[type])
    this.type = type
    this.storageType = storageType
  }

  public get userGuideMessage() {
    switch (this.type) {
      case 'notBrowser':
        return '브라우저에서 사용해주세요.'
      case 'quotaExceeded':
        if (this.storageType === 'sessionStorage') {
          return '브라우저를 완전히 종료하고 다시 접속해 주세요.'
        }
        return '브라우저 캐시를 모두 비워주세요.'
      case 'unavailable':
        return '브라우저의 쿠키 차단 설정을 해제해주세요.'
      default:
        return '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    }
  }

  public get errorType(): ErrorType {
    return this.type
  }
}

export function handleError({
  errorType,
  storageType,
  onError,
}: {
  errorType: ErrorType
  storageType: WebStorageType
  onError?: { [key in ErrorType]?: () => unknown }
}) {
  if (onError) {
    const onErrorType = onError[errorType]
    if (onErrorType) {
      onErrorType()
      return
    }
  }
  throw new WebStorageError({ type: errorType, storageType })
}
