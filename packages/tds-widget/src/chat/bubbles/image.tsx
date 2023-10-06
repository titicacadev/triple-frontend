import React from 'react'
import styled, { css } from 'styled-components'

import { MetaDataInterface } from '../types'
import { generatePreviewImage } from '../utils'

const PreviewImage = styled.img<{ isRichBubble: boolean }>`
  ${({ isRichBubble }) =>
    isRichBubble
      ? css`
          width: 100%;
          margin-top: 14px;
        `
      : css`
          border-radius: 10px;
        `}
`

export function ImageBubble({
  imageInfos,
  isRichBubble = false,
  cloudinaryName,
  mediaUrlBase,
  onClick,
}: {
  imageInfos: MetaDataInterface[]
  isRichBubble?: boolean
  cloudinaryName: string
  mediaUrlBase: string
  onClick?: (imageInfos: MetaDataInterface[]) => void
}) {
  if (imageInfos.length === 0) {
    return null
  }

  const imageUrl = generatePreviewImage({
    imageInfo: imageInfos[0],
    cloudinaryName,
    mediaUrlBase,
  })

  return (
    <PreviewImage
      src={imageUrl}
      isRichBubble={isRichBubble}
      onClick={() => {
        onClick?.(imageInfos)
      }}
    />
  )
}
