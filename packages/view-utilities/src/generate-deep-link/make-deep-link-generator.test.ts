import qs from 'qs'

import { generateUrl } from '../url'

import { makeDeepLinkGenerator } from './make-deep-link-generator'

const SUBDOMAIN = 'subdomain'
const ONELINK_ID = 'onelinkid'
const PID = 'onelinkpid'
const APP_PATH = '/hoteles/c2eb4fba-cad1-4c08-94b2-9430039d181e'
const APP_SCHEME = 'triple'
const WEB_URL_BASE = 'https://triple.guide'

test('it appends proper onelink attribution queries', () => {
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
      is_retargeting: true,
    }),
  })

  expect(deepLink).toEqual(expectedDeepLink)
})

test('it allows pid override', () => {
  const overridenPid = 'overriden'

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
    pid: overridenPid,
  })

  const expectedDeepLink = generateUrl({
    scheme: 'https',
    host: `${SUBDOMAIN}.onelink.me`,
    path: `/${ONELINK_ID}`,
    query: qs.stringify({
      af_dp: `${APP_SCHEME}://${APP_PATH}`,
      af_web_dp: WEB_URL_BASE,
      pid: overridenPid,
      is_retargeting: true,
    }),
  })

  expect(deepLink).toEqual(expectedDeepLink)
})

test('it provides reengagement window', () => {
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
    reengagementWindow: '7d',
  })

  const expectedDeepLink = generateUrl({
    scheme: 'https',
    host: `${SUBDOMAIN}.onelink.me`,
    path: `/${ONELINK_ID}`,
    query: qs.stringify({
      af_dp: `${APP_SCHEME}://${APP_PATH}`,
      af_web_dp: WEB_URL_BASE,
      pid: PID,
      af_reengagement_window: '7d',
      is_retargeting: true,
    }),
  })

  expect(deepLink).toEqual(expectedDeepLink)
})

test('it allows af_web_dp override', () => {
  const overridenUrl = 'https://foo.bar'

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
    webUrl: overridenUrl,
  })

  const expectedDeepLink = generateUrl({
    scheme: 'https',
    host: `${SUBDOMAIN}.onelink.me`,
    path: `/${ONELINK_ID}`,
    query: qs.stringify({
      af_dp: `${APP_SCHEME}://${APP_PATH}`,
      af_web_dp: overridenUrl,
      pid: PID,
      is_retargeting: true,
    }),
  })

  expect(deepLink).toEqual(expectedDeepLink)
})
