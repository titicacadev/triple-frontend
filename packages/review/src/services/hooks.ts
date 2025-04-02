import { handleGql401Error } from '@titicaca/fetcher'
import { useLoginCtaModal } from '@titicaca/modals'
import { ClientError } from 'graphql-request'

export function useShowLoginCtaModalOnAuthError() {
  const { show: showLoginCta } = useLoginCtaModal()

  return (error: unknown) => {
    if (error instanceof ClientError) {
      const isAuthError = error.response.errors?.some((err) =>
        handleGql401Error(err),
      )
      if (isAuthError) {
        showLoginCta()
      }
    }
  }
}
