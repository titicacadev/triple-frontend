import { generateUrl, parseUrl, UrlElements } from '@titicaca/view-utilities'

import { createShareUrl } from './factories'

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

export default async function share({ path }: UrlElements) {
  if (path === '/web-action/share') {
    const params = getSharingParams()
    const shareUrl = createShareUrl()

    shareUrl({ params, message: ALERT_MESSAGE })

    return true
  }

  return false
}
