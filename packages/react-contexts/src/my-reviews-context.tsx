import React, {
  ComponentType,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
  useMemo,
} from 'react'
import humps from 'humps'

type FetchReview = ({
  resourceId,
  resourceType,
}: {
  resourceId: string
  resourceType: string
}) => Promise<Response>

type StateAndCount = {
  reviewed: boolean
  reviewsCount: number
}

type DeriveCurrentStateAndCount = ({
  id,
  reviewed,
  reviewsCount,
}: { id: string } & StateAndCount) => StateAndCount

type MyReviewSet = {
  [key: string]: boolean
}

interface MyReviewsContextProps {
  myReviews: MyReviewSet
  actions: {
    deleteMyReview: (params: { id: string }) => void
    fetchMyReview: (params: { id: string }) => Promise<object | null>
  }
  deriveCurrentStateAndCount: DeriveCurrentStateAndCount
}

const NOOP = () => {}

const Context = React.createContext<MyReviewsContextProps>({
  myReviews: {},
  actions: {
    deleteMyReview: NOOP,
    fetchMyReview: () => Promise.resolve(null),
  },
  deriveCurrentStateAndCount: ({ reviewed, reviewsCount }) => ({
    reviewed,
    reviewsCount,
  }),
})

interface MyReviewsProviderProps {
  myReviews: MyReviewSet
  fetchMyReview: FetchReview
  resourceType: string
  subscribeReviewUpdateEvent: (
    callback: (target: { id: string }) => any,
  ) => void
  unsubscribeReviewUpdateEvent: (
    callback: (target: { id: string }) => any,
  ) => void
}

export function MyReviewsProvider({
  myReviews: initialMyReviews,
  fetchMyReview,
  resourceType,
  subscribeReviewUpdateEvent,
  unsubscribeReviewUpdateEvent,
  children,
}: PropsWithChildren<MyReviewsProviderProps>) {
  const [myReviews, setMyReviews] = useState(initialMyReviews || {})

  const insert = (newReviews: MyReviewSet) =>
    setMyReviews((myReviews) => ({
      ...myReviews,
      ...newReviews,
    }))

  const handleFetch = useCallback(
    async ({ id }) => {
      const response = await fetchMyReview({ resourceId: id, resourceType })

      if (response.ok) {
        const myReview: object = humps.camelizeKeys(await response.json())

        insert({ [id]: true })

        return myReview
      } else if (response.status === 404) {
        insert({ [id]: false })
      }

      return null
    },
    [fetchMyReview, resourceType],
  )

  const handleDelete = useCallback(({ id }) => insert({ [id]: false }), [])

  const deriveCurrentStateAndCount = useCallback(
    ({ id, reviewed, reviewsCount: originalReviewsCount }) => {
      const currentReview = myReviews[id]
      const reviewsCount = Number(originalReviewsCount || 0)

      if (
        typeof reviewed !== 'boolean' ||
        typeof currentReview === 'undefined'
      ) {
        /* At least one of the status are unknown: Reduces to a bitwise OR operation */
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
    },
    [myReviews],
  )

  const value = useMemo(
    () => ({
      myReviews,
      deriveCurrentStateAndCount: deriveCurrentStateAndCount,
      actions: {
        deleteMyReview: handleDelete,
        fetchMyReview: handleFetch,
      },
    }),
    [deriveCurrentStateAndCount, handleDelete, handleFetch, myReviews],
  )

  useEffect(() => {
    subscribeReviewUpdateEvent(handleFetch)

    return () => {
      if (unsubscribeReviewUpdateEvent) {
        unsubscribeReviewUpdateEvent(handleFetch)
      }
    }
  }, [handleFetch, subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useMyReviewsContext() {
  return React.useContext(Context)
}

export function withMyReviews<
  P extends {
    myReviews?: MyReviewsContextProps['myReviews']
    myReviewActions?: MyReviewsContextProps['actions']
    deriveCurrentReviewedStateAndCount?: MyReviewsContextProps['deriveCurrentStateAndCount']
  }
>(Component: ComponentType<P>) {
  return function MyReviewsComponent(
    props: Omit<
      P,
      'myReviews' | 'myReviewActions' | 'deriveCurrentReviewedStateAndCount'
    >,
  ) {
    return (
      <Context.Consumer>
        {({ myReviews, actions, deriveCurrentStateAndCount }) => (
          <Component
            {...({
              ...props,
              myReviews,
              myReviewActions: actions,
              deriveCurrentReviewedStateAndCount: deriveCurrentStateAndCount,
            } as P)}
          />
        )}
      </Context.Consumer>
    )
  }
}
