import { useCallback } from 'react'
import styled from 'styled-components'
import { FlexBox, Text } from '@titicaca/tds-ui'
import { useHistoryFunctions } from '@titicaca/react-contexts'

import { useReviewSortingOptions } from './sorting-context'
import {
  SortingOptionsActionSheet,
  HASH_SORTING_OPTIONS_ACTION_SHEET,
} from './sorting-options-action-sheet'

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
      <FlexBox
        flex
        alignItems="center"
        gap="4px"
        css={{
          cursor: 'pointer',
        }}
        onClick={handleActionSheetOpen}
      >
        <Text size={14} color="gray">
          {text}
        </Text>

        <ArrowIcon />
      </FlexBox>

      <SortingOptionsActionSheet />
    </>
  )
}
