import { useCallback, useContext } from 'react'
import { authGuardedFetchers } from '@titicaca/fetcher'

import { ClientAppContext } from '../client-app/context'

import { SessionUpdaterContext } from './context'

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
  await authGuardedFetchers.put('/api/users/logout')

  window.location.reload()
}
