import formatSourceUrl from './format-source-url'

export type ImageSourceType = typeof ImageSource

export interface ImageSourceProps {
  sourceUrl?: string
}

export function ImageSource({ sourceUrl }: ImageSourceProps) {
  if (!sourceUrl) {
    return null
  }

  return <>{formatSourceUrl(sourceUrl)}</>
}
