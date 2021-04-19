import { TripleDocument } from './triple-document'
export { default as ELEMENTS } from './elements'
export { TripleElementData as TripleDocumentElementData } from './types'
export * from './elements/text'

export { useDeepLink } from './prop-context/deep-link'
export { useImageClickHandler } from './prop-context/image-click-handler'
export { useImageSource } from './prop-context/image-source'
export { useLinkClickHandler } from './prop-context/link-click-handler'
export { useMediaConfig } from './prop-context/media-config'
export { useResourceClickHandler } from './prop-context/resource-click-handler'
export { useTNAProductClickHandler } from './prop-context/tna-product-click-handler'
export { useTNAProductsFetcher } from './prop-context/tna-products-fetcher'

export default TripleDocument
