import { useTranslation } from 'react-i18next'

export interface ImageSourceProps {
  sourceUrl?: string
}

export function ImageSource({ sourceUrl }: ImageSourceProps) {
  const { t } = useTranslation('triple-frontend')

  if (!sourceUrl) {
    return null
  }

  const httpsSchemeRemovedUrl = sourceUrl.replace(/^https?:\/\//, '')
  return <>{t('출처 {{httpsSchemeRemovedUrl}}', { httpsSchemeRemovedUrl })}</>
}
