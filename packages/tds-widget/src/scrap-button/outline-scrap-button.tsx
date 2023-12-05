import { Attributes, ComponentType } from 'react'
import styled from 'styled-components'

import { createIsolatedClickHandler } from './utils'
import type { ScrapButtonProps, ScrapIconProps } from './types'
import { withMask } from './scrap-button-mask'
import { useScraped } from './hooks'

const OUTLINE_HEART_ON =
  'https://assets.triple.guide/images/btn-content-scrap-list-on@2x.png'
const OUTLINE_HEART_OFF =
  'https://assets.triple.guide/images/btn-content-scrap-list-off@2x.png'

const ScrapingButton = styled.button<{ size: number }>`
  display: block;
  outline: none;

  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
`

function OutlineScrapButton({
  resource,
  size = 34,
  onScrape,
  onUnscrape,
}: ScrapButtonProps) {
  const [actualScraped, setScraped] = useScraped({
    resource,
    onScrape,
    onUnscrape,
  })

  return (
    <ScrapingButton
      size={size}
      onClick={createIsolatedClickHandler(setScraped)}
    >
      <OutlineHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function OutlineHeart({ pressed, size }: ScrapIconProps) {
  return (
    <img
      src={pressed ? OUTLINE_HEART_ON : OUTLINE_HEART_OFF}
      width={size}
      height={size}
      alt={pressed ? 'OUTLINE_HEART_ON' : 'OUTLINE_HEART_OFF'}
    />
  )
}

function composedHocs<P>(Component: ComponentType<P & Attributes>) {
  return withMask(Component)
}

export const ComposedOutlineScrapButton = composedHocs(OutlineScrapButton)
