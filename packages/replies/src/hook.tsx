import { useLoginCtaModal } from '@titicaca/modals'

import { SessionError } from './replies-api-client'

export function useHttpResponseError() {
  const { show: showLoginCtaModal } = useLoginCtaModal()

  return (error: SessionError | Error) => {
    if (error instanceof SessionError) {
      showLoginCtaModal()
    } else {
      // Handle other types of errors
    }
  }
}
