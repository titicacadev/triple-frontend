import { Metadata } from 'next'

export function generateCommonMeta(): Metadata {
  return {
    icons: {
      apple: 'https://triple.guide/icons/favicon-152x152.png',
    },
    manifest: '/manifest.json',
  }
}
