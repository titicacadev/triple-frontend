import React, { ComponentType } from 'react'
import Router from 'next/router'
import qs from 'qs'
import { parseUrl, generateUrl } from '@titicaca/view-utilities'

type URIHash = string

interface HistoryContext {
  uriHash: URIHash
  push: any
  replace: any
  back: any
  navigate: any
  openWindow: any
}

const NOOP: Function = () => {}

const Context = React.createContext<HistoryContext>({
  uriHash: '',
  push: NOOP,
  replace: NOOP,
  back: NOOP,
  navigate: NOOP,
  openWindow: NOOP,
})

const EXTERNAL_BROWSER_HOSTS = ['play.google.com', 'itunes.apple.com']

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

  const replace = React.useCallback(
    (hash, { useRouter = isAndroid } = {}) => {
      HASH_HISTORIES.pop()
      HASH_HISTORIES.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        return Router.replace(generateUrl({ hash }, Router.asPath))
      } else {
        return new Promise((resolve) => resolve(true))
      }
    },
    [isAndroid],
  )

  const push = React.useCallback(
    (hash, { useRouter = isAndroid } = {}) => {
      HASH_HISTORIES.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        return Router.push(generateUrl({ hash }, Router.asPath))
      } else {
        return new Promise((resolve) => resolve(true))
      }
    },
    [isAndroid],
  )

  const back = React.useCallback(() => {
    const { useRouter } = HASH_HISTORIES.pop() || { useRouter: false }

    setUriHash(HASH_HISTORIES[HASH_HISTORIES.length - 1]?.hash || '')

    if (useRouter) {
      return Router.back()
    } else {
      return new Promise((resolve) => resolve(true))
    }
  }, [])

  const navigateOnPublic = React.useCallback(
    ({ href, scheme, path, query, hash }) => {
      if (scheme === 'http' || scheme === 'https') {
        return (window.location.href = href)
      } else if (path === '/outlink') {
        const { url: encodedUrl } = qs.parse(query || '')
        const {
          path: targetPath,
          query: targetQuery,
          hash: targetHash,
        } = parseUrl(decodeURIComponent(encodedUrl))

        if (targetPath && targetPageAvailable(targetPath)) {
          return (window.location.href = generateUrl(
            { path: targetPath, query: targetQuery, hash: targetHash },
            webUrlBase,
          ))
        }
      } else if (path === '/inlink') {
        const { path: encodedPath } = qs.parse(query || '')
        const {
          path: targetPath,
          query: targetQuery,
          hash: targetHash,
        } = parseUrl(decodeURIComponent(encodedPath))

        if (targetPath && targetPageAvailable(targetPath)) {
          return (window.location.href = generateUrl(
            { path: targetPath, query: targetQuery, hash: targetHash },
            webUrlBase,
          ))
        }
      } else if (targetPageAvailable(path)) {
        return (window.location.href = generateUrl(
          { path, query, hash },
          webUrlBase,
        ))
      }

      transitionModalHash && push(transitionModalHash)
    },
    [push, transitionModalHash, webUrlBase],
  )

  const navigateInApp = React.useCallback(
    ({ href, scheme, host }, params?: { target: unknown }) => {
      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: href,
          ...(params || {}),
          target:
            params?.target ||
            (EXTERNAL_BROWSER_HOSTS.includes(host) ? 'browser' : 'default'),
        })

        window.location.href = `${appUrlScheme}:///outlink?${outlinkParams}`
      } else {
        window.location.href = generateUrl({ scheme: appUrlScheme }, href)
      }
    },
    [appUrlScheme],
  )

  const navigate = React.useCallback(
    (rawHref, params) =>
      (isPublic ? navigateOnPublic : navigateInApp)(parseUrl(rawHref), params),
    [isPublic, navigateInApp, navigateOnPublic],
  )

  const openWindow = React.useCallback(
    (rawHref: string, params?: { target: unknown }) => {
      if (isPublic) {
        window.open(rawHref)
      } else {
        const { href, scheme, host } = parseUrl(rawHref)

        if (appUrlScheme) {
          if (scheme === 'http' || scheme === 'https') {
            const outlinkParams = qs.stringify({
              url: href,
              ...(params || {}),
              target:
                params?.target ||
                (EXTERNAL_BROWSER_HOSTS.includes(host) ? 'browser' : 'default'),
            })

            window.location.href = `${appUrlScheme}:///outlink?${outlinkParams}`
          } else if (!scheme && !host) {
            window.location.href = generateUrl(
              { scheme: appUrlScheme },
              `/inlink?path=${encodeURIComponent(rawHref)}`,
            )
          }
        }
      }
    },
    [appUrlScheme, isPublic],
  )

  const value = React.useMemo(
    () => ({
      uriHash,
      push,
      replace,
      back,
      navigate,
      openWindow,
    }),
    [back, navigate, openWindow, push, replace, uriHash],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useHistoryContext() {
  return React.useContext(Context)
}

interface WrappingComponentBaseProps {
  uriHash: URIHash
  historyActions: Pick<HistoryContext, 'back' | 'navigate' | 'push' | 'replace'>
}

export function withHistory<P extends Partial<WrappingComponentBaseProps>>(
  Component: ComponentType<P>,
) {
  return function HistoryComponent(
    props: Omit<P, keyof WrappingComponentBaseProps>,
  ) {
    return (
      <Context.Consumer>
        {({ uriHash, push, replace, back, navigate }) => (
          <Component
            {...({
              ...props,
              uriHash,
              historyActions: {
                push,
                replace,
                back,
                navigate,
              },
            } as P)}
          />
        )}
      </Context.Consumer>
    )
  }
}
