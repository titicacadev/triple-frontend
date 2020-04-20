import React from 'react'
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
          ? 'btn-content-scrap-overlay-on@2x.png'
          : 'btn-content-scrap-overlay-off@2x.png'
      }");
    `}
`

export default function ScrapButton({
  scraped,
  onScrapedChange,
}: {
  scraped: boolean
  onScrapedChange: (scraped: boolean) => void
}) {
  return (
    <Button
      isActive={scraped}
      onClick={(e) => {
        e.stopPropagation()
        onScrapedChange(!scraped)
      }}
    />
  )
}
