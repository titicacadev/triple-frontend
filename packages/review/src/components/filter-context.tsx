import {
  PropsWithChildren,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { useEventTrackingContext } from '@titicaca/react-contexts'

interface FilterValues {
  isRecentTrip: boolean
  handleRecentTripChange: () => void
}

interface FilterProps {
  initialRecentTripFilter?: boolean
}

const FilterContext = createContext<FilterValues | undefined>(undefined)

export function FilterProvider({
  initialRecentTripFilter = false,
  children,
}: PropsWithChildren<FilterProps>) {
  const [isRecentTrip, setIsRecentTrip] = useState(initialRecentTripFilter)

  const { trackEvent } = useEventTrackingContext()

  const handleRecentTripChange = useCallback(() => {
    setIsRecentTrip((prevState) => !prevState)

    const action = isRecentTrip ? '리뷰_최근여행_해제' : '리뷰_최근여행_선택'

    trackEvent({
      ga: [action],
      fa: {
        action,
      },
    })
  }, [isRecentTrip, trackEvent])

  const values = useMemo(
    () => ({
      isRecentTrip,
      handleRecentTripChange,
    }),
    [isRecentTrip, handleRecentTripChange],
  )

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  )
}

export function useReviewFilters() {
  const context = useContext(FilterContext)

  if (context === undefined) {
    throw new Error('FilterProvider is not mount.')
  }

  return context
}
