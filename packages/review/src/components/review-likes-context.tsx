import {
  useState,
  useEffect,
  useCallback,
  createContext,
  ComponentType,
  useContext,
  ReactNode,
} from 'react'
import { DeepPartial } from 'utility-types'

const NOOP = () => {}

interface ReviewLikesContextProps {
  deriveCurrentStateAndCount: (currentState: {
    reviewId: string
    liked: boolean
    likesCount: number
  }) => { liked: boolean; likesCount: number }
  updateLikedStatus: (
    newLikes: { [reviewId: string]: boolean },
    resourceId?: string,
  ) => void
}

const Context = createContext<ReviewLikesContextProps>({
  deriveCurrentStateAndCount: ({ liked, likesCount }) => ({
    liked,
    likesCount,
  }),
  updateLikedStatus: NOOP,
})

interface ReviewLikesProviderProps {
  likes?: { [key: string]: boolean | null }
  subscribeLikedChangeEvent?: (
    handler: (params: { id: string; liked: boolean }) => void,
  ) => void
  notifyReviewLiked: (resourceId: string, reviewId: string) => void
  notifyReviewUnliked: (resourceId: string, reviewId: string) => void
  children: ReactNode
}

export function ReviewLikesProvider({
  children,
  subscribeLikedChangeEvent,
  likes: initialLikes,
  notifyReviewLiked,
  notifyReviewUnliked,
}: ReviewLikesProviderProps) {
  const [likes, setLikes] = useState(initialLikes || {})

  useEffect(() => {
    subscribeLikedChangeEvent &&
      subscribeLikedChangeEvent(({ id, liked }) =>
        setLikes((currentLikes) => ({ ...currentLikes, [id]: liked })),
      )
  }, [setLikes, subscribeLikedChangeEvent])

  const updateLikedStatus = useCallback(
    (newLikes, resourceId) => {
      setLikes((currentLikes) => ({ ...currentLikes, ...newLikes }))

      resourceId &&
        Object.keys(newLikes).forEach((reviewId) => {
          const notifier = newLikes[reviewId]
            ? notifyReviewLiked
            : notifyReviewUnliked

          notifier(resourceId, reviewId)
        })
    },
    [setLikes, notifyReviewLiked, notifyReviewUnliked],
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
        liked: !!currentState,
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
  return useContext(Context)
}

export interface WithReviewLikesBaseProps {
  deriveCurrentLikedStateAndCount: ReviewLikesContextProps['deriveCurrentStateAndCount']
  updateLikedStatus: ReviewLikesContextProps['updateLikedStatus']
}

export function withReviewLikes<
  P extends DeepPartial<WithReviewLikesBaseProps>,
>(Component: ComponentType<P>) {
  return function ReviewLikesComponent(
    props: Omit<P, keyof WithReviewLikesBaseProps>,
  ) {
    return (
      <Context.Consumer>
        {({ deriveCurrentStateAndCount, updateLikedStatus }) => (
          <Component
            {...({
              ...props,
              updateLikedStatus,
              deriveCurrentLikedStateAndCount: deriveCurrentStateAndCount,
            } as P)}
          />
        )}
      </Context.Consumer>
    )
  }
}
