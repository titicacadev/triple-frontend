import React from 'react'
import styled from 'styled-components'
import { Label } from '@titicaca/core-elements'

export const ORDER_BY_RECOMMENDATION = ''
export const ORDER_BY_RECENCY = 'latest'

const SORTING_OPTIONS = [
  { key: ORDER_BY_RECOMMENDATION, text: '추천순' },
  { key: ORDER_BY_RECENCY, text: '최신순' },
]

const OptionsContainer = styled.div`
  float: right;
  margin: 0;
  padding: 0;

  div:not(:first-child) {
    margin-left: 12px;
  }
`

export default function SortingOptions({
  onSelect,
  selected,
}: {
  onSelect: (e: React.SyntheticEvent, key: string) => any
  selected: string
}) {
  return (
    <OptionsContainer>
      {SORTING_OPTIONS.map(({ key, text }) => (
        <Label key={key} radio selected={selected === key}>
          <span onClick={onSelect && ((e) => onSelect(e, key))}>{text}</span>
        </Label>
      ))}
    </OptionsContainer>
  )
}

export const DEFAULT_SORTING_OPTION = ORDER_BY_RECOMMENDATION
