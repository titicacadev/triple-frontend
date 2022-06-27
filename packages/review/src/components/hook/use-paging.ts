import { useEffect, useState, useCallback, useMemo } from 'react'
import { useQueries } from 'react-query'

import { ResourceType, ReviewData } from '../types'
import graphqlRequest from '../../data/graphql/request'
import {
  GetLatestReviewsDocument,
  GetPopularReviewsDocument,
} from '../../data/graphql/graphql'

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
  const latestReview = useMemo(
    () => sortingOption === 'latest',
    [sortingOption],
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [endOfList, setEndOfList] = useState(false)
  const [reviews, setReviews] = useState<ReviewData[]>([])

  const [
    {
      error: latestReviewsError,
      status: latestReviewsStatus,
      data: latestReviewsData,
    },
    {
      error: popularReviewsError,
      status: popularReviewsStatus,
      data: popularReviewsData,
    },
  ] = useQueries([
    {
      queryKey: 'getLatestReviews',
      queryFn: graphqlRequest({
        query: GetLatestReviewsDocument,
        variables: {
          resourceType,
          resourceId,
          from: (currentPage - 1) * perPage,
          size: perPage,
        },
      }),
    },
    {
      queryKey: 'getPopularReviews',
      queryFn: graphqlRequest({
        query: GetPopularReviewsDocument,
        variables: {
          resourceType,
          resourceId,
          from: (currentPage - 1) * perPage,
          size: perPage,
        },
      }),
    },
  ])

  const loaded = useMemo(
    () =>
      (latestReview ? latestReviewsStatus : popularReviewsStatus) === 'success',
    [latestReview],
  )

  const reviewsData = useMemo(
    () =>
      (sortingOption === 'latest' && loaded
        ? latestReviewsData?.getLatestReviews
        : popularReviewsData?.getPopularReviews) || [],
    [
      sortingOption,
      loaded,
      latestReviewsData?.getLatestReviews,
      popularReviewsData?.getPopularReviews,
    ],
  )

  const fetchNext = useCallback(
    () => !endOfList && loaded && setCurrentPage(currentPage + 1),
    [setCurrentPage, endOfList, loaded, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
    setReviews(reviewsData)
  }, [latestReview, resourceId, perPage, reviewsData])

  useEffect(() => {
    const error = latestReview ? latestReviewsError : popularReviewsError

    if (!error && loaded) {
      if (reviewsData && reviewsData.length > 0) {
        setReviews((currentReviews) => [...currentReviews, ...reviewsData])
      } else {
        setEndOfList(true)
      }
    }
  }, [reviewsData, latestReview, loaded, setReviews])

  return { reviews, fetchNext, endOfList }
}
