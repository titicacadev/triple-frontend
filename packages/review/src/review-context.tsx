import * as React from 'react'
import humps from 'humps'

const Context = React.createContext('')

export function ReviewProvider({
  likes: initLikes,
  likeReview,
  subscribeLikedChangeEvent,
  unlikeReview,
  notifyReviewLiked,
  notifyReviewUnliked,
  myReview: initMyReview,
  fetchMyReviews,
  subscribeReviewUpdateEvent,
  children,
}: {
  likes?: any
  likeReview?: any
  subscribeLikedChangeEvent?: any
  unlikeReview?: any
  notifyReviewLiked?: any
  notifyReviewUnliked?: any
  myReview?: any
  fetchMyReviews?: any
  subscribeReviewUpdateEvent?: any
  children?: React.ReactNode
}) {
  const [reviewLikes, setReviewLikes] = React.useState(initLikes || {})
  const [myReviews, setMyReviews] = React.useState(initMyReview || {})
  const [popup, setPopup] = React.useState(undefined)
  const insertLike = (likes) => {
    setReviewLikes({ ...reviewLikes, ...likes })
  }

  React.useEffect(() => {
    subscribeLikedChangeEvent(({ id, liked }) => insertLike({ [id]: liked }))
    //@TODO 내 리뷰 API 정리되면 업데이트 핋요
    // subscribeReviewUpdateEvent(handleMyReviewFetch)
  }, [subscribeLikedChangeEvent, subscribeReviewUpdateEvent])

  const like = async (contentId, reviewId) => {
    const response = await likeReview({ id: reviewId })

    if (response.ok) {
      notifyReviewLiked(contentId, reviewId)
      setReviewLikes({ ...reviewLikes, [reviewId]: true })
    }
  }

  const unlike = async (contentId, reviewId) => {
    const response = await unlikeReview({ id: reviewId })

    if (response.ok) {
      notifyReviewUnliked(contentId, reviewId)
      setReviewLikes({ ...reviewLikes, [reviewId]: false })
    }
  }

  const insertMyReview = (newReviews) => {
    setMyReviews({ ...myReviews, ...newReviews })
  }

  const handleMyReviewFetch = async ({ id }) => {
    const response = await fetchMyReviews({ id })

    if (response.ok) {
      const myReview = humps.camelizeKeys(await response.json())

      insertMyReview({ [id]: myReview })

      return myReview
    } else if (response.status === 404) {
      insertMyReview({ [id]: null })

      return null
    }
  }

  const handleDeleteMyReview = ({ id }) => {
    insertMyReview({ [id]: null })
  }

  const deriveCurrentStateAndCount = ({
    id,
    reviewed,
    reviewsCount: originalReviewsCount,
  }) => {
    const currentReview = myReviews[id]
    const reviewsCount = Number(originalReviewsCount || 0)

    if (typeof reviewed !== 'boolean' || typeof currentReview === 'undefined') {
      return { reviewed: !!reviewed || !!currentReview, reviewsCount }
    }

    return {
      reviewed: !!currentReview,
      reviewsCount:
        reviewed === !!currentReview
          ? reviewsCount
          : currentReview
          ? reviewsCount + 1
          : reviewsCount - 1,
    }
  }
  const value: any = {
    reviewLikes,
    setReviewLikes,
    myReviews,
    setMyReviews,
    popup,
    setPopup,
    deriveCurrentStateAndCount,
  }

  const actions: any = {
    like,
    unlike,
    insertLike,
    handleDeleteMyReview,
    deleteMyReview: handleDeleteMyReview,
    fetchMyReview: handleMyReviewFetch,
  }

  return (
    <Context.Provider value={{ ...value, ...actions }}>
      {children}
    </Context.Provider>
  )
}

export function useReviewContext() {
  return React.useContext(Context)
}
