import { useTranslation } from '@titicaca/triple-web'

export interface ImageSourceProps {
  sourceUrl?: string
}

export function ImageSource({ sourceUrl }: ImageSourceProps) {
  const t = useTranslation()

  if (!sourceUrl) {
    return null
  }

  const httpsSchemeRemovedUrl = sourceUrl.replace(/^https?:\/\//, '')

  return (
    <>
      {t('출처 {{httpsSchemeRemovedUrl}}', {
        httpsSchemeRemovedUrl,
      })}
    </>
  )
}
