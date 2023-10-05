import formatSourceUrl from '../../utils/format-source-url'

export type ImageSourceType = typeof ImageSource

export function ImageSource({ sourceUrl }: { sourceUrl?: string }) {
  if (!sourceUrl) {
    return null
  }

  return <>{formatSourceUrl(sourceUrl)}</>
}
