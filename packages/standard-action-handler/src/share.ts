import { generateUrl, parseUrl, UrlElements } from '@titicaca/view-utilities'
import { shareLink } from '@titicaca/triple-web-to-native-interfaces'

import { ContextOptions } from './types'

interface SharingParams {
  title?: string | null
  description?: string | null
  image?: string | null
  webUrl?: string | null
  appUrl: string
}

const DEFAULT_IMAGE =
  'https://assets.triple.guide/images/default-cover-image.jpg'

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

function copyUrlToClipboard(params: SharingParams) {
  const { webUrl } = params

  navigator.clipboard.writeText(webUrl as string).then(() => {
    alert('링크가 복사되었습니다.')
  })
}

function copyUrlWithDOMAPI(params: SharingParams) {
  const { webUrl } = params
  const inputElement = document.createElement('input')

  inputElement.value = webUrl as string
  document.body.appendChild(inputElement)
  inputElement.select()
  document.execCommand('copy')
  document.body.removeChild(inputElement)

  alert('링크가 복사되었습니다.')
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

function defineType(isPublic?: boolean) {
  if (isPublic) {
    return typeof navigator !== 'undefined' && navigator.share
      ? 'shareWithNavigator'
      : navigator.clipboard
      ? 'copyWithClipboardAPI'
      : 'copyWithDOMAPI'
  } else {
    return 'shareWithNativeInterface'
  }
}

function createShareFuntion(params: SharingParams, type: string) {
  switch (type) {
    case 'shareWithNavigator':
      return navigatorShare(params)
    case 'shareWithNativeInterface':
      return shareNativeInterface(params)
    case 'copyWithClipboardAPI':
      return copyUrlToClipboard(params)
    case 'copyWithDOMAPI':
      return copyUrlWithDOMAPI(params)
  }
}

export default async function share(
  { path }: UrlElements,
  { isPublic }: ContextOptions,
) {
  if (path === '/web-action/share') {
    const params = getSharingParams()
    const shareType = defineType(isPublic)
    const shareByEnv = createShareFuntion(params, shareType)

    shareByEnv && shareByEnv()

    return true
  }

  return false
}
