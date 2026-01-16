import { ActionSheet, ActionSheetItem } from '@titicaca/tds-ui'
import { useHashRouter } from '@titicaca/triple-web'

import { useReviewSortingOptions } from './sorting-context'
import type { SortingOption } from './sorting-context'

export const HASH_SORTING_OPTIONS_ACTION_SHEET =
  'common.sort-options.review-action-sheet'

export function SortingOptionsActionSheet() {
  const { hasUriHash, removeUriHash } = useHashRouter()
  const { selectedOption, sortingOptions, handleOptionSelect } =
    useReviewSortingOptions()

  const handleSelect = (option: SortingOption) => {
    handleOptionSelect(option)

    removeUriHash()
  }

  return (
    <ActionSheet
      title="정렬"
      open={hasUriHash(HASH_SORTING_OPTIONS_ACTION_SHEET)}
      onClose={removeUriHash}
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
