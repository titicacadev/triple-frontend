import styled from 'styled-components'
import { FlexBox, Label } from '@titicaca/core-elements'

import { useReviewSortingOptions } from './sorting-context'

const OptionsContainer = styled(FlexBox)`
  padding: 0;

  div:not(:first-child) {
    margin-left: 12px;
  }

  span {
    font-weight: bold;
  }
`

export function SortingOptions() {
  const { selectedOption, sortingOptions, handleOptionSelect } =
    useReviewSortingOptions()

  return (
    <OptionsContainer
      flex
      css={{
        alignItems: 'center',
      }}
    >
      {sortingOptions.map(({ key, text }) => (
        <Label key={key} radio selected={selectedOption === key}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span onClick={() => handleOptionSelect(key)}>{text}</span>
        </Label>
      ))}
    </OptionsContainer>
  )
}
