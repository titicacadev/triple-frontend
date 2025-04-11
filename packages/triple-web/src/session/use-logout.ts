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
  const response = await authGuardedFetchers.put<{ redirectUrl: string }>(
    '/api/users/logout',
  )

  if (response === 'NEED_LOGIN') {
    return
  }

  const isNolConnectedUser =
    response.ok && response.status === 200 && !!response.parsedBody.redirectUrl

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
}
