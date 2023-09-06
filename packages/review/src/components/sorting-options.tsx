import { useCallback } from 'react'
import styled from 'styled-components'
import { FlexBox, Text } from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'

import { useReviewSortingOptions } from './sorting-context'
import {
  SortingOptionsActionSheet,
  HASH_SORTING_OPTIONS_ACTION_SHEET,
} from './sorting-options-action-sheet'

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
  const { selectedOption, sortingOptions } = useReviewSortingOptions()
  const { push } = useHistoryFunctions()

  const { text } =
    sortingOptions.find(({ key }) => key === selectedOption) || {}

  const handleActionSheetOpen = useCallback(() => {
    push(HASH_SORTING_OPTIONS_ACTION_SHEET)
  }, [push])

  return (
    <>
      <OptionsContainer
        flex
        css={{
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleActionSheetOpen}
      >
        <Text size={14} color="gray">
          {text}
        </Text>
      </OptionsContainer>

      <SortingOptionsActionSheet />
    </>
  )
}
