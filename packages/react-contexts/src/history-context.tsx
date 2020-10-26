import React, { ComponentType } from 'react'
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

interface HistoryContextValue {
  uriHash: URIHash
  push: (hash: string, config?: { useRouter?: boolean }) => void
  replace: (hash: string, config?: { useRouter?: boolean }) => void
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

function addHashToCurrentUrl(hash: string) {
  return generateUrl({ hash }, Router.asPath)
}

const URIHashContext = React.createContext<URIHash>('')
const HistoryFunctionsContext = React.createContext<
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

const HASH_HISTORIES: HashHistory[] = []

export enum HashStrategy {
  NONE,
  NO_PUSH,
  PUSH,
}
export interface HistoryProviderProps {
  appUrlScheme: string
  webUrlBase: string
  transitionModalHash?: string
  isAndroid?: boolean
  isPublic?: boolean
  initialHashStrategy?: HashStrategy
  children?: React.ReactElement
}
export function HistoryProvider({
  appUrlScheme,
  webUrlBase,
  transitionModalHash = '',
  isAndroid = false,
  isPublic = false,
  initialHashStrategy = HashStrategy.NONE,
  children,
}: HistoryProviderProps) {
  const [uriHash, setUriHash] = React.useState<URIHash>('')

  const onHashChange = React.useCallback((url) => {
    const { hash } = parseUrl(url)

    // We only need to check if onHashChange is triggered by native action.
    const { hash: previousHash } = HASH_HISTORIES[
      HASH_HISTORIES.length - 2
    ] || { hash: undefined }

    if ((previousHash || '') === hash) {
      HASH_HISTORIES.pop()

      setUriHash(previousHash || '')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onHashChange)
    Router.events.on('hashChangeStart', onHashChange)

    if (initialHashStrategy !== HashStrategy.NONE && uriHash === null) {
      const initialHash =
        window && window.location ? window.location.hash.substr(1) || '' : ''

      if (initialHashStrategy === HashStrategy.PUSH) {
        HASH_HISTORIES.push({ hash: initialHash, useRouter: isAndroid })
      }

      setUriHash(initialHash)
    }

    return () => {
      Router.events.off('routeChangeStart', onHashChange)
      Router.events.off('hashChangeStart', onHashChange)
    }
  }, [onHashChange]) // eslint-disable-line react-hooks/exhaustive-deps

  const replace = React.useCallback<HistoryContextValue['replace']>(
    (hash, config = {}) => {
      const { useRouter = isAndroid } = config

      HASH_HISTORIES.pop()
      HASH_HISTORIES.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        return Router.replace(addHashToCurrentUrl(hash))
      } else {
        return new Promise((resolve) => resolve(true))
      }
    },
    [isAndroid],
  )

  const push = React.useCallback<HistoryContextValue['push']>(
    (hash, config = {}) => {
      const { useRouter = isAndroid } = config

      HASH_HISTORIES.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        return Router.push(addHashToCurrentUrl(hash))
      } else {
        return new Promise((resolve) => resolve(true))
      }
    },
    [isAndroid],
  )

  const back = React.useCallback<HistoryContextValue['back']>(() => {
    const { useRouter } = HASH_HISTORIES.pop() || { useRouter: false }

    setUriHash(HASH_HISTORIES[HASH_HISTORIES.length - 1]?.hash || '')

    if (useRouter) {
      return Router.back()
    }
  }, [])

  const navigateOnPublic = React.useCallback<
    (url: URLElement) => string | undefined
  >(
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

  const navigateInApp = React.useCallback<
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

  const navigate = React.useCallback<HistoryContextValue['navigate']>(
    (rawHref, params) =>
      (isPublic ? navigateOnPublic : navigateInApp)(parseUrl(rawHref), params),
    [isPublic, navigateInApp, navigateOnPublic],
  )

  const openWindow = React.useCallback<HistoryContextValue['openWindow']>(
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

  const showTransitionModal = React.useCallback<
    HistoryContextValue['showTransitionModal']
  >(() => isPublic && transitionModalHash && push(transitionModalHash), [
    push,
    transitionModalHash,
    isPublic,
  ])

  const functions = React.useMemo<Omit<HistoryContextValue, 'uriHash'>>(
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
  const uriHash = React.useContext(URIHashContext)
  const functions = React.useContext(HistoryFunctionsContext)

  return React.useMemo(
    () => ({
      uriHash,
      ...functions,
    }),
    [functions, uriHash],
  )
}

export function useURIHash(): URIHash {
  return React.useContext(URIHashContext)
}

export function useHistoryFunctions(): Omit<HistoryContextValue, 'uriHash'> {
  return React.useContext(HistoryFunctionsContext)
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
