import React, { useState, useEffect, useCallback, createContext } from 'react'

const NOOP = () => {}

interface ReviewLikesContextProps {
  deriveCurrentStateAndCount: Function
  updateLikedStatus: Function
}

const Context = createContext<ReviewLikesContextProps>({
  deriveCurrentStateAndCount: ({ liked, likesCount }) => ({
    liked,
    likesCount,
  }),
  updateLikedStatus: NOOP,
})

interface ReviewLikesProviderProps {
  likes: { [key: string]: boolean | null }
  subscribeLikedChangeEvent: Function
  notifyReviewLiked: Function
  notifyReviewUnliked: Function
  children: React.ReactChildren
}

interface ReviewLikesProviderState {
  likes: { [key: string]: boolean }
}

export function ReviewLikesProvider({
  children,
  subscribeLikedChangeEvent,
  likes: initialLikes,
}: ReviewLikesProviderProps) {
  const [likes, setLikes] = useState(initialLikes || {})

  useEffect(() => {
    subscribeLikedChangeEvent &&
      subscribeLikedChangeEvent(({ id, liked }) =>
        setLikes((currentLikes) => ({ ...currentLikes, [id]: liked })),
      )
  }, [setLikes, subscribeLikedChangeEvent])

  const updateLikedStatus = useCallback(
    (newLikes) =>
      setLikes((currentLikes) => ({ ...currentLikes, ...newLikes })),
    [setLikes],
  )

  const deriveCurrentStateAndCount = useCallback(
    ({
      reviewId,
      liked: initialLiked,
      likesCount: initialLikesCount,
    }: {
      reviewId: string
      liked: boolean
      likesCount: number
    }) => {
      const currentState = likes[reviewId]

      if (typeof currentState === 'undefined') {
        return {
          liked: initialLiked,
          likesCount: initialLikesCount || 0,
        }
      }

      return {
        liked: currentState,
        likesCount:
          initialLiked === currentState
            ? initialLikesCount || 0
            : currentState
            ? (initialLikesCount || 0) + 1
            : (initialLikesCount || 1) - 1,
      }
    },
    [likes],
  )

  return (
    <Context.Provider
      value={{
        deriveCurrentStateAndCount,
        updateLikedStatus,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useReviewLikesContext() {
  return React.useContext(Context)
}

export function withReviewLikes(Component) {
  return function ReviewLikesComponent(props) {
    return (
      <Context.Consumer>
        {({ deriveCurrentStateAndCount, updateLikedStatus }) => (
          <Component
            deriveCurrentLikedStateAndCount={deriveCurrentStateAndCount}
            updateLikedStatus={updateLikedStatus}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}
