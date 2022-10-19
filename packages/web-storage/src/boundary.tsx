import { Component, ReactNode } from 'react'
import { Alert } from '@titicaca/modals'

import { WebStorageError } from './error'

interface WebStorageErrorBoundaryProps {
  children: ReactNode
  onConfirm: () => void
}

interface WebStorageErrorBoundaryState {
  error: WebStorageError | null
}

export class WebStorageErrorBoundary extends Component<
  WebStorageErrorBoundaryProps,
  WebStorageErrorBoundaryState
> {
  public constructor(props: WebStorageErrorBoundaryProps) {
    super(props)

    this.state = { error: null }
  }

  public static getDerivedStateFromError(
    error: Error,
  ): Partial<WebStorageErrorBoundaryState> {
    if (error instanceof WebStorageError) {
      return { error }
    }

    return { error: null }
  }

  public componentDidCatch(error: Error) {
    if (!(error instanceof WebStorageError)) {
      throw error
    }
  }

  public render() {
    const {
      props: { onConfirm, children },
      state: { error },
    } = this

    if (error) {
      return (
        <Alert open title="문제가 발생했습니다." onConfirm={onConfirm}>
          {error.userGuideMessage}
        </Alert>
      )
    }

    return <>{children}</>
  }
}
