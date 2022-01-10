import '@testing-library/jest-dom'
import qs from 'qs'

import { generateUrl, parseUrl } from '../url'

import { makeDeepLinkGenerator } from './make-deep-link-generator'

const HOTEL_ID = 'c2eb4fba-cad1-4c08-94b2-9430039d181e' // 제주신라호텔

test('Deep Link를 생성합니다.', () => {
  const generateDeepLink = makeDeepLinkGenerator({
    oneLinkParams: {
      subdomain: 'triple',
      id: 'aZP6',
      pid: 'triple-web',
    },
    appScheme: 'triple',
    webURLBase: 'https://triple.guide',
  })

  const path = generateUrl({
    path: '/inlink',
    query: qs.stringify({
      path: generateUrl({
        path: `/hotels/${HOTEL_ID}`,
        query: '_triple_no_navbar',
      }),
    }),
  })

  const rawDeepLink = generateDeepLink({
    path,
    source: 'naver',
    campaign: 'promotion',
    adKeyword: '트리플',
    content: 'video',
  })

  const { href, ...parsedDeepLink } = parseUrl(rawDeepLink)
  const parsedDeepLinkQuery = qs.parse(parsedDeepLink.query || '')

  const createdDeepLinkParameters = {
    ...parsedDeepLink,
    query: parsedDeepLinkQuery,
  }

  const comparisonDeepLinkParameters = {
    scheme: 'https',
    host: 'triple.onelink.me',
    path: '/aZP6',
    query: {
      af_dp:
        'triple:///inlink?path=%2Fhotels%2Fc2eb4fba-cad1-4c08-94b2-9430039d181e%3F_triple_no_navbar',
      af_web_dp: 'https://triple.guide',
      pid: 'triple-web',
      c: 'promotion',
      af_ad: 'video',
      af_keywords: '트리플',
      af_channel: 'naver',
    },
    hash: '',
  }

  expect(createdDeepLinkParameters).toEqual(comparisonDeepLinkParameters)
})
