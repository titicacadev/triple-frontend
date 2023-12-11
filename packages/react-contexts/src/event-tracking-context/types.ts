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

/**
 * Tiktok Pixel 이벤트입니다.
 *
 * ref: https://ads.tiktok.com/gateway/docs/index?identify_key=2b9b4278e47b275f36e7c39a4af4ba067d088e031d5f5fe45d381559ac89ba48&language=ENGLISH&doc_id=1701890973258754#item-link-Install%20event%20code
 */
export type TiktokPixelEventType =
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

export interface TiktokPixelEventParams {
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

export interface TiktokPixelEvent {
  type: TiktokPixelEventType
  params: TiktokPixelEventParams
}
