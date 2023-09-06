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

export type SortingOption =
  | 'recommendation'
  | 'latest'
  | 'reviews-rating-desc'
  | 'reviews-rating-asc'

export type SortingType = 'default' | 'poi'

interface SortingOptionsProps {
  type?: SortingType
  resourceId: string
}

interface SortingOptionsValues {
  selectedOption: SortingOption
  sortingOptions: { key: SortingOption; text: string }[]
  handleOptionSelect: (option: SortingOption) => void
}

const SortingOptionsContext = createContext<SortingOptionsValues | undefined>(
  undefined,
)

export function SortingOptionsProvider({
  type = 'default',
  resourceId,
  children,
}: PropsWithChildren<SortingOptionsProps>) {
  const [selectedOption, setSelectedOption] =
    useState<SortingOption>('recommendation')

  const { t } = useTranslation('common-web')
  const { trackEvent } = useEventTrackingContext()
  const { isRecentTrip } = useReviewFilters()

  const defaultOptions = [
    { key: 'recommendation' as const, text: t(['cuceonsun', '추천순']) },
    { key: 'latest' as const, text: t(['coesinsun', '최신순']) },
  ]

  const poiOptions = [
    ...defaultOptions,
    { key: 'reviews-rating-desc' as const, text: '리뷰 높은순' },
    { key: 'reviews-rating-asc' as const, text: '리뷰 낮은순' },
  ]

  const sortingOptions = type === 'default' ? defaultOptions : poiOptions

  const handleOptionSelect = useCallback(
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

      setSelectedOption(sortingOption)
    },
    [isRecentTrip, resourceId, trackEvent],
  )

  const values = useMemo(
    () => ({
      selectedOption,
      sortingOptions,
      handleOptionSelect,
    }),
    [selectedOption, sortingOptions, handleOptionSelect],
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
