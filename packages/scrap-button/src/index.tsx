import React, { FC, SyntheticEvent, useCallback } from 'react'
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
}

const CompactScrapButtonBase = styled.div<ScrapButtonBaseProps>`
  width: 34px;
  height: 34px;
  ${({ pressed }) =>
    pressed
      ? 'background-image: url("https://assets.triple.guide/images/btn-content-scrap-list-on@2x.png");'
      : 'background-image: url("https://assets.triple.guide/images/btn-content-scrap-list-off@2x.png");'}
  background-size: 34px 34px;
`

const RegularScrapButtonBase = styled.div<ScrapButtonBaseProps>`
  width: 36px;
  height: 36px;
  ${({ pressed }) =>
    pressed
      ? 'background-image: url("https://assets.triple.guide/images/btn-content-scrap-overlay-on@3x.png");'
      : 'background-image: url("https://assets.triple.guide/images/btn-content-scrap-overlay-off@3x.png");'}
  background-size: 36px 36px;
`

function scrapButtonComponent(Component: FC<ScrapButtonBaseProps>) {
  return function ScrapButton<R extends ScrapableResource>({
    resource: { id, type, scraped },
    top,
    right,
    ...props
  }: ScrapButtonProps<R>) {
    const { scrape, unscrape, deriveCurrentStateAndCount } = useScrapsContext()
    const { scraped: actualScraped } = deriveCurrentStateAndCount({
      id,
      scraped,
    })

    const handleClick = useCallback(
      (e: SyntheticEvent) => {
        e.preventDefault()
        e.stopPropagation()

        actualScraped ? unscrape({ id, type }) : scrape({ id, type })
      },
      [scrape, unscrape, actualScraped, id, type],
    )

    return (
      <Component
        pressed={actualScraped}
        onClick={handleClick}
        top={top}
        right={right}
        {...props}
      />
    )
  }
}

export const RegularScrapButton = scrapButtonComponent(RegularScrapButtonBase)
export const CompactScrapButton = scrapButtonComponent(CompactScrapButtonBase)
