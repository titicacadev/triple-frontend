import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { createShareUrl } from './services/share'
import { WebActionParams } from './types'

export default async function share({
  url: { path } = {},
  t,
}: WebActionParams) {
  if (path === '/web-action/share') {
    const params = getSharingParams()
    const shareUrl = createShareUrl()

    shareUrl({
      params,
      message: t('링크를 복사했습니다.'),
      webButtonTitle: t('웹에서 보기'),
      appButtonTitle: t('트리플에서 보기'),
    })

    return true
  }

  return false
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

function getMetadata({ property }: { property: string }) {
  return document
    .querySelector(`meta[property='${property}']`)
    ?.getAttribute('content')
}
