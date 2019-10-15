import React from 'react'

const NOOP = () => {}

interface ReviewLikesContextProps {
  deriveCurrentStateAndCount: Function
  updateLikedStatus: Function
}

const Context = React.createContext<ReviewLikesContextProps>({
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
    const { subscribeLikedChangeEvent } = this.props

    subscribeLikedChangeEvent &&
      subscribeLikedChangeEvent(({ id, liked }) =>
        this.updateLikedStatus({ [id]: liked }),
      )
  }

  updateLikedStatus = (newLikes) =>
    this.setState(({ likes }) => ({ likes: { ...likes, ...newLikes } }))

  deriveCurrentStateAndCount = ({
    resourceId,
    liked: initialLiked,
    likesCount: initialLikesCount,
  }: {
    resourceId: string
    liked: boolean
    likesCount: number
  }) => {
    const currentState = this.state.likes[resourceId]

    return {
      liked: typeof currentState === 'undefined' ? initialLiked : currentState,
      likesCount:
        initialLiked === currentState
          ? initialLikesCount
          : currentState
          ? initialLikesCount + 1
          : initialLikesCount - 1,
    }
  }

  render() {
    const {
      props: { children },
    } = this

    return (
      <Context.Provider
        value={{
          deriveCurrentStateAndCount: this.deriveCurrentStateAndCount,
          updateLikedStatus: this.updateLikedStatus,
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
