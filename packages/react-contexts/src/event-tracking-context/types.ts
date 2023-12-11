export interface FirebaseAnalyticsParams {
  category: string
  event_name: string
  [key: string]: unknown
}

export type GoogleAnalyticsParams = (string | undefined)[]

interface FacebookPixelPayload {
  [key: string]: unknown
}

/**
 * Facebook Pixel 표준 이벤트입니다.
 *
 * ref: https://www.facebook.com/business/help/402791146561655?id=1205376682832142
 */
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

export type FacebookPixelParams =
  | FacebookPixelStandardEvent
  | FacebookPixelCustomEvent
  | (Omit<FacebookPixelCustomEvent, 'type'> & { type?: never })
