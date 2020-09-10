import React from 'react'

import formatSourceURL from '../utils/format-source-url'

export type ImageSourceType = typeof ImageSource

export default function ImageSource({ sourceUrl }: { sourceUrl: string }) {
  return <>{formatSourceURL(sourceUrl)}</>
}
