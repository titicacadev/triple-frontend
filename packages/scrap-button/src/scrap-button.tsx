import {
  useScrapsContext,
  withScrapsContextGuard,
} from '@titicaca/react-contexts'
import React, { ComponentType, MouseEventHandler } from 'react'
import styled from 'styled-components'

import { withMask } from './scrap-button-mask'

type ScrapableResource = {
  id: string
  type: string
  scraped?: boolean
}

const ScrapingButton = styled.button<{ size: number }>`
  display: block;
  margin: 0;
  border: 0;
  padding: 0;
  background-color: transparent;
  appearance: none;
  outline: none;

  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
`

interface ScrapIconProps {
  pressed: boolean
  size: number
}

const OUTLINE_HEART_ON =
  'https://assets.triple.guide/images/btn-content-scrap-list-on@2x.png'
const OUTLINE_HEART_OFF =
  'https://assets.triple.guide/images/btn-content-scrap-list-off@2x.png'

function OutlineHeart({ pressed, size }: ScrapIconProps) {
  return (
    <img
      src={pressed ? OUTLINE_HEART_ON : OUTLINE_HEART_OFF}
      width={size}
      height={size}
    />
  )
}

const OVERLAY_HEART_ON =
  'https://assets.triple.guide/images/btn-content-scrap-overlay-on@3x.png'
const OVERLAY_HEART_OFF =
  'https://assets.triple.guide/images/btn-content-scrap-overlay-off@3x.png'

function OverlayHeart({ pressed, size }: ScrapIconProps) {
  return (
    <img
      src={pressed ? OVERLAY_HEART_ON : OVERLAY_HEART_OFF}
      width={size}
      height={size}
    />
  )
}

function useScrapButtonLogic<R extends ScrapableResource>({
  id,
  type,
  scraped,
}: R): {
  scraped: boolean
  onButtonClick: MouseEventHandler<HTMLButtonElement>
} {
  const { scrape, unscrape, deriveCurrentStateAndCount } = useScrapsContext()

  const { scraped: actualScraped } = deriveCurrentStateAndCount({ id, scraped })

  return {
    scraped: actualScraped,
    onButtonClick: (e) => {
      e.stopPropagation()
      e.preventDefault()

      actualScraped ? unscrape({ id, type }) : scrape({ id, type })
    },
  }
}

interface ScrapButtonProps<R extends ScrapableResource> {
  resource: R
  size?: number
}

function OutlineScrapButton<R extends ScrapableResource>({
  resource,
  size = 34,
}: ScrapButtonProps<R>) {
  const { scraped: actualScraped, onButtonClick } = useScrapButtonLogic(
    resource,
  )

  return (
    <ScrapingButton size={size} onClick={onButtonClick} role="button">
      <OutlineHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function OverlayScrapButton<R extends ScrapableResource>({
  resource,
  size = 36,
}: ScrapButtonProps<R>) {
  const { scraped: actualScraped, onButtonClick } = useScrapButtonLogic(
    resource,
  )

  return (
    <ScrapingButton size={size} onClick={onButtonClick} role="button">
      <OverlayHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function RegularScrapButton<R extends ScrapableResource>({
  resource,
}: {
  resource: R
}) {
  const { scraped: actualScraped, onButtonClick } = useScrapButtonLogic(
    resource,
  )
  const size = 36

  return (
    <ScrapingButton size={size} onClick={onButtonClick}>
      <OverlayHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function CompactScrapButton<R extends ScrapableResource>({
  resource,
}: {
  resource: R
}) {
  const { scraped: actualScraped, onButtonClick } = useScrapButtonLogic(
    resource,
  )
  const size = 34

  return (
    <ScrapingButton size={size} onClick={onButtonClick}>
      <OutlineHeart pressed={actualScraped} size={size} />
    </ScrapingButton>
  )
}

function composedHOCs<P>(Component: ComponentType<P>) {
  return withMask(withScrapsContextGuard(Component))
}

const ComposedOutlineScrapButton = composedHOCs(OutlineScrapButton)
const ComposedOverlayScrapButton = composedHOCs(OverlayScrapButton)
/**
 * @deprecated - size를 자유롭게 조절할 수 있는 OverlayScrapButton을 사용하세요.
 */
const ComposedRegularScrapButton = composedHOCs(RegularScrapButton)
/**
 * @deprecated - size를 자유롭게 조절할 수 있는 OutlineScrapButton을 사용하세요.
 */
const ComposedCompactScrapButton = composedHOCs(CompactScrapButton)

export {
  ComposedOutlineScrapButton as OutlineScrapButton,
  ComposedOverlayScrapButton as OverlayScrapButton,
  ComposedRegularScrapButton as RegularScrapButton,
  ComposedCompactScrapButton as CompactScrapButton,
}
