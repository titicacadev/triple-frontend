import styled, { css } from 'styled-components'
import { EllipsisIcon, List } from '@titicaca/kint5-core-elements'

import { useReviewSortingOptions } from './sorting-context'

const OptionButton = styled.button<{ isSelected: boolean }>`
  font-size: 14px;

  ${({ isSelected }) =>
    isSelected
      ? css`
          font-weight: 700;
          color: var(--color-kint5-brand1);
        `
      : css`
          font-weight: 400;
          color: var(--color-kint5-gray60);
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
        <List.Item
          key={key}
          css={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <EllipsisIcon
            color={key === selectedOption ? '#7743EE' : '#747c86'}
          />
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
