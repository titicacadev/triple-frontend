import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Router from 'next/router'
import qs from 'qs'
import {
  parseUrl,
  generateUrl,
  checkIfRoutable,
} from '@titicaca/view-utilities'
import { hasAccessibleTripleNativeClients } from '@titicaca/triple-web-to-native-interfaces'
import { DeepPartial } from 'utility-types'

import { useEnv } from '../env-context'
import { useSessionContextSafely } from '../session-context'

import { canonizeTargetAddress } from './canonization'

type URIHash = string

export interface OutlinkParams {
  target?: string
  title?: string
  [key: string]: any
}

type URLElement = ReturnType<typeof parseUrl>

type NavigateFunctionConfig = {
  useRouter?: boolean
  basePathCompatible?: boolean
}

interface HistoryContextValue {
  uriHash: URIHash
  push: (hash: string, config?: NavigateFunctionConfig) => void
  replace: (hash: string, config?: NavigateFunctionConfig) => void
  back: () => void
  navigate: (
    rawHref: string,
    params?: OutlinkParams,
  ) => string | undefined | void
  openWindow: (href: string, params?: OutlinkParams) => void
  showTransitionModal: () => void
}

const NOOP = () => {}

const URIHashContext = createContext<URIHash>('')
const HistoryFunctionsContext = createContext<
  Omit<HistoryContextValue, 'uriHash'>
>({
  push: NOOP,
  replace: NOOP,
  back: NOOP,
  navigate: NOOP,
  openWindow: NOOP,
  showTransitionModal: NOOP,
})

interface HashHistory {
  hash?: string
  useRouter?: boolean
}

function getInitialHash() {
  return (typeof window !== 'undefined' && window.location.hash.substr(1)) || ''
}

export enum HashStrategy {
  NONE,
  NO_PUSH,
  PUSH,
}
export type HistoryProviderProps = PropsWithChildren<{
  /**
   * @deprecated EnvProvider가 있으면 이 prop을 넣어주지 않아도 됩니다.
   */
  appUrlScheme?: string
  /**
   * @deprecated EnvProvider가 있으면 이 prop을 넣어주지 않아도 됩니다.
   */
  webUrlBase?: string
  transitionModalHash?: string
  loginCTAModalHash?: string
  isAndroid?: boolean
  isPublic?: boolean
  initialHashStrategy?: HashStrategy
}>

