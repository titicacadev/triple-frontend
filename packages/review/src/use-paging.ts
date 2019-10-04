import { useEffect, useState, useCallback } from 'react'
import { useFetch } from '@titicaca/react-hooks'

export default function usePaging({
  order,
  resourceId,
  resourceType,
  perPage,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [endOfList, setEndOfList] = useState(false)
  const [reviews, setReviews] = useState([])
  const { error, loading, data } = useFetch(
    `/api/reviews/v2${
      order ? `/${order}` : '/'
    }?resource_id=${resourceId}&resource_type=${resourceType}&from=${(currentPage -
      1) *
      perPage}&size=${perPage}`,
  )
  const fetchNext = useCallback(
    () => !endOfList && !loading && setCurrentPage(currentPage + 1),
    [setCurrentPage, endOfList, loading, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
    setReviews([])
  }, [resourceId])

  useEffect(() => {
    if (!error && !loading && data) {
      if (data.reviews.length > 0) {
        setReviews((currentReviews) => [...currentReviews, ...data.reviews])
      } else {
        setEndOfList(true)
      }
    }
  }, [error, loading, data, setReviews])

  return { loading, reviews, fetchNext, endOfList }
}
