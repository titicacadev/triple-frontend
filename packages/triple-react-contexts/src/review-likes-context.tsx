import * as React from 'react'

interface ReviewLikesContextProps {
  likes: { [key: string]: boolean }
  actions: {
    like: Function
    unlike: Function
    insert: Function
  }
}

const Context = React.createContext<ReviewLikesContextProps>(undefined)

interface ReviewLikesProviderProps {
  likes: { [key: string]: boolean }
  subscribeLikedChangeEvent: Function
  likeReview: Function
  notifyReviewLiked: Function
  unlikeReview: Function
  notifyReviewUnliked: Function
}

interface ReviewLikesProviderState {
  likes: { [key: string]: boolean }
}

export class ReviewLikesProvider extends React.PureComponent<
  ReviewLikesProviderProps,
  ReviewLikesProviderState
> {
  state = { likes: this.props.likes || {} }

  componentDidMount() {
    this.props.subscribeLikedChangeEvent(({ id, liked }) =>
      this.insert({ [id]: liked }),
    )
  }

  like = async (contentId, reviewId) => {
    const {
      props: { likeReview, notifyReviewLiked },
      state: { likes },
    } = this

    const response = await likeReview({ id: reviewId })

    if (response.ok) {
      notifyReviewLiked(contentId, reviewId)

      this.setState({ likes: { ...likes, [reviewId]: true } })
    }
  }

  unlike = async (contentId, reviewId) => {
    const {
      props: { unlikeReview, notifyReviewUnliked },
      state: { likes },
    } = this

    const response = await unlikeReview({ id: reviewId })

    if (response.ok) {
      notifyReviewUnliked(contentId, reviewId)

      this.setState({ likes: { ...likes, [reviewId]: false } })
    }
  }

  insert = (likes) =>
    this.setState({ likes: { ...this.state.likes, ...likes } })

  render() {
    const {
      props: { children },
      state: { likes },
    } = this

    return (
      <Context.Provider
        value={{
          likes,
          actions: {
            like: this.like,
            unlike: this.unlike,
            insert: this.insert,
          },
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export function useReviewLikesContext() {
  return React.useContext(Context)
}

export function withReviewLikes(Component) {
  return function ReviewLikesComponent(props) {
    return (
      <Context.Consumer>
        {({ likes, actions }) => (
          <Component likes={likes} likeActions={actions} {...props} />
        )}
      </Context.Consumer>
    )
  }
}
