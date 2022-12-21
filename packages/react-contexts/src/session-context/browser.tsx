import { IncomingMessage } from 'http'

import { NextPageContext } from 'next'
import { PropsWithChildren, useRef, useCallback, useMemo } from 'react'
import {
  fetcher,
  ssrFetcherize,
  captureHttpError,
  authGuardedFetchers,
  authFetcherize,
  post,
} from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'
import Cookies from 'universal-cookie'

import { User, UserProvider, useUserState } from './user'
import {
  SessionControllerContext,
  SessionAvailabilityContext,
  SessionControllers,
} from './context'

export interface InBrowserSessionContextProviderProps {
  initialSessionAvailability: boolean
  initialUser: User | undefined
}

export function InBrowserSessionContextProvider({
  initialSessionAvailability,
  initialUser,
  children,
}: PropsWithChildren<InBrowserSessionContextProviderProps>) {
  const sessionAvailableRef = useRef(initialSessionAvailability)

  const { user, clear: clearUserState } = useUserState(initialUser)

  const login = useCallback<SessionControllers['login']>((options) => {
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

  const logout = useCallback<SessionControllers['logout']>(async () => {
    await authGuardedFetchers.put('/api/users/logout')

    clearUserState()
    window.location.reload()
  }, [clearUserState])

  const controllers = useMemo(() => ({ login, logout }), [login, logout])

  return (
    <SessionControllerContext.Provider value={controllers}>
      <SessionAvailabilityContext.Provider value={sessionAvailableRef.current}>
        <UserProvider value={user || null}>{children}</UserProvider>
      </SessionAvailabilityContext.Provider>
    </SessionControllerContext.Provider>
  )
}

InBrowserSessionContextProvider.getInitialProps = async function ({
  req,
}: NextPageContext): Promise<InBrowserSessionContextProviderProps> {
  const initialSessionAvailability = getWebSessionAvailabilityFromRequest(req)

  if (initialSessionAvailability === false) {
    return {
      initialSessionAvailability,
      initialUser: undefined,
    }
  }

  const user = await fetchUser()

  return { initialSessionAvailability, initialUser: user }

  async function fetchUser() {
    const finalFetcher =
      req !== undefined
        ? createFetcherFromRequest(req)
        : authFetcherize((href, options) => fetcher(href, options || {}), {
            refresh: () => post('/api/users/web-session/token'),
          })

    const response = await finalFetcher<User>('/api/users/me')

    if (response === 'NEED_LOGIN') {
      return undefined
    }

    captureHttpError(response)

    if (response.ok === false) {
      return undefined
    }

    const { parsedBody } = response

    return parsedBody
  }

  function createFetcherFromRequest(req: IncomingMessage) {
    const ssrFetcherizeOptions = {
      apiUriBase: process.env.API_URI_BASE || '',
      cookie: req.headers.cookie,
    }

    return authFetcherize(
      ssrFetcherize(
        (href, options) => fetcher(href, options || {}),
        ssrFetcherizeOptions,
      ),
      {
        refresh: () =>
          ssrFetcherize(
            post,
            ssrFetcherizeOptions,
          )('/api/users/web-session/token'),
      },
    )
  }
}

export function getWebSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
) {
  if (process.env.NODE_ENV !== 'production') {
    return !!new Cookies(req?.headers.cookie).get('TP_SE')
  }

  return !!req?.headers['x-triple-web-login']
}
