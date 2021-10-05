import { generateUrl, parseUrl, UrlElements } from '@titicaca/view-utilities'
import { shareLink } from '@titicaca/triple-web-to-native-interfaces'

import { ContextOptions } from './types'

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

function copyUrlToClipboard() {
  if (!navigator.clipboard) {
    fallbackCopyUrlToClipboard()
  }

  const currentUrl = window.location.href
  navigator.clipboard.writeText(currentUrl).then(() => {
    alert('링크가 복사되었습니다.')
  })
}

function fallbackCopyUrlToClipboard() {
  const inputElement = document.createElement('input')
  inputElement.value = window.location.href
  document.body.appendChild(inputElement)
  inputElement.select()
  document.execCommand('copy')
  document.body.removeChild(inputElement)

  alert('링크가 복사되었습니다.')
}

const DEFAULT_IMAGE =
  'https://assets.triple.guide/images/default-cover-image.jpg'

function navigatorShare({
  title,
  description,
  webUrl,
}: Pick<SharingParams, 'title' | 'description' | 'webUrl'>) {
  navigator.share({
    title: title as string,
    text: description as string,
    url: webUrl as string,
  })
}

interface SharingParams {
  title?: string | null
  description?: string | null
  image?: string | null
  webUrl?: string | null
  appUrl: string
}

function shareFunctionByEnv(params: SharingParams, isPublic?: boolean) {
  const { title, description, image, webUrl, appUrl } = params

  if (isPublic) {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigatorShare({ title, description, webUrl })
    } else {
      copyUrlToClipboard()
    }
  } else {
    shareLink({
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
}

export default async function share(
  { path }: UrlElements,
  { isPublic }: ContextOptions,
) {
  if (path === '/web-action/share') {
    const params = getSharingParams()

    shareFunctionByEnv(params, isPublic)

    return true
  }

  return false
}
