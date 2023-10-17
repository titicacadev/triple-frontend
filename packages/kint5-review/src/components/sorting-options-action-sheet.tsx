import { ActionSheet, ActionSheetItem } from '@titicaca/action-sheet'
import { useUriHash, useHistoryFunctions } from '@titicaca/react-contexts'

import { useReviewSortingOptions } from './sorting-context'
import type { SortingOption } from './sorting-context'

export const HASH_SORTING_OPTIONS_ACTION_SHEET =
  'common.sort-options.review-action-sheet'

export function SortingOptionsActionSheet() {
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()
  const { selectedOption, sortingOptions, handleOptionSelect } =
    useReviewSortingOptions()

  const handleSelect = (option: SortingOption) => {
    handleOptionSelect(option)

    back()
  }

  return (
    <ActionSheet
      title="정렬"
      open={uriHash === HASH_SORTING_OPTIONS_ACTION_SHEET}
      onClose={back}
    >
      {sortingOptions.map(({ key, text }, index) => (
        <ActionSheetItem
          key={index}
          checked={key === selectedOption}
          onClick={() => handleSelect(key)}
        >
          {text}
        </ActionSheetItem>
      ))}
    </ActionSheet>
  )
}
