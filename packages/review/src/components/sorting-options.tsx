import { useCallback } from 'react'
import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'

import { useReviewSortingOptions } from './sorting-context'
import {
  SortingOptionsActionSheet,
  HASH_SORTING_OPTIONS_ACTION_SHEET,
} from './sorting-options-action-sheet'

const SortingOption = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
`
const ArrowIcon = styled.div`
  width: 12px;
  height: 12px;
  background-image: url('https://assets.triple.guide/images/ico_arrow_down_12@3x.png');
  background-size: 12px 12px;
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
      <SortingOption onClick={handleActionSheetOpen}>
        <Text size={14} color="gray">
          {text}
        </Text>

        <ArrowIcon />
      </SortingOption>

      <SortingOptionsActionSheet />
    </>
  )
}
