import * as React from 'react'
import * as humps from 'humps'

const Context = React.createContext(undefined)

interface MyReviewsProviderProps {
  myReviews: { [key: string]: boolean }
  fetchMyReview: Function
  type: string
  subscribeReviewUpdateEvent: Function
}

interface MyReviewsProviderState {
  myReviews: { [key: string]: boolean }
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
    const { fetchMyReview, type } = this.props
    const response = await fetchMyReview({ id, type })

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
