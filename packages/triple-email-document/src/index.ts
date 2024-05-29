import { TripleEmailDocument } from './triple-email-document'

export { default as ELEMENTS } from './elements'
export type { TripleEmailElementData as TripleEmailDocumentElement } from './elements'
export type { ExtendedImageMeta, ImageDocument } from './elements/images'
export { EmailPreview, type PreviewDocument } from './components'
export { default as FullEmailTemplate } from './full-email-template'
export { FluidTable, HandlebarsAnchor } from './common'

export default TripleEmailDocument
