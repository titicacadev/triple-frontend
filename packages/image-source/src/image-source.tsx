import formatSourceUrl from './format-source-url'

export interface ImageSourceProps {
  sourceUrl?: string
}

export function ImageSource({ sourceUrl }: ImageSourceProps) {
  if (!sourceUrl) {
    return null
  }

  return <>{formatSourceUrl(sourceUrl)}</>
}
