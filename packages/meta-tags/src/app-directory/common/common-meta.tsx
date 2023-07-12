/* eslint-disable no-useless-computed-key */
import { Metadata } from 'next'

/**
 * CommonMeta 컴포넌트의 Next13 app router 버전 메타데이터입니다.
 */
export const commonMeta: Metadata = {
  viewport:
    'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover',
  icons: {
    apple: 'https://triple.guide/icons/favicon-152x152.png',
  },
  manifest: '/manifest.json',
  other: {
    ['msapplication-TileImage']:
      'https://triple.guide/icons/favicon-144x144.png',
    ['msapplication-TileColor']: '#1FC1B6',
  },
}
