import { useScrapsContext } from '@titicaca/react-contexts'
import React, { useCallback } from 'react'
import styled from 'styled-components'

const Button = styled.button<{ isActive: boolean }>`
  display: block;
  margin: 0;
  width: 30px;
  height: 30px;
  border: 0;
  padding: 0;
  background-color: transparent;
  background-size: 30px 30px;
  appearance: none;
  outline: none;

  ${({ isActive }) =>
    `
      background-image: url("https://assets.triple.guide/images/${
        isActive
          ? 'btn-content-scrap-overlay-on@3x.png'
          : 'btn-content-scrap-overlay-off@3x.png'
      }");
    `}
`

export default function ScrapButton({
  resource: { id, type, scraped },
}: {
  resource: { id: string; type: string; scraped?: boolean }
}) {
  const { scrape, unscrape, deriveCurrentStateAndCount } = useScrapsContext()
  const { scraped: actualScraped } = deriveCurrentStateAndCount({
    id,
    scraped,
  })

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()

      actualScraped ? unscrape({ id, type }) : scrape({ id, type })
    },
    [actualScraped, unscrape, id, type, scrape],
  )
  return <Button isActive={actualScraped} onClick={handleClick} />
}
