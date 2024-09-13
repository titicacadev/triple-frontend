import { TripleDocument } from './triple-document'

export { default as ELEMENTS } from './elements'
export type { TripleElementData as TripleDocumentElementData } from './types'
export * from './elements/text'
export { useGenerateCoupon } from './elements/tna/use-generate-coupon'
export { Slot } from './elements/tna/slot'
export { PricePolicyCouponInfo } from './elements/tna/price-policy-coupon-info'

export { useDeepLink } from './prop-context/deep-link'
export { useGuestMode } from './prop-context/guest-mode'
export { useImageClickHandler } from './prop-context/image-click-handler'
export { useImageSource } from './prop-context/image-source'
export { useLinkClickHandler } from './prop-context/link-click-handler'
export { useMediaConfig } from './prop-context/media-config'
export { useResourceClickHandler } from './prop-context/resource-click-handler'
export { default as useResourceEventTracker } from './use-resource-event-tracker'

export default TripleDocument
