import { IncomingMessage } from 'http'

import { NextPageContext } from 'next'
import { PropsWithChildren, useRef, useCallback, useMemo } from 'react'
import {
  fetcher,
  RequestOptions,
  ssrFetcherize,
  captureHttpError,
} from '@titicaca/fetcher'
import Cookies from 'universal-cookie'
import { generateUrl } from '@titicaca/view-utilities'

import { useEnv } from '../env-context'

import { GET_USER_REQUEST_URL, User, UserProvider, useUserState } from './user'
import {
  SessionControllerContext,
  SessionAvailabilityContext,
  SessionControllers,
} from './context'

const saveSessionIdToCookie = createSessionIdSaver()

export interface InAppSessionContextProviderProps {
  initialSessionId: string | undefined
  initialUser: User | undefined
  preventSessionFixation: boolean | undefined
}

export function InAppSessionContextProvider({
  initialSessionId,
  initialUser,
  preventSessionFixation,
  children,
}: PropsWithChildren<InAppSessionContextProviderProps>) {
  if (!preventSessionFixation) {
    saveSessionIdToCookie(initialSessionId)
  }

  const { appUrlScheme } = useEnv()
  const { user, clear: clearUserState } = useUserState(initialUser)

  const sessionAvailableRef = useRef(!!initialSessionId)

  const login = useCallback<SessionControllers['login']>(() => {
    const loginHref = generateUrl({ scheme: appUrlScheme, path: '/login' })

    window.location.href = loginHref
  }, [appUrlScheme])

  const logout = useCallback<SessionControllers['logout']>(() => {
    clearUserState()

    return Promise.resolve()
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

InAppSessionContextProvider.getInitialProps = async function ({
  req,
}: NextPageContext): Promise<InAppSessionContextProviderProps> {
  const initialSessionId = getSessionIdFromRequest(req)
  const userAgent = req?.headers.userAgent

  const preventSessionFixation =
    userAgent && typeof userAgent === 'string'
      ? !!userAgent.match(/Triple-iOS/)
      : false

  if (!initialSessionId) {
    return {
      initialSessionId,
      initialUser: undefined,
      preventSessionFixation,
    }
  }

  const optionalOptionsFetcher = <S, F = unknown>(
    href: string,
    options?: RequestOptions,
  ) => fetcher<S, F>(href, options || {})

  const finalFetcher =
    req !== undefined
      ? ssrFetcherize(optionalOptionsFetcher, {
          apiUriBase: process.env.API_URI_BASE || '',
          cookie: req.headers.cookie,
        })
      : optionalOptionsFetcher

  const response = await finalFetcher<User>(GET_USER_REQUEST_URL)

  if (response.status !== 401) {
    captureHttpError(response)
  }

  if (response.ok === false) {
    return { initialSessionId, initialUser: undefined, preventSessionFixation }
  }

  const { parsedBody: initialUser } = response

  return { initialSessionId, initialUser, preventSessionFixation }
}

function createSessionIdSaver() {
  let sessionIdSet = false

  return (sessionId: string | undefined) => {
    if (sessionIdSet === false && !!sessionId) {
      storeSessionIdToCookie(sessionId)
      sessionIdSet = true
    }
  }
}

export const SESSION_ID_KEY = 'x-soto-session'

export function getSessionIdFromRequest(req: IncomingMessage | undefined) {
  return new Cookies(req?.headers.cookie).get(SESSION_ID_KEY)
}

function storeSessionIdToCookie(sessionId: string) {
  new Cookies().set(SESSION_ID_KEY, sessionId, { path: '/' })
}
