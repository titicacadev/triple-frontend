import { useCallback, useContext } from 'react'
import qs from 'qs'
import { generateUrl } from '@titicaca/view-utilities'

import { ClientAppContext } from '../../contexts'
import { useEnv } from '../env'

export interface LoginOptions {
  returnUrl?: string
}

export function useLogin() {
  const clientApp = useContext(ClientAppContext)
  const env = useEnv()

  return useCallback(
    (options?: LoginOptions) => {
      if (clientApp) {
        handleClientApp(env.appUrlScheme)
      } else {
        handleBrowser(options?.returnUrl)
      }
    },
    [clientApp, env.appUrlScheme],
  )
}

function handleClientApp(appUrlScheme: string) {
  const loginUrl = generateUrl({ scheme: appUrlScheme, path: '/login' })

  window.location.href = loginUrl
}

function handleBrowser(returnUrl: string | undefined) {
  const loginUrl = generateUrl({
    path: '/login',
    query: qs.stringify({
      returnUrl:
        returnUrl ?? window.location.href.replace(window.location.origin, ''),
    }),
  })

  window.location.href = loginUrl
}
