import React, { useCallback } from 'react'
import styled, { StyledComponentProps } from 'styled-components'
import { useScrapsContext } from '@titicaca/react-contexts'

interface ScrapButtonBaseProps {
  top?: number
  right?: number
  pressed?: boolean
}

type ScrapableResource = {
  id: string
  type: string
  scraped?: boolean
}

export type ScrapButtonProps<R extends ScrapableResource> = Omit<
  StyledComponentProps<'div', any, ScrapButtonBaseProps, never>,
  'resource'
> & {
  resource: R

  compact?: boolean
}

const CompactScrapButton = styled.div<ScrapButtonBaseProps>`
  position: absolute;
  top: ${({ top }) => top || 0}px;
  right: ${({ right }) => right || 0}px;
  width: 34px;
  height: 34px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-list-on@2x.png' : 'btn-content-scrap-list-off@2x.png')});
  background-size: 34px 34px;
`

const RegularScrapButton = styled.div<ScrapButtonBaseProps>`
  position: absolute;
  top: ${({ top }) => (top === 0 ? 0 : top || 3)}px;
  right: ${({ right }) => (right === 0 ? 0 : right || 3)}px;
  width: 36px;
  height: 36px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-overlay-on@3x.png' : 'btn-content-scrap-overlay-off@3x.png')});
  background-size: 36px 36px;
`

export default function ScrapButton<R extends ScrapableResource>({
  compact,
  resource: { id, type, scraped },
  top,
  right,
  ...props
}: ScrapButtonProps<R>) {
  const ButtonElement = compact ? CompactScrapButton : RegularScrapButton
  const { scrape, unscrape, deriveCurrentStateAndCount } = useScrapsContext()
  const { scraped: actualScraped } = deriveCurrentStateAndCount({ id, scraped })

  const handleClick = useCallback(() => {
    actualScraped ? unscrape({ id, type }) : scrape({ id, type })
  }, [scrape, unscrape, actualScraped, id, type])

  return (
    <ButtonElement
      pressed={actualScraped}
      onClick={handleClick}
      top={top}
      right={right}
      {...props}
    />
  )
}
