import qs from 'qs'

import { generateUrl } from '../url'

import { makeDeepLinkGenerator } from './make-deep-link-generator'

const SUBDOMAIN = 'subdomain'
const ONELINK_ID = 'onelinkid'
const PID = 'onelinkpid'
const APP_PATH = '/hoteles/c2eb4fba-cad1-4c08-94b2-9430039d181e'
const APP_SCHEME = 'triple'
const WEB_URL_BASE = 'https://triple.guide'

test('Deep Link를 생성합니다.', () => {
  const generateDeepLink = makeDeepLinkGenerator({
    oneLinkParams: {
      subdomain: SUBDOMAIN,
      id: ONELINK_ID,
      pid: PID,
    },
    appScheme: APP_SCHEME,
    webURLBase: WEB_URL_BASE,
  })

  const deepLink = generateDeepLink({
    path: APP_PATH,
    channel: 'naver',
    campaign: 'winter_sale',
    keywords: 'triple',
    ad: 'video',
    adSet: 'naver_email',
  })

  const expectedDeepLink = generateUrl({
    scheme: 'https',
    host: `${SUBDOMAIN}.onelink.me`,
    path: `/${ONELINK_ID}`,
    query: qs.stringify({
      af_dp: `${APP_SCHEME}://${APP_PATH}`,
      af_web_dp: WEB_URL_BASE,
      pid: PID,
      c: 'winter_sale',
      af_adset: 'naver_email',
      af_ad: 'video',
      af_keywords: 'triple',
      af_channel: 'naver',
    }),
  })

  expect(deepLink).toEqual(expectedDeepLink)
})
