import { TFunction } from '@jaehyeon48/next-i18next'

export default function formatSourceUrl({
  url,
  t,
}: {
  url: string
  t: TFunction
}) {
  const httpsSchemeRemovedUrl = url.replace(/^https?:\/\//, '')
  return t('culceo-httpsschemeremovedurl', { httpsSchemeRemovedUrl })
}
