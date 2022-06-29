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
      key: ['getLatestReviews', recentTrip],
      query: GetLatestReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        recentTrip,
        from: (latestReviewsPage - 1) * perPage,
        size: perPage,
      },
      options: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
    {
      key: ['getPopularReviews', recentTrip],
      query: GetPopularReviewsDocument,
      variables: {
        resourceType,
        resourceId,
        recentTrip,
        from: (popularReviewsPage - 1) * perPage,
        size: perPage,
      },
      options: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
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
    () =>
      !endOfList &&
      setPage((prevState) => ({
        ...prevState,
        ...(latestReview
          ? {
              latestReviewsPage: prevState.latestReviewsPage + 1,
            }
          : { popularReviewsPage: prevState.popularReviewsPage + 1 }),
      })),
    [endOfList, latestReview],
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
    setPage((prevState) => ({
      ...prevState,
      ...(latestReview
        ? {
            latestReviewsPage: 1,
          }
        : { popularReviewsPage: 1 }),
    }))
  }, [recentTrip])

  useEffect(() => {
    setReviews(reviewsData)
  }, [recentTrip, reviewsData])

  useEffect(() => {
    if (!error && loaded) {
      if ((reviewsData || []).length > 0) {
        setReviews((currentReviews) => [...currentReviews, ...reviewsData])
      } else {
        setEndOfList(true)
      }
    }
  }, [error, reviewsData, latestReview, loaded, setReviews])

  return { reviews, fetchNext, endOfList }
}
