import { Metadata } from 'next'

import { generateCommonMeta } from './generate-common-meta'
import { generateEssentialContentMeta } from './generate-essential-content-meta'
import { generateFacebookOpenGraphMeta } from './generate-facebook-open-graph-meta'
import { generateFacebookAppLinkMeta } from './generate-facebook-app-link-meta'
import { generateAppleSmartBannerMeta } from './generate-apple-smart-banner-meta'

export function generateTripleDefaultMeta(): Metadata {
  return {
    ...generateCommonMeta(),
    ...generateEssentialContentMeta(),
    ...generateFacebookOpenGraphMeta(),
    ...generateFacebookAppLinkMeta(),
    ...generateAppleSmartBannerMeta(),
  }
}
