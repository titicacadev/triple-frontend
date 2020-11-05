import { useEffect, useState, useCallback } from 'react'
import humps from 'humps'
import qs from 'qs'
import { useFetch } from '@titicaca/react-hooks'
import { generateUrl } from '@titicaca/view-utilities'

import { ResourceType, ReviewData } from './types'

const OPTIONS = { credentials: 'same-origin' }

export default function usePaging({
  sortingOption,
  resourceId,
  resourceType,
  perPage,
}: {
  sortingOption?: string
  resourceId: string
  resourceType: ResourceType
  perPage: number
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [endOfList, setEndOfList] = useState(false)
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const { error, loading, data } = useFetch(
    generateUrl({
      path: `/api/reviews/v2${sortingOption ? `/${sortingOption}` : ''}`,
      query: qs.stringify({
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: resourceId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_type: resourceType,
        from: (currentPage - 1) * perPage,
        size: perPage,
      }),
    }),
    OPTIONS,
  )
  const fetchNext = useCallback(
    () => !endOfList && !loading && setCurrentPage(currentPage + 1),
    [setCurrentPage, endOfList, loading, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
    setReviews([])
  }, [sortingOption, resourceId, perPage])

  useEffect(() => {
    if (!error && !loading && data) {
      if (data.reviews.length > 0) {
        setReviews((currentReviews) => [
          ...currentReviews,
          ...(humps.camelizeKeys(data.reviews) as ReviewData[]),
        ])
      } else {
        setEndOfList(true)
      }
    }
  }, [error, loading, data, setReviews])

  return { loading, reviews, fetchNext, endOfList }
}
