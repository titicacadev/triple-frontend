import { t } from 'i18next'

export default function formatSourceUrl(url: string) {
  const httpsSchemeRemovedUrl = url.replace(/^https?:\/\//, '')
  return t('출처 {{httpsSchemeRemovedUrl}}', {
    ns: 'triple-frontend',
    httpsSchemeRemovedUrl,
  })
}
