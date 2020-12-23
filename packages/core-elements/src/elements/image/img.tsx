import React from 'react'
import styled from 'styled-components'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'
import { useIntersection } from './use-intersction'

// TODO: root path는 .env에서 가져오게 하는게 좋을까?
const root = 'https://media.triple.guide/triple-cms'

// TODO: 트리플에 맞는 size정의 필요
const deviceSizes = [640, 768, 1024, 1080, 1280]

const Img = styled.img<{
  borderRadius: number
  dimmed?: boolean
  absolute: boolean
}>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  object-fit: cover;
  opacity: ${({ dimmed }) => (dimmed ? 80 : 100)}%;

  ${({ absolute }) =>
    absolute &&
    `
    position: absolute;
    top: 0;
  `}
`

export default function ImageImg(
  props: Omit<
    Parameters<typeof Img>[0],
    | 'borderRadius'
    | 'dimmed'
    | 'fitHeight'
    | 'quality'
    | 'priority'
    | 'unoptimized'
    | 'ref'
  >,
) {
  const {
    borderRadius,
    quality,
    priority,
    loading,
    unoptimized,
    overlayMounted,
  } = useImageState()
  const { src } = props

  const absolute = useContentAbsolute()

  const isLazy =
    !priority && (loading === 'lazy' || typeof loading === 'undefined')

  const [setRef, isIntersected] = useIntersection<HTMLImageElement>({
    rootMargin: '200px',
    disabled: !isLazy,
  })

  const isVisible = !isLazy || isIntersected

  const imgAttributes = isVisible
    ? unoptimized
      ? src
      : generateImgAttrs({
          src,
          quality,
        })
    : {
        // TODO: 트리플 서비스에 맞는 dummy 이미지로 처리 필요
        src:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      }

  return (
    <Img
      {...props}
      {...imgAttributes}
      borderRadius={borderRadius}
      dimmed={overlayMounted}
      absolute={absolute}
      decoding="async"
      ref={setRef}
    />
  )
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality,
}: {
  root: string
  src: string
  width?: number
  quality?: number
}): string {
  const matchedPath = src.match(
    /^https:\/\/(?:[^/]+\/)+[^/]*,?w_(\d+),?[^/]*\/([0-9a-z-]+.jpeg)$/,
  )
  const originalWidth = matchedPath ? matchedPath[1] : undefined
  const imageName = matchedPath ? matchedPath[2] : undefined

  const params = [
    'f_auto',
    'c_limit',
    'w_' + (width || originalWidth),
    'q_' + (quality || 'auto'),
  ]
  const paramsString = '/' + params.join(',')
  return `${root}${paramsString}${imageName as string}`
}

function generateImgAttrs({ src, quality }: { src: string; quality?: number }) {
  const widths = deviceSizes.sort((a, b) => a - b)
  const kind = 'w'
  const srcSet = widths
    .map(
      (w) =>
        `${cloudinaryLoader({ root, src, quality, width: w })} ${w}${kind}`,
    )
    .join(', ')

  return {
    src: cloudinaryLoader({ root, src, quality }),
    sizes: '100vw',
    srcSet,
  }
}
