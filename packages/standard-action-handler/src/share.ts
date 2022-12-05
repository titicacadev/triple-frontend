import { getTranslation } from '@titicaca/next-i18next'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { createShareUrl } from './services/share'
import { WebActionParams } from './types'

export default async function share({ url: { path } = {} }: WebActionParams) {
  if (path === '/web-action/share') {
    const t = getTranslation('common-web')
    const params = getSharingParams()
    const shareUrl = createShareUrl()

    shareUrl({ params, message: t('ringkeureul-bogsahaessseubnida.') })

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
