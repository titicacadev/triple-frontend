import { useCallback } from 'react'
import { styled } from 'styled-components'
import { Text } from '@titicaca/tds-ui'
import { useHashRouter } from '@titicaca/triple-web'

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
  const { addUriHash } = useHashRouter()

  const { text } =
    sortingOptions.find(({ key }) => key === selectedOption) || {}

  const handleActionSheetOpen = useCallback(() => {
    addUriHash(HASH_SORTING_OPTIONS_ACTION_SHEET)
  }, [addUriHash])

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
