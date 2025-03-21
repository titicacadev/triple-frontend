import { useCallback } from 'react'
import { authGuardedFetchers } from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { SessionControllers } from '../context'
import { useEnv } from '../../env-context'

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
    await authGuardedFetchers.put('/api/users/logout')

    clearUserState()
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
