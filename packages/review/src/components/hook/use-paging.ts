import { useEffect, useState, useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'

import { ResourceType, ReviewData } from '../types'
import graphqlRequest from '../../data/graphql/request'
import { GetLatestReviewsDocument } from '../../data/graphql/graphql'

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
  const { error, status, data } = useQuery(
    'getLatestReviews',
    graphqlRequest({
      query: GetLatestReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        from: (currentPage - 1) * perPage,
        size: perPage,
      },
    }),
  )
  const loaded = useMemo(() => status === 'success', [status])

  const fetchNext = useCallback(
    () => !endOfList && loaded && setCurrentPage(currentPage + 1),
    [setCurrentPage, endOfList, loaded, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
    setReviews([])
  }, [sortingOption, resourceId, perPage])

  useEffect(() => {
    if (!error && loaded && data) {
      if (data.getLatestReviews.length > 0) {
        setReviews((currentReviews) => [
          ...currentReviews,
          ...data.getLatestReviews,
        ])
      } else {
        setEndOfList(true)
      }
    }
  }, [error, loaded, data, setReviews])

  return { reviews, fetchNext, endOfList }
}
