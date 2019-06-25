import * as React from 'react'
import styled from 'styled-components'

const CompactScrapButton = styled.div<{
  top?: number
  right?: number
  pressed?: boolean
}>`
  position: absolute;
  top: ${({ top }) => top || 0}px;
  right: ${({ right }) => right || 0}px;
  width: 34px;
  height: 34px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-list-on@2x.png' : 'btn-content-scrap-list-off@2x.png')});
  background-size: 34px 34px;
`

const RegularScrapButton = styled.div<{
  top?: number
  right?: number
  pressed?: boolean
}>`
  position: absolute;
  top: ${({ top }) => (top === 0 ? 0 : top || 3)}px;
  right: ${({ right }) => (right === 0 ? 0 : right || 3)}px;
  width: 36px;
  height: 36px;
  background-image: url(https://assets.triple.guide/images/${({ pressed }) => (pressed ? 'btn-content-scrap-overlay-on@2x.png' : 'btn-content-scrap-overlay-off@2x.png')});
  background-size: 36px 36px;
`

export default function ScrapButton({
  compact,
  resource,
  scraped,
  onScrapedChange,
  top,
  right,
  ...props
}: {
  compact?: boolean
  resource?: any
  scraped?: boolean
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  top?: number
  right?: number
  pressed?: boolean
}) {
  const ButtonElement = compact ? CompactScrapButton : RegularScrapButton
  const handleClick =
    onScrapedChange &&
    ((e) => {
      e.stopPropagation()
      onScrapedChange(e, { ...resource, scraped: !scraped })
    })

  return <ButtonElement pressed={scraped} onClick={handleClick} {...props} />
}
