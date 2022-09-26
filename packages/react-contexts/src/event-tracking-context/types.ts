export interface FirebaseAnalyticsParams {
  category: string
  event_name: string
  [key: string]: unknown
}

export type GoogleAnalyticsParams = (string | undefined)[]

interface PixelPayload {
  [key: string]: unknown
}

/**
 * Pixel 표준 이벤트입니다.
 *
 * ref: https://www.facebook.com/business/help/402791146561655?id=1205376682832142
 */
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
