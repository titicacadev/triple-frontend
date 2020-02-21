import React from 'react'

import { GlobalSizes, MEDIA_FRAME_OPTIONS } from '../../commons'

const MEDIA_CDN_URL_BASE = 'https://media.triple.guide'
const FORMATS = ['webm', 'mp4', 'ogv']

export default function Sources({
  src,
  srcType,
  cloudinaryBucket,
  cloudinaryId,
  frame,
}: {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  frame: GlobalSizes
}) {
  const matchData = (MEDIA_FRAME_OPTIONS[frame] || '').match(/^(\d+)%$/)

  if (!matchData) {
    return null
  }

  const [, heightOverWidthPercent] = matchData
  const widthOverHeight = 100 / parseInt(heightOverWidthPercent, 10)
  const manipulationParams = `c_fill,ar_${widthOverHeight},f_auto`

  if (!cloudinaryBucket || !cloudinaryId) {
    return <source src={src} type={srcType} />
  }

  return (
    <>
      {FORMATS.map((format) => (
        <source
          key={format}
          src={`${MEDIA_CDN_URL_BASE}/${cloudinaryBucket}/video/upload/${manipulationParams}/${cloudinaryId}.${format}`}
        />
      ))}
    </>
  )
}
