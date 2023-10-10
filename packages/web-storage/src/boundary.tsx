import { Alert } from '@titicaca/tds-ui'
import { WithTranslation, withTranslation } from '@titicaca/next-i18next'
import { Component, ReactNode } from 'react'

import { WebStorageError } from './error'

interface WebStorageErrorBoundaryProps {
  children: ReactNode
  onConfirm: () => void
}

interface WebStorageErrorBoundaryState {
  error: WebStorageError | null
}

class WebStorageErrorBoundaryClass extends Component<
  WebStorageErrorBoundaryProps & WithTranslation,
  WebStorageErrorBoundaryState
> {
  public constructor(props: WebStorageErrorBoundaryProps & WithTranslation) {
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
      props: { onConfirm, children, t },
      state: { error },
    } = this

    if (error) {
      return (
        <Alert
          open
          title={t(['munjega-balsaenghaessseubnida.', '문제가 발생했습니다.'])}
          onConfirm={onConfirm}
        >
          {error.userGuideMessage}
        </Alert>
      )
    }

    return <>{children}</>
  }
}

// FIXME: 암시적인 타입 추론으로 export 될 수 없는 문제가 있습니다.
// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
export const WebStorageErrorBoundary = withTranslation('common-web')(
  WebStorageErrorBoundaryClass,
) as unknown as WebStorageErrorBoundaryClass
