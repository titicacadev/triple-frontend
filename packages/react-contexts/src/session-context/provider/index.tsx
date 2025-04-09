import { IncomingMessage } from 'http'

import { PropsWithChildren, useEffect, useMemo } from 'react'
import {
  authFetcherize,
  fetcher,
  post,
  ssrFetcherize,
  RequestOptions,
  captureHttpError,
} from '@titicaca/fetcher'
import { NextPageContext } from 'next'

import { parseApp } from '../../user-agent-context'
import {
  SessionAvailabilityContext,
  SessionControllerContext,
} from '../context'
import { GET_USER_REQUEST_URL, User, UserProvider, useUserState } from '../user'
import getSessionAvailabilityFromRequest from '../session-availability'

import { useLogin, useLogout } from './hooks'

interface SessionContextProviderProps {
  type: 'browser' | 'app'
  initialSessionAvailability: boolean
  initialUser: User | undefined
}

export default function SessionContextProvider({
  type,
  initialSessionAvailability,
  initialUser,
  children,
}: PropsWithChildren<SessionContextProviderProps>) {
  const {
    user,
    clear: clearUserState,
    update: updateUserState,
  } = useUserState(initialUser)

  const logout = useLogout({ type, clearUserState })
  const login = useLogin({ type })

  useEffect(() => {
    updateUserState(initialUser)
  }, [initialUser, updateUserState])

  const controllers = useMemo(() => ({ login, logout }), [login, logout])

  return (
    <SessionControllerContext.Provider value={controllers}>
      <SessionAvailabilityContext.Provider value={initialSessionAvailability}>
        <UserProvider value={user || null}>{children}</UserProvider>
      </SessionAvailabilityContext.Provider>
    </SessionControllerContext.Provider>
  )
}

SessionContextProvider.getInitialProps = async function (
  context: NextPageContext,
): Promise<SessionContextProviderProps> {
  const { req } = context
  const userAgent =
    req !== undefined
      ? req.headers['user-agent'] || ''
      : window.navigator.userAgent
  const app = parseApp(userAgent)
  const type = app ? 'app' : 'browser'

  const initialSessionAvailability = getSessionAvailabilityFromRequest(req)

  if (initialSessionAvailability === false) {
    return {
      type,
      initialSessionAvailability,
      initialUser: undefined,
    }
  }

  const user = await fetchUser(req)

  return { type, initialSessionAvailability, initialUser: user }
}

const REFRESH_SESSION_REQUEST_URL = '/api/users/web-session/token'

function createFetcherFromRequest(req: IncomingMessage) {
  const ssrFetcherizeOptions = {
    apiUriBase: process.env.API_URI_BASE || '',
    cookie: req.headers.cookie,
  }

  const optionalOptionsFetcher = (href: string, options?: RequestOptions) =>
    fetcher(href, options || {})

  const refresh = () =>
    ssrFetcherize(
      post,
      ssrFetcherizeOptions,
    )<Record<string, never>, unknown>(REFRESH_SESSION_REQUEST_URL)

  return authFetcherize(
    ssrFetcherize(optionalOptionsFetcher, ssrFetcherizeOptions),
    {
      refresh,
    },
  )
}

async function fetchUser(req?: IncomingMessage) {
  const finalFetcher =
    req !== undefined
      ? createFetcherFromRequest(req)
      : authFetcherize((href, options) => fetcher(href, options || {}), {
          refresh: () => post(REFRESH_SESSION_REQUEST_URL),
        })

  const response = await finalFetcher<User>(GET_USER_REQUEST_URL)

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
