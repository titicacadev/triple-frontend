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
import { parseUrl, generateUrl } from '@titicaca/view-utilities'
import { hasAccessibleTripleNativeClients } from '@titicaca/triple-web-to-native-interfaces'
import { DeepPartial } from 'utility-types'

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

function parseQuery(query: string | undefined): ReturnType<typeof parseUrl> {
  const { url: encodedUrl } = qs.parse(query || '')

  if (!encodedUrl) {
    return {}
  }

  if (typeof encodedUrl !== 'string') {
    throw new Error('url should be string type.')
  }

  return parseUrl(decodeURIComponent(encodedUrl))
}

function addHashToCurrentUrl({
  hash,
  basePathCompatible,
}: {
  hash: string
  basePathCompatible?: boolean
}) {
  return generateUrl(
    { hash },
    !basePathCompatible && Router.asPath === '/' ? '' : Router.asPath,
  )
}

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

function targetPageAvailable(path: string) {
  const regexes = [
    /^\/regions\/.+\/(attractions|restaurants|hotels|articles)\/.+/,
    /^\/articles\/.+/,
  ]

  return regexes.some((regex) => path.match(regex))
}

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
  appUrlScheme: string
  webUrlBase: string
  transitionModalHash?: string
  isAndroid?: boolean
  isPublic?: boolean
  initialHashStrategy?: HashStrategy
}>

export function HistoryProvider({
  appUrlScheme,
  webUrlBase,
  transitionModalHash = '',
  isAndroid = false,
  isPublic = false,
  initialHashStrategy = HashStrategy.NONE,
  children,
}: HistoryProviderProps) {
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
      const { useRouter = isAndroid, basePathCompatible } = config
      const hashHistories = hasHistoriesRef.current

      hashHistories.pop()
      hashHistories.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        return Router.replace(addHashToCurrentUrl({ hash, basePathCompatible }))
      } else {
        return new Promise((resolve) => resolve(true))
      }
    },
    [isAndroid],
  )

  const push = useCallback<HistoryContextValue['push']>(
    (hash, config = {}) => {
      const { useRouter = isAndroid, basePathCompatible } = config
      const hashHistories = hasHistoriesRef.current

      hashHistories.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        return Router.push(addHashToCurrentUrl({ hash, basePathCompatible }))
      } else {
        return new Promise((resolve) => resolve(true))
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

  const navigateOnPublic = useCallback<(url: URLElement) => string | undefined>(
    ({ href, scheme, path, query, hash }) => {
      if (scheme === 'http' || scheme === 'https') {
        if (!href) {
          throw new Error('href is undefined')
        }

        return (window.location.href = href)
      } else if (path === '/outlink') {
        const {
          path: targetPath,
          query: targetQuery,
          hash: targetHash,
        } = parseQuery(query)

        if (targetPath && targetPageAvailable(targetPath)) {
          return (window.location.href = generateUrl(
            { path: targetPath, query: targetQuery, hash: targetHash },
            webUrlBase,
          ))
        }
      } else if (path === '/inlink') {
        const {
          path: targetPath,
          query: targetQuery,
          hash: targetHash,
        } = parseQuery(query)

        if (targetPath && targetPageAvailable(targetPath)) {
          return (window.location.href = generateUrl(
            { path: targetPath, query: targetQuery, hash: targetHash },
            webUrlBase,
          ))
        }
      } else if (path && targetPageAvailable(path)) {
        return (window.location.href = generateUrl(
          { path, query, hash },
          webUrlBase,
        ))
      }

      transitionModalHash && push(transitionModalHash)
    },
    [push, transitionModalHash, webUrlBase],
  )

  const navigateInApp = useCallback<
    (url: URLElement, params?: OutlinkParams) => void
  >(
    ({ href, scheme }, params) => {
      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: href,
          ...(params || {}),
        })

        window.location.href = `${appUrlScheme}:///outlink?${outlinkParams}`
      } else {
        window.location.href = generateUrl({ scheme: appUrlScheme }, href)
      }
    },
    [appUrlScheme],
  )

  const navigate = useCallback<HistoryContextValue['navigate']>(
    (rawHref, params) =>
      (isPublic ? navigateOnPublic : navigateInApp)(parseUrl(rawHref), params),
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
        window.location.href = generateUrl({
          scheme: appUrlScheme,
          path: '/inlink',
          query: `path=${encodeURIComponent(rawHref)}`,
        })
      }
    },
    [appUrlScheme],
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
