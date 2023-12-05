import { Attributes, ComponentType } from 'react'
import styled from 'styled-components'

import { useScraped } from './hooks'
import type { ScrapButtonProps, ScrapIconProps } from './types'
import { createIsolatedClickHandler } from './utils'
import { withMask } from './scrap-button-mask'

const OVERLAY_HEART_ON =
  'https://assets.triple.guide/images/btn-content-scrap-overlay-on@3x.png'
const OVERLAY_HEART_OFF =
  'https://assets.triple.guide/images/btn-content-scrap-overlay-off@3x.png'

const ScrapingButton = styled.button<{ size: number }>`
  display: block;
  outline: none;

  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
`

function OverlayScrapButton({ resource, size = 36 }: ScrapButtonProps) {
  const [actualScraped, setScraped] = useScraped({
    resource,
  })

  return (
    <ScrapingButton
      size={size}
      onClick={createIsolatedClickHandler(setScraped)}
    >
      <OverlayHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function OverlayHeart({ pressed, size }: ScrapIconProps) {
  return (
    <img
      src={pressed ? OVERLAY_HEART_ON : OVERLAY_HEART_OFF}
      width={size}
      height={size}
      alt={pressed ? 'OVERLAY_HEART_ON' : 'OVERLAY_HEART_OFF'}
    />
  )
}

function composedHocs<P>(Component: ComponentType<P & Attributes>) {
  return withMask(Component)
}

export const ComposedOverlayScrapButton = composedHocs(OverlayScrapButton)
