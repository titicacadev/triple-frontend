import { trackEvent as nativeTrackEvent } from '@titicaca/triple-web-to-native-interfaces'
import { logEvent as firebaseLogEvent } from 'firebase/analytics'

import { firebaseAnalytics } from '../libs'
import { EventTracking } from '../contexts'

export type GoogleAnalyticsParams = (string | undefined)[]

export interface FirebaseAnalyticsParams {
  category?: string
  event_name?: string
  [key: string]: unknown
}

interface PixelPayload {
  [key: string]: unknown
}

interface PixelStandardEvent {
  type: 'track'
  action:
    | 'AddPaymentInfo'
    | 'AddToCart'
    | 'AddToWishlist'
    | 'CompleteRegistration'
    | 'Contact'
    | 'CustomizeProduct'
    | 'Donate'
    | 'FindLocation'
    | 'InitiateCheckout'
    | 'Lead'
    | 'Purchase'
    | 'Schedule'
    | 'Search'
    | 'StartTrial'
    | 'SubmitApplication'
    | 'Subscribe'
    | 'ViewContent'
  payload?: PixelPayload
}

interface PixelCustomEvent {
  type: 'trackCustom'
  action: string
  payload?: PixelPayload
}

export type PixelParams =
  | PixelStandardEvent
  | PixelCustomEvent
  | (Omit<PixelCustomEvent, 'type'> & { type?: never })

export interface TrackEventParams {
  ga?: GoogleAnalyticsParams
  fa?: Partial<FirebaseAnalyticsParams>
  /**
   * Facebook Pixel 이벤트 파라미터
   *
   * type을 "track"으로 설정하면 주어진 action만 사용할 수 있습니다.
   * 그리고 type을 생략하면 맞춤 이벤트를 사용합니다.
   */
  pixel?: PixelParams
}

export function trackEvent(
  { ga, fa, pixel }: TrackEventParams,
  context: EventTracking | undefined,
) {
  const pageLabel = context?.page?.label

  try {
    if (window.ga && ga) {
      const [action, label] = ga
      window.ga('send', 'event', pageLabel, action, label)
    }

    if (window.fbq && pixel) {
      const { type = 'trackCustom', action, payload } = pixel
      window.fbq(type, action, { pageLabel, ...payload })
    }

    if (firebaseAnalytics && fa) {
      firebaseLogEvent(firebaseAnalytics, 'web_user_interaction', {
        category: pageLabel,
        ...fa,
      })
    }

    nativeTrackEvent({
      ga: ga && [pageLabel, ...ga],
      fa: fa && {
        category: pageLabel ?? '',
        event_name: 'user_interaction',
        ...fa,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      context?.onError?.(error)
    }
  }
}
