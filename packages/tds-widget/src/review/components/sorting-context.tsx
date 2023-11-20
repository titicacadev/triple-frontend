import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTranslation } from 'react-i18next'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import { useReviewFilters } from './filter-context'

export type SortingOption =
  | 'recommendation'
  | 'latest'
  | 'star-rating-desc'
  | 'star-rating-asc'

export type SortingType = 'default' | 'poi'

const EVENT_TYPE = 'reviews-web/sorting-option-change'

interface SortingOptionsProps {
  type?: SortingType
  receiverId?: string
  resourceId: string
  initialSortingOption?: SortingOption
}

interface SortingOptionsValues {
  selectedOption: SortingOption
  sortingOptions: { key: SortingOption; text: string }[]
  handleOptionSelect: (option: SortingOption) => void
}

const SortingOptionsContext = createContext<SortingOptionsValues | undefined>(
  undefined,
)

const OPTION_LABELS = {
  recommendation: '추천순',
  latest: '최신순',
  'star-rating-desc': '별점 높은순',
  'star-rating-asc': '별점 낮은순',
}

export function SortingOptionsProvider({
  type = 'default',
  receiverId,
  resourceId,
  initialSortingOption = 'recommendation',
  children,
}: PropsWithChildren<SortingOptionsProps>) {
  const [selectedOption, setSelectedOption] = useState(initialSortingOption)

  const { t } = useTranslation('triple-frontend')
  const { trackEvent } = useEventTrackingContext()
  const { isRecentTrip } = useReviewFilters()
  const { broadcastMessage, subscribe, unsubscribe } = useTripleClientActions()

  const defaultOptions = [
    { key: 'recommendation' as const, text: t(['cuceonsun', '추천순']) },
    { key: 'latest' as const, text: t(['coesinsun', '최신순']) },
  ]

  const poiOptions = [
    ...defaultOptions,
    {
      key: 'star-rating-desc' as const,
      text: t(['byeoljeom-nopeunsun', '별점 높은순']),
    },
    {
      key: 'star-rating-asc' as const,
      text: t(['byeoljeom-najeunsun', '별점 낮은순']),
    },
  ]

  const sortingOptions = type === 'default' ? defaultOptions : poiOptions

  const handleOptionSelect = useCallback(
    (sortingOption: SortingOption) => {
      const eventLabel = OPTION_LABELS[sortingOption]

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

  useEffect(() => {
    if (receiverId) {
      broadcastMessage &&
        broadcastMessage({
          receiverId,
          type: EVENT_TYPE,
          selectedSortingOption: selectedOption,
        })
    }
  }, [receiverId, selectedOption, broadcastMessage])

  useEffect(() => {
    const handleReceiveMessage = ({
      payload,
    }: {
      payload?: {
        type: string
        selectedSortingOption: SortingOption
      }
    }) => {
      if (!payload || payload.type !== EVENT_TYPE) {
        return
      }

      setSelectedOption(payload.selectedSortingOption)
    }

    subscribe && subscribe('receiveMessage', handleReceiveMessage)

    return () => {
      unsubscribe && unsubscribe('receiveMessage', handleReceiveMessage)
    }
  }, [subscribe, unsubscribe, setSelectedOption])

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
