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

interface MetaPixelPayload {
  [key: string]: unknown
}

interface MetaPixelStandardEvent {
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
  payload?: MetaPixelPayload
}

interface MetaPixelCustomEvent {
  type: 'trackCustom'
  action: string
  payload?: MetaPixelPayload
}

type MetaPixelParams =
  | MetaPixelStandardEvent
  | MetaPixelCustomEvent
  | (Omit<MetaPixelCustomEvent, 'type'> & { type?: never })

type TiktokPixelEventType =
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'ClickButton'
  | 'CompletePayment'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Download'
  | 'InitiateCheckout'
  | 'PlaceAnOrder'
  | 'Search'
  | 'SubmitForm'
  | 'Subscribe'
  | 'ViewContent'

interface TiktokPixelEventParams {
  content_type?: string
  contents?: {
    content_id?: string
    content_name?: string
    content_category?: string
    price?: string
    quantity?: number
    brand?: string
  }[]
  currency?: string // ISO 4217
  value?: number // total price of the order
}

interface TiktokPixelEvent {
  type: TiktokPixelEventType
  params?: TiktokPixelEventParams
}

export interface TrackEventParams {
  ga?: GoogleAnalyticsParams
  fa?: Partial<FirebaseAnalyticsParams>
  /**
   * Meta Pixel 이벤트 파라미터 (구 Facebook Pixel)
   *
   * type을 "track"으로 설정하면 주어진 action만 사용할 수 있습니다.
   * 그리고 type을 생략하면 맞춤 이벤트를 사용합니다.
   */
  metaPixel?: MetaPixelParams
  /**
   * Tiktok Pixel 이벤트 파라미터
   */
  tiktokPixel?: TiktokPixelEvent
}

// TODO @types/google.analytics, @types/facebook-pixel 대체
declare global {
  interface Window {
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
    ttq?: {
      track: (
        type: TiktokPixelEventType,
        params?: TiktokPixelEventParams,
      ) => void
    }
  }
}

export function trackEvent(
  { ga, fa, metaPixel, tiktokPixel }: TrackEventParams,
  context: EventTrackingValue | undefined,
) {
  const pageLabel = context?.page?.label

  try {
    if (window.ga && ga) {
      const [action, label] = ga
      window.ga('send', 'event', pageLabel, action, label)
    }

    if (window.fbq && metaPixel) {
      const { type = 'trackCustom', action, payload } = metaPixel
      window.fbq(type, action, { pageLabel, ...payload })
    }

    if (window.ttq && tiktokPixel) {
      window.ttq.track(tiktokPixel.type, tiktokPixel.params)
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
