import { ComponentType } from 'react'

import { Context, MyReviewsContextProps } from './my-reviews-context'

export default function withMyReviews<P extends MyReviewsContextProps>(
  Component: ComponentType<P>,
) {
  return function MyReviewsComponent(
    props: Omit<P, keyof MyReviewsContextProps>,
  ) {
    return (
      <Context.Consumer>
        {(contextProps) => (
          <Component {...({ ...props, ...contextProps } as P)} />
        )}
      </Context.Consumer>
    )
  }
}
