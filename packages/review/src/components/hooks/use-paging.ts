import { useEffect, useState, useCallback, useMemo } from 'react'

import { ResourceType, ReviewData } from '../types'
import {
  GetLatestReviewsDocument,
  GetPopularReviewsDocument,
} from '../../data/generated/graphql'

import { useGraphqlQueries } from './'

export function usePaging({
  sortingOption,
  resourceId,
  resourceType,
  recentTrip,
  perPage,
}: {
  sortingOption?: string
  resourceId: string
  resourceType: ResourceType
  recentTrip: boolean
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
  ] = useGraphqlQueries([
    {
      key: ['getLatestReviews', recentTrip],
      query: GetLatestReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        recentTrip,
        from: (currentPage - 1) * perPage,
        size: perPage,
      },
    },
    {
      key: ['getPopularReviews', recentTrip],
      query: GetPopularReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        recentTrip,
        from: (currentPage - 1) * perPage,
        size: perPage,
      },
    },
  ])

  const loaded = useMemo(
    () =>
      (latestReview ? latestReviewsStatus : popularReviewsStatus) === 'success',
    [latestReview],
  )
  const error = useMemo(
    () => (latestReview ? latestReviewsError : popularReviewsError),
    [latestReview],
  )
  const reviewsData = useMemo(
    () =>
      (latestReview
        ? latestReviewsData?.getLatestReviews
        : popularReviewsData?.getPopularReviews) || [],
    [
      latestReview,
      latestReviewsData?.getLatestReviews,
      popularReviewsData?.getPopularReviews,
    ],
  )

  const fetchNext = useCallback(
    () => !endOfList && loaded && setCurrentPage((prevState) => prevState + 1),
    [setCurrentPage, endOfList, loaded, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [latestReview, recentTrip])

  useEffect(() => {
    setReviews(reviewsData)
  }, [recentTrip, reviewsData])

  useEffect(() => {
    if (!error && loaded) {
      if (reviewsData.length > 0) {
        setReviews((currentReviews) => [...currentReviews, ...reviewsData])
      } else {
        setEndOfList(true)
      }
    }
  }, [error, reviewsData, latestReview, loaded, setReviews])

  return { reviews, fetchNext, endOfList }
}
