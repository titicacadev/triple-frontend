import { getTranslation, TFunction } from '@titicaca/next-i18next'
import { CustomError } from 'ts-custom-error'

import { ErrorType, WebStorageType } from './types'

export class WebStorageError extends CustomError {
  private type: ErrorType

  private storageType: WebStorageType

  private t: TFunction

  public constructor({
    type,
    storageType,
    t,
  }: {
    type: ErrorType
    storageType: WebStorageType
    t: TFunction
  }) {
    const messageMap: { [key in ErrorType]: string } = {
      notBrowser: '브라우저 환경일 때만 WebStorage API를 사용할 수 있습니다.',
      unavailable: `${storageType}에 접근할 수 없습니다.`,
      quotaExceeded: `${storageType}의 허용된 용량을 모두 사용했습니다.`,
    }

    super(messageMap[type])
    this.type = type
    this.storageType = storageType
    this.t = t
  }

  public get userGuideMessage() {
    switch (this.type) {
      case 'notBrowser':
        return this.t([
          'beuraujeoeseo-sayonghaejuseyo.',
          '브라우저에서 사용해주세요.',
        ])
      case 'quotaExceeded':
        if (this.storageType === 'sessionStorage') {
          return this.t([
            'beuraujeoreul-wanjeonhi-jongryohago-dasi-jeobsoghae-juseyo.',
            '브라우저를 완전히 종료하고 다시 접속해 주세요.',
          ])
        }
        return this.t([
          'beuraujeo-kaesireul-modu-biweojuseyo.',
          '브라우저 캐시를 모두 비워주세요.',
        ])
      case 'unavailable':
        return this.t([
          'beuraujeoyi-kuki-cadan-seoljeongeul-haejehaejuseyo.',
          '브라우저의 쿠키 차단 설정을 해제해주세요.',
        ])
      default:
        return this.t([
          'al-su-eobsneun-ereoga-balsaenghaessseubnida.-jamsi-hu-dasi-sidohae-juseyo.',
          '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        ])
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
  const t = getTranslation('common-web')

  if (onError) {
    const onErrorType = onError[errorType]
    if (onErrorType) {
      onErrorType()
      return
    }
  }
  throw new WebStorageError({ type: errorType, storageType, t })
}
