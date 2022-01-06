import { generateUrl, parseUrl, UrlElements } from '@titicaca/view-utilities'
import {
  shareLink,
  hasAccessibleTripleNativeClients,
} from '@titicaca/triple-web-to-native-interfaces'

import { copyWithDomApi, copyWithClipboard } from './utils'

interface SharingParams {
  title?: string | null
  description?: string | null
  image?: string | null
  webUrl?: string | null
  appUrl: string
}

const DEFAULT_IMAGE =
  'https://assets.triple.guide/images/default-cover-image.jpg'

const ALERT_MESSAGE = '링크를 복사했습니다.'

function getMetadata({ property }: { property: string }) {
  return document
    .querySelector(`meta[property='${property}']`)
    ?.getAttribute('content')
}

function getSharingParams() {
  const title = getMetadata({ property: 'og:title' })
  const description = getMetadata({ property: 'og:description' })
  const image = getMetadata({ property: 'og:image' })
  const webUrl = getMetadata({ property: 'og:url' })
  const rawAppUrl = getMetadata({ property: 'al:ios:url' })

  const { path: sharePath, query } = parseUrl(rawAppUrl as string)
  const appUrl = generateUrl({ path: sharePath, query })

  return { title, description, image, webUrl, appUrl }
}

function navigatorShare(params: SharingParams) {
  const { title, description, webUrl } = params

  navigator.share({
    title: title as string,
    text: description as string,
    url: webUrl as string,
  })
}

async function copyUrlToClipboard(params: SharingParams) {
  const { webUrl } = params

  copyWithClipboard({
    text: webUrl || window.location.href,
    message: ALERT_MESSAGE,
  })
}

function copyUrlWithDomApi(params: SharingParams) {
  const { webUrl } = params

  copyWithDomApi({
    text: webUrl || window.location.href,
    message: ALERT_MESSAGE,
  })
}

function shareNativeInterface(params: SharingParams) {
  const { title, description, image, webUrl, appUrl } = params

  return shareLink({
    link: webUrl as string,
    title: title as string,
    description: description as string,
    imageUrl: image || DEFAULT_IMAGE,
    buttons: [
      {
        title: '웹에서 보기',
        webUrl: webUrl as string,
      },
      {
        title: '트리플에서 보기',
        webUrl: webUrl as string,
        appUrl,
      },
    ],
  })
}

function createShareFunction() {
  if (!hasAccessibleTripleNativeClients()) {
    return typeof navigator !== 'undefined' && navigator.share
      ? navigatorShare
      : typeof navigator !== 'undefined' && navigator.clipboard
      ? copyUrlToClipboard
      : copyUrlWithDomApi
  } else {
    return shareNativeInterface
  }
}

export default async function share({ path }: UrlElements) {
  if (path === '/web-action/share') {
    const params = getSharingParams()
    const shareFuncByEnv = createShareFunction()

    shareFuncByEnv && shareFuncByEnv(params)

    return true
  }

  return false
}
