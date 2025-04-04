import { useCallback } from 'react'
import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { SessionControllers } from '../context'
import { useEnv } from '../../env-context'
import { getRedirectUrl } from '../redirect'

export function useLogout({
  type,
  clearUserState,
}: {
  type: 'browser' | 'app'
  clearUserState: () => void
}) {
  const appLogout = useCallback<SessionControllers['logout']>(() => {
    clearUserState()

    return Promise.resolve()
  }, [clearUserState])

  const browserLogout = useCallback<SessionControllers['logout']>(async () => {
    const response = await authGuardedFetchers.put<{ redirectUrl: string }>(
      '/api/users/logout',
    )

    clearUserState()

    if (response === 'NEED_LOGIN') {
      return
    }

    const isNolConnectedUser =
      response.ok &&
      response.status === 200 &&
      !!response.parsedBody.redirectUrl

    if (isNolConnectedUser) {
      const redirectLocation = response.parsedBody.redirectUrl

      if (!redirectLocation) {
        captureHttpError(response)
        window.location.reload()
        return
      }

      const redirectUrl = getRedirectUrl(redirectLocation)

      window.location.href = redirectUrl
      return
    }

    window.location.reload()
  }, [clearUserState])

  if (type === 'app') {
    return appLogout
  }
  return browserLogout
}

export function useLogin({ type }: { type: 'browser' | 'app' }) {
  const { appUrlScheme } = useEnv()

  const appLogin = useCallback<SessionControllers['login']>(() => {
    const loginHref = generateUrl({ scheme: appUrlScheme, path: '/login' })

    window.location.href = loginHref
  }, [appUrlScheme])

  const browserLogin = useCallback<SessionControllers['login']>((options) => {
    const loginUrl = generateUrl({
      path: '/login',
      query: qs.stringify({
        returnUrl:
          options?.returnUrl ??
          window.location.href.replace(window.location.origin, ''),
      }),
    })

    window.location.href = loginUrl
  }, [])

  if (type === 'app') {
    return appLogin
  }
  return browserLogin
}
