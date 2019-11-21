import React from 'react'
import humps from 'humps'

type FetchReview = ({
  resourceId,
  resourceType,
}: {
  resourceId: string
  resourceType: string
}) => Promise<any>

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
    deleteMyReview: Function
    fetchMyReview: ({ id: string }) => Promise<any>
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
  subscribeReviewUpdateEvent: Function
}

interface MyReviewsProviderState {
  myReviews: MyReviewSet
}

export class MyReviewsProvider extends React.PureComponent<
  MyReviewsProviderProps,
  MyReviewsProviderState
> {
  state = { myReviews: this.props.myReviews || {} }

  insert = (newReviews) =>
    this.setState(({ myReviews }) => ({
      myReviews: { ...myReviews, ...newReviews },
    }))

  handleFetch = async ({ id }) => {
    const { fetchMyReview, resourceType } = this.props
    const response = await fetchMyReview({ resourceId: id, resourceType })

    if (response.ok) {
      const myReview = humps.camelizeKeys(await response.json())

      this.insert({ [id]: myReview })

      return myReview
    } else if (response.status === 404) {
      this.insert({ [id]: null })

      return null
    }
  }

  handleDelete = ({ id }) => this.insert({ [id]: null })

  deriveCurrentStateAndCount = ({
    id,
    reviewed,
    reviewsCount: originalReviewsCount,
  }) => {
    const { myReviews } = this.state
    const currentReview = myReviews[id]
    const reviewsCount = Number(originalReviewsCount || 0)

    if (typeof reviewed !== 'boolean' || typeof currentReview === 'undefined') {
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
  }

  componentDidMount() {
    this.props.subscribeReviewUpdateEvent(this.handleFetch)
  }

  render() {
    const {
      props: { children },
      state: { myReviews },
    } = this

    return (
      <Context.Provider
        value={{
          myReviews,
          deriveCurrentStateAndCount: this.deriveCurrentStateAndCount,
          actions: {
            deleteMyReview: this.handleDelete,
            fetchMyReview: this.handleFetch,
          },
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export function useMyReviewsContext() {
  return React.useContext(Context)
}

export function withMyReviews(Component) {
  return function MyReviewsComponent(props) {
    return (
      <Context.Consumer>
        {({ myReviews, actions, deriveCurrentStateAndCount }) => (
          <Component
            myReviews={myReviews}
            myReviewActions={actions}
            deriveCurrentReviewedStateAndCount={deriveCurrentStateAndCount}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}