export function HistoryProvider({
  appUrlScheme: appUrlSchemeFromProps,
  webUrlBase: webUrlBaseFromProps,
  transitionModalHash = '',
  loginCTAModalHash = '',
  isAndroid = false,
  isPublic = false,
  initialHashStrategy = HashStrategy.NONE,
  children,
}: HistoryProviderProps) {
  const {
    appUrlScheme: appUrlSchemeFromContext,
    webUrlBase: webUrlBaseFromContext,
  } = useEnv()

  const [uriHash, setUriHash] = useState<URIHash>(() => {
    if (initialHashStrategy === HashStrategy.NONE) {
      return ''
    }

    return getInitialHash()
  })
  const hasHistoriesRef = useRef<HashHistory[]>(
    initialHashStrategy === HashStrategy.PUSH
      ? [{ hash: getInitialHash(), useRouter: isAndroid }]
      : [],
  )
  const sessionContext = useSessionContextSafely()
  const hasSessionId = sessionContext ? sessionContext.hasSessionId : !isPublic

  const appUrlScheme = useMemo(() => {
    if (appUrlSchemeFromContext) {
      return appUrlSchemeFromContext
    }
    if (typeof appUrlSchemeFromProps === 'string') {
      // TODO: 개발용 logger 만들기
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'appUrlScheme prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.\nhttps://github.com/titicacadev/triple-frontend/blob/ab1648a7cdb684ee2752eb5b80eed02940106964/packages/react-contexts/src/env-context/README.md#%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%98%EB%8A%94-%EB%B2%95',
        )
      }

      return appUrlSchemeFromProps
    }

    throw new Error('appUrlScheme을 구할 수 없습니다.')
  }, [appUrlSchemeFromContext, appUrlSchemeFromProps])

  const webUrlBase = useMemo(() => {
    if (webUrlBaseFromContext) {
      return webUrlBaseFromContext
    }
    if (typeof webUrlBaseFromProps === 'string') {
      // TODO: 개발용 logger 만들기
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'webUrlBase prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.\nhttps://github.com/titicacadev/triple-frontend/blob/ab1648a7cdb684ee2752eb5b80eed02940106964/packages/react-contexts/src/env-context/README.md#%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%98%EB%8A%94-%EB%B2%95',
        )
      }

      return webUrlBaseFromProps
    }
    throw new Error('webUrlBase를 구할 수 없습니다.')
  }, [webUrlBaseFromContext, webUrlBaseFromProps])

  useEffect(() => {
    const onHashChange = (url: string) => {
      const { hash } = parseUrl(url)

      const hashHistories = hasHistoriesRef.current

      // We only need to check if onHashChange is triggered by native action.
      const { hash: previousHash } = hashHistories[
        hashHistories.length - 2
      ] || { hash: undefined }

      if ((previousHash || '') === hash) {
        hashHistories.pop()

        setUriHash(previousHash || '')
      }
    }

    Router.events.on('routeChangeStart', onHashChange)
    Router.events.on('hashChangeStart', onHashChange)

    return () => {
      Router.events.off('routeChangeStart', onHashChange)
      Router.events.off('hashChangeStart', onHashChange)
    }
  }, [])

  const replace = useCallback<HistoryContextValue['replace']>(
    (hash, config = {}) => {
      const { useRouter = isAndroid } = config
      const hashHistories = hasHistoriesRef.current

      hashHistories.pop()
      hashHistories.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        window.location.replace(`#${hash}`)
      }
    },
    [isAndroid],
  )

  const push = useCallback<HistoryContextValue['push']>(
    (hash, config = {}) => {
      const { useRouter = isAndroid } = config
      const hashHistories = hasHistoriesRef.current

      hashHistories.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        window.location.hash = hash
      }
    },
    [isAndroid],
  )

  const back = useCallback<HistoryContextValue['back']>(() => {
    const hashHistories = hasHistoriesRef.current
    const { useRouter } = hashHistories.pop() || { useRouter: false }

    setUriHash(hashHistories[hashHistories.length - 1]?.hash || '')

    if (useRouter) {
      return Router.back()
    }
  }, [])

  const navigateOnPublic = useCallback<(href: string) => string | undefined>(
    (rawHref) => {
      const href = canonizeTargetAddress({
        href: rawHref,
        webUrlBase,
        expandInlinkStrictly: true,
      })

      if (checkIfRoutable({ href })) {
        return (window.location.href = href)
      }

      transitionModalHash && push(transitionModalHash)
    },
    [push, transitionModalHash, webUrlBase],
  )

  const navigateInApp = useCallback<
    (href: string, params?: OutlinkParams) => void
  >(
    (rawHref, params) => {
      const canonizedHref = canonizeTargetAddress({
        href: rawHref,
        webUrlBase,
        expandInlinkStrictly: false,
        allowRawOutlink: true,
      })
      const { scheme, path } = parseUrl(canonizedHref)

      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: canonizedHref,
          ...(params || {}),
        })

        window.location.href = `${appUrlScheme}:///outlink?${outlinkParams}`
      } else if (
        hasSessionId ||
        path === '/outlink' ||
        checkIfRoutable({ href: canonizedHref })
      ) {
        window.location.href = generateUrl({ scheme: appUrlScheme }, rawHref)
      } else {
        loginCTAModalHash && push(loginCTAModalHash)
      }
    },
    [push, appUrlScheme, loginCTAModalHash, hasSessionId, webUrlBase],
  )

  const navigate = useCallback<HistoryContextValue['navigate']>(
    (rawHref, params) =>
      (isPublic ? navigateOnPublic : navigateInApp)(rawHref, params),
    [isPublic, navigateInApp, navigateOnPublic],
  )

  const openWindow = useCallback<HistoryContextValue['openWindow']>(
    (rawHref, params) => {
      if (!hasAccessibleTripleNativeClients()) {
        window.open(rawHref, undefined, 'noopener')
        return
      }

      if (!appUrlScheme) {
        return
      }

      const { href, scheme, host = '' } = parseUrl(rawHref)

      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: href,
          ...(params || {}),
        })

        window.location.href = generateUrl({
          scheme: appUrlScheme,
          path: '/outlink',
          query: outlinkParams,
        })
      } else if (!scheme && !host) {
        if (hasSessionId || checkIfRoutable({ href: rawHref })) {
          window.location.href = generateUrl({
            scheme: appUrlScheme,
            path: '/inlink',
            query: `path=${encodeURIComponent(rawHref)}`,
          })
        } else {
          loginCTAModalHash && push(loginCTAModalHash)
        }
      }
    },
    [appUrlScheme, hasSessionId, loginCTAModalHash, push],
  )

  const showTransitionModal = useCallback<
    HistoryContextValue['showTransitionModal']
  >(() => isPublic && transitionModalHash && push(transitionModalHash), [
    push,
    transitionModalHash,
    isPublic,
  ])

  const functions = useMemo<Omit<HistoryContextValue, 'uriHash'>>(
    () => ({
      push,
      replace,
      back,
      navigate,
      openWindow,
      showTransitionModal,
    }),
    [back, navigate, openWindow, push, replace, showTransitionModal],
  )

  return (
    <URIHashContext.Provider value={uriHash}>
      <HistoryFunctionsContext.Provider value={functions}>
        {children}
      </HistoryFunctionsContext.Provider>
    </URIHashContext.Provider>
  )
}

/**
 * @deprecated #928 참고
 *
 * uriHash가 필요하면 `useURIHash`를,
 * 기타 함수가 필요하면 `useHistoryFunctions`
 * 를 사용해주세요.
 */
export function useHistoryContext(): HistoryContextValue {
  const uriHash = useContext(URIHashContext)
  const functions = useContext(HistoryFunctionsContext)

  return useMemo(
    () => ({
      uriHash,
      ...functions,
    }),
    [functions, uriHash],
  )
}

export function useURIHash(): URIHash {
  return useContext(URIHashContext)
}

export function useHistoryFunctions(): Omit<HistoryContextValue, 'uriHash'> {
  return useContext(HistoryFunctionsContext)
}

export interface WithHistoryBaseProps {
  uriHash: URIHash
  historyActions: Pick<
    HistoryContextValue,
    'back' | 'navigate' | 'push' | 'replace' | 'showTransitionModal'
  >
}

export function withHistory<P extends DeepPartial<WithHistoryBaseProps>>(
  Component: ComponentType<P>,
) {
  return function HistoryComponent(props: Omit<P, keyof WithHistoryBaseProps>) {
    return (
      <URIHashContext.Consumer>
        {(uriHash) => (
          <HistoryFunctionsContext.Consumer>
            {({ push, replace, back, navigate, showTransitionModal }) => (
              <Component
                {...({
                  ...props,
                  uriHash,
                  historyActions: {
                    push,
                    replace,
                    back,
                    navigate,
                    showTransitionModal,
                  },
                } as P)}
              />
            )}
          </HistoryFunctionsContext.Consumer>
        )}
      </URIHashContext.Consumer>
    )
  }
}
