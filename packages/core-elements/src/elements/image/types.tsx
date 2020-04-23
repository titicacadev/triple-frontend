import React from 'react'

import { MarginPadding } from '../../commons'
import { ImageFrameBaseProps } from './image-frame-base'

/**
 * @deprecated children: string
 */
// TODO: 두번째 타입 없애기
export type ImageSourceType =
  | React.ComponentType<{ sourceUrl: string }>
  | ((props: { children: string }) => any)

export type OverlayType = 'gradient' | 'dark'

export type ImageProps = ImageFrameBaseProps & {
  onClick?: (e: React.SyntheticEvent) => void
  ImageSource?: ImageSourceType
  sourceUrl?: string
  overlay?: React.ReactNode
  overlayPadding?: MarginPadding
  overlayType?: OverlayType
  withLinkIndicator?: boolean
  alt?: string
}
