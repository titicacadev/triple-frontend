import styled, { css } from 'styled-components'
import { List } from '@titicaca/kint5-core-elements'

import { useReviewSortingOptions } from './sorting-context'

const OptionButton = styled.button<{ isSelected: boolean }>`
  font-size: 14px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 6px;
  padding-left: 10px;

  ${({ isSelected }) =>
    isSelected
      ? css`
          font-weight: 700;
          color: var(--color-kint5-brand1);
          background-image: url('https://assets.triple-dev.titicaca-corp.com/images/kint5-ellipse-756.svg');
        `
      : css`
          font-weight: 400;
          color: var(--color-kint5-gray60);
          background-image: url('https://assets.triple-dev.titicaca-corp.com/images/kint5-ellipse-757.svg');
        `}
`

export function SortingOptions() {
  const { selectedOption, sortingOptions, handleOptionSelect } =
    useReviewSortingOptions()

  return (
    <List
      css={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}
    >
      {sortingOptions.map(({ key, text }) => (
        <List.Item key={key}>
          <OptionButton
            isSelected={key === selectedOption}
            onClick={() => handleOptionSelect(key)}
          >
            {text}
          </OptionButton>
        </List.Item>
      ))}
    </List>
  )
}
