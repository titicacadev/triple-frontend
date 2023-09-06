import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTranslation } from '@titicaca/next-i18next'

import { useReviewFilters } from './filter-context'

export type SortingOption = '' | 'latest'

interface SortingOptionsProps {
  resourceId: string
  initialSortingOption?: SortingOption
}

interface SortingOptionsValues {
  sortingOption: SortingOption
  sortingOptions: { key: SortingOption; text: string }[]
  handleSortingOptionSelect: (sortingOption: SortingOption) => void
}

const SortingOptionsContext = createContext<SortingOptionsValues | undefined>(
  undefined,
)

export function SortingOptionsProvider({
  resourceId,
  initialSortingOption = '',
  children,
}: PropsWithChildren<SortingOptionsProps>) {
  const [sortingOption, setSortingOption] = useState(initialSortingOption)

  const { t } = useTranslation('common-web')
  const { trackEvent } = useEventTrackingContext()
  const { isRecentTrip } = useReviewFilters()

  const sortingOptions = useMemo(
    () => [
      { key: '' as const, text: t(['cuceonsun', '추천순']) },
      { key: 'latest' as const, text: t(['coesinsun', '최신순']) },
    ],
    [t],
  )

  const handleSortingOptionSelect = useCallback(
    (sortingOption: SortingOption) => {
      const eventLabel = sortingOption === 'latest' ? '최신순' : '추천순'

      trackEvent({
        ga: ['리뷰_리뷰정렬', eventLabel],
        fa: {
          action: '리뷰_리뷰정렬',
          sort_order: eventLabel,
          item_id: resourceId,
          ...(isRecentTrip && { filter_name: '최근여행' }),
        },
      })

      setSortingOption(sortingOption)
    },
    [isRecentTrip, resourceId, trackEvent],
  )

  const values = useMemo(
    () => ({
      sortingOption,
      sortingOptions,
      handleSortingOptionSelect,
    }),
    [sortingOption, sortingOptions, handleSortingOptionSelect],
  )

  return (
    <SortingOptionsContext.Provider value={values}>
      {children}
    </SortingOptionsContext.Provider>
  )
}

export function useReviewSortingOptions() {
  const context = useContext(SortingOptionsContext)

  if (context === undefined) {
    throw new Error('SortingOptionsProvider is not mount.')
  }

  return context
}
