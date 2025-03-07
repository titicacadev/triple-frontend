import { useCallback, useContext } from 'react'
import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'

import { ClientAppContext } from '../client-app/context'

import { SessionUpdaterContext } from './context'
import { getRedirectUrl } from './utils/redirect'

/**
 * 로그아웃 함수를 사용합니다.
 */
export function useLogout() {
  const clientApp = useContext(ClientAppContext)
  const setSession = useContext(SessionUpdaterContext)

  if (setSession === undefined) {
    throw new Error()
  }

  return useCallback(async () => {
    setSession({ user: null })

    if (clientApp) {
      await handleClientApp()
    } else {
      await handleBrowser()
    }
  }, [clientApp, setSession])
}

function handleClientApp() {
  return Promise.resolve()
}

async function handleBrowser() {
  const response = await authGuardedFetchers.put('/api/users/logout')

  if (response === 'NEED_LOGIN') {
    return
  }

  if (response.status === 301 || response.status === 302) {
    const redirectLocation = response.headers.get('Location')

    if (!redirectLocation) {
      captureHttpError(response)
      window.location.reload()
      return
    }

    const redirectUrl = getRedirectUrl(redirectLocation)

    window.location.href = redirectUrl
  }

  window.location.reload()
}
