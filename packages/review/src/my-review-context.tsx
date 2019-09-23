import * as React from 'react'
import humps from 'humps'

const Context = React.createContext(undefined)

export class MyReviewsProvider extends React.PureComponent<{
  myReviews?: any[]
  fetchMyReview?: any
  resourceType?: string
  subscribeReviewUpdateEvent?: any
}> {
  state = { myReviews: this.props.myReviews || {} }

  insert = (newReviews) =>
    this.setState({ myReviews: { ...this.state.myReviews, ...newReviews } })

  handleFetch = async ({ id }) => {
    const { fetchMyReview, resourceType } = this.props
    const response = await fetchMyReview({ resourceId: id, resourceType })

    if (response.ok) {
      const myReview = (humps.camelizeKeys(await response.json()) || {}).review

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
