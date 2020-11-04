import React, { Component, ComponentType } from 'react'

import { NO_CONTEXT_ERROR_MESSAGE } from './constants'

interface ScrapsContextGuardState {
  error: Error | undefined
}

class ScrapsContextGuard extends Component<{}, ScrapsContextGuardState> {
  readonly state: Readonly<ScrapsContextGuardState> = { error: undefined }

  static getDerivedStateFromError(error: Error): ScrapsContextGuardState {
    if (error.message === NO_CONTEXT_ERROR_MESSAGE) {
      return { error }
    }
    return { error: undefined }
  }

  render() {
    const {
      props: { children },
      state: { error },
    } = this

    if (error) {
      return null
    }

    return <>{children}</>
  }
}

export default function withScrapsContextGuard<P>(Component: ComponentType<P>) {
  return function WithScrapsContextGuard(props: P) {
    return (
      <ScrapsContextGuard>
        <Component {...props} />
      </ScrapsContextGuard>
    )
  }
}
