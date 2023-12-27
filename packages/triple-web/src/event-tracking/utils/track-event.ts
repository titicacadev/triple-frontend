import { trackEvent as nativeTrackEvent } from '@titicaca/triple-web-to-native-interfaces'
import { logEvent as firebaseLogEvent } from 'firebase/analytics'

import { firebaseAnalytics } from '../libs/firebase-analytics'
import type { EventTrackingValue } from '../types'

declare const window: {
  ga?: (
    method: 'send' | 'set',
    type: 'pageview' | 'event' | 'page',
    ...data: (string | undefined)[]
  ) => void
  fbq?: (
    type: 'track' | 'trackCustom',
    action: string,
    payload?: { [key: string]: unknown },
  ) => void
} & Window

type GoogleAnalyticsParams = (string | undefined)[]

interface FirebaseAnalyticsParams {
  category?: string
  event_name?: string
  [key: string]: unknown
}

interface FacebookPixelPayload {
  [key: string]: unknown
}

interface FacebookPixelStandardEvent {
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
  payload?: FacebookPixelPayload
}

interface FacebookPixelCustomEvent {
  type: 'trackCustom'
  action: string
  payload?: FacebookPixelPayload
}

type FacebookPixelParams =
  | FacebookPixelStandardEvent
  | FacebookPixelCustomEvent
  | (Omit<FacebookPixelCustomEvent, 'type'> & { type?: never })

export interface TrackEventParams {
  ga?: GoogleAnalyticsParams
  fa?: Partial<FirebaseAnalyticsParams>
  /**
   * Facebook Pixel 이벤트 파라미터
   *
   * type을 "track"으로 설정하면 주어진 action만 사용할 수 있습니다.
   * 그리고 type을 생략하면 맞춤 이벤트를 사용합니다.
   */
  facebookPixel?: FacebookPixelParams
}

export function trackEvent(
  { ga, fa, facebookPixel }: TrackEventParams,
  context: EventTrackingValue | undefined,
) {
  const pageLabel = context?.page?.label

  try {
    if (window.ga && ga) {
      const [action, label] = ga
      window.ga('send', 'event', pageLabel, action, label)
    }

    if (window.fbq && facebookPixel) {
      const { type = 'trackCustom', action, payload } = facebookPixel
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
