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

  const [{ latestReviewsPage, popularReviewsPage }, setPage] = useState<{
    latestReviewsPage: number
    popularReviewsPage: number
  }>({
    latestReviewsPage: 1,
    popularReviewsPage: 1,
  })
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
      key: 'getLatestReviews',
      query: GetLatestReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        from: (latestReviewsPage - 1) * perPage,
        size: perPage,
      },
    },
    {
      key: 'getPopularReviews',
      query: GetPopularReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        from: (popularReviewsPage - 1) * perPage,
        size: perPage,
      },
    },
  ])

  const loaded = useMemo(
    () =>
      (latestReview ? latestReviewsStatus : popularReviewsStatus) === 'success',
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
    () =>
      !endOfList &&
      loaded &&
      setPage((prevState) => ({
        ...prevState,
        ...(latestReview
          ? {
              latestReviewsPage: prevState.latestReviewsPage + 1,
            }
          : { popularReviewsPage: prevState.popularReviewsPage + 1 }),
      })),
    [endOfList, loaded, reviews],
  )

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      ...(latestReview
        ? {
            latestReviewsPage: prevState.latestReviewsPage + 1,
          }
        : { popularReviewsPage: prevState.popularReviewsPage + 1 }),
    }))
  }, [setPage])

  useEffect(() => {
    setReviews(reviewsData)
  }, [reviewsData])

  useEffect(() => {
    const error = latestReview ? latestReviewsError : popularReviewsError

    if (!error && loaded) {
      if ((reviewsData || []).length > 0) {
        setReviews((currentReviews) => [...currentReviews, ...reviewsData])
      } else {
        setEndOfList(true)
      }
    }
  }, [
    reviewsData,
    latestReview,
    loaded,
    setReviews,
    latestReviewsError,
    popularReviewsError,
  ])

  return { reviews, fetchNext, endOfList }
}
