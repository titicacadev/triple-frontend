import { getTranslation } from '@titicaca/next-i18next'

export default function formatSourceUrl(url: string) {
  const t = getTranslation('common-web')

  const httpsSchemeRemovedUrl = url.replace(/^https?:\/\//, '')
  return t('culceo-httpsschemeremovedurl', { httpsSchemeRemovedUrl })
}
