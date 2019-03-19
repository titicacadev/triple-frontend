import React, { createContext, PureComponent } from 'react'
import {
  subscribeLikedChangeEvent,
  notifyReviewLiked,
  notifyReviewUnliked,
} from '@titicaca/triple-web-to-native-interfaces'

const { Provider, Consumer } = createContext()

export class ReviewLikesProvider extends PureComponent {
  state = { likes: this.props.likes || {} }

  componentDidMount() {
    subscribeLikedChangeEvent(({ id, liked }) => this.insert({ [id]: liked }))
  }

  like = async (contentId, reviewId) => {
    const response = await this.props.likeReview({ id: reviewId })

    if (response.ok) {
      notifyReviewLiked(contentId, reviewId)

      this.setState({ likes: { ...this.state.likes, [reviewId]: true } })
    }
  }

  unlike = async (contentId, reviewId) => {
    const response = await this.props.unlikeReview({ id: reviewId })

    if (response.ok) {
      notifyReviewUnliked(contentId, reviewId)

      this.setState({ likes: { ...this.state.likes, [reviewId]: false } })
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
      <Provider
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
      </Provider>
    )
  }
}

export function withReviewLikes(Component) {
  return function ReviewLikesComponent(props) {
    return (
      <Consumer>
        {({ likes, actions }) => (
          <Component likes={likes} likeActions={actions} {...props} />
        )}
      </Consumer>
    )
  }
}
