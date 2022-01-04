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
import { useSessionAvailability } from '../session-context'

import { canonizeTargetAddress } from './canonization'

type UriHash = string

export interface OutlinkParams {
  target?: string
  title?: string
  [key: string]: unknown
}

interface NavigateFunctionConfig {
  useRouter?: boolean
  basePathCompatible?: boolean
}

interface HistoryContextValue {
  uriHash: UriHash
  push: (hash: string, config?: NavigateFunctionConfig) => void
  replace: (hash: string, config?: NavigateFunctionConfig) => void
  back: () => void
  /**
   * @deprecated router 패키지를 이용하세요.
   */
  navigate: (
    rawHref: string,
    params?: OutlinkParams,
  ) => string | undefined | void
  openWindow: (href: string, params?: OutlinkParams) => void
  showTransitionModal: () => void
}

const NOOP = () => {}

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
    {
      arrayFormat: 'repeat',
    },
  )
}

const UriHashContext = createContext<UriHash>('')
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NONE,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NO_PUSH,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PUSH,
}
export type HistoryProviderProps = PropsWithChildren<{
  transitionModalHash?: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  loginCTAModalHash?: string
  isAndroid?: boolean
  isPublic?: boolean
  initialHashStrategy?: HashStrategy
}>

export function HistoryProvider({
  transitionModalHash = '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  loginCTAModalHash = '',
  isAndroid = false,
  isPublic = false,
  initialHashStrategy = HashStrategy.NONE,
  children,
}: HistoryProviderProps) {
  const { appUrlScheme, webUrlBase } = useEnv()
  const sessionAvailable = useSessionAvailability()

  const [uriHash, setUriHash] = useState<UriHash>(() => {
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
        /* Routability 체크에만 사용하므로 /outlink를 해체합니다. */
        allowRawOutlink: false,
      })

      if (
        sessionAvailable === false &&
        !checkIfRoutable({ href: canonizedHref })
      ) {
        loginCTAModalHash && push(loginCTAModalHash)

        return
      }

      const { scheme } = parseUrl(rawHref)

      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: rawHref,
          ...(params || {}),
        })

        window.location.href = `${appUrlScheme}:///outlink?${outlinkParams}`
      } else {
        window.location.href = generateUrl({ scheme: appUrlScheme }, rawHref)
      }
    },
    [appUrlScheme, loginCTAModalHash, push, sessionAvailable, webUrlBase],
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
        if (sessionAvailable === true || checkIfRoutable({ href: rawHref })) {
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
    [appUrlScheme, loginCTAModalHash, push, sessionAvailable],
  )

  const showTransitionModal = useCallback<
    HistoryContextValue['showTransitionModal']
  >(
    () => isPublic && transitionModalHash && push(transitionModalHash),
    [push, transitionModalHash, isPublic],
  )

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
    <UriHashContext.Provider value={uriHash}>
      <HistoryFunctionsContext.Provider value={functions}>
        {children}
      </HistoryFunctionsContext.Provider>
    </UriHashContext.Provider>
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
  const uriHash = useContext(UriHashContext)
  const functions = useContext(HistoryFunctionsContext)

  return useMemo(
    () => ({
      uriHash,
      ...functions,
    }),
    [functions, uriHash],
  )
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function useURIHash(): UriHash {
  return useContext(UriHashContext)
}

export function useHistoryFunctions(): Omit<HistoryContextValue, 'uriHash'> {
  return useContext(HistoryFunctionsContext)
}

export interface WithHistoryBaseProps {
  uriHash: UriHash
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
      <UriHashContext.Consumer>
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
      </UriHashContext.Consumer>
    )
  }
}
