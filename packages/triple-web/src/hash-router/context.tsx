'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useUserAgent } from '../user-agent/use-user-agent'

export interface HashRouterContextValue {
  /**
   * @deprecated 'uriHash는 Multiple hash 값을 지원하지 않습니다. 대신 hasUriHash 메소드를 사용하세요.'
   */
  uriHash: string
  /**
   *
   * @param hash 추가할 hash 값입니다.
   * @param type 기기 환경에 의존하지 않고 강제로 hash를 추가하고 싶을 때 지정합니다. removeUriHash와 동일한 값을 설정해야합니다.
   */
  addUriHash: (hash: string, type?: 'push' | 'replace') => void
  /**
   * 현재 hash 값에서 마지막 hash를 제거합니다.
   * @param type 기기 환경에 의존하지 않고 강제로 hash를 제거하고 싶을 때 지정합니다. addUriHash와 동일한 값을 설정해야합니다.
   */
  removeUriHash: (type?: 'pop' | 'replace') => void
  /**
   *
   * @param hash 확인할 hash 값입니다.
   * @returns hash값이 현재 uriHash에 포함되어 있는지 여부를 반환합니다.
   */
  hasUriHash: (hash: string) => boolean
  /**
   *
   * @param sourceHash 대체될 hash 값입니다.
   * @param targetHash 대체될 hash 값입니다.
   *
   * 하나의 hash가 제거되는 동시에 다른 hash를 추가해야할 때 유용합니다.
   */
  replaceUriHash: (sourceHash: string, targetHash: string) => void
}

export const HashRouterContext = createContext<HashRouterContextValue | null>(
  null,
)

export function HashRouterProvider({ children }: { children: ReactNode }) {
  const { os } = useUserAgent()
  const isAndroid = os.name === 'Android'

  const [uriHash, setUriHash] = useState<string>('')

  useEffect(() => {
    setUriHash(window.location.hash.replace('#', ''))
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      setUriHash(window.location.hash.replace('#', ''))
    }

    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  const addUriHash = useCallback<HashRouterContextValue['addUriHash']>(
    (hash, type) => {
      const url = new URL(window.location.href)
      const currentHash = window.location.hash.replace('#', '')

      if (currentHash) {
        const hashArray = currentHash.split('&')
        if (hashArray.includes(hash)) {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(`❗️${hash} already exists in the hash.`)
          }
          return
        }
        url.hash = currentHash + '&' + hash
      } else {
        url.hash = hash
      }

      if (type === 'push' || (isAndroid && !type)) {
        window.history.pushState(null, '', url)
      } else {
        window.history.replaceState(null, '', url)
      }
      window.dispatchEvent(new Event('hashchange'))
    },
    [isAndroid],
  )

  const removeUriHash = useCallback<HashRouterContextValue['removeUriHash']>(
    (type) => {
      if (!window.location.hash) {
        return
      }

      if (type === 'pop' || (isAndroid && !type)) {
        return window.history.back()
      }

      const url = new URL(window.location.href)

      const currentHash = window.location.hash.replace('#', '')
      if (currentHash.includes('&')) {
        const hashArray = currentHash.split('&')
        hashArray.pop()
        url.hash = hashArray.join('&')
      } else {
        url.hash = ''
      }

      window.history.replaceState(null, '', url)
      window.dispatchEvent(new Event('hashchange'))
    },
    [isAndroid],
  )

  const replaceUriHash = useCallback(
    (sourceHash: string, targetHash: string) => {
      if (!window.location.hash) {
        return
      }

      const url = new URL(window.location.href)
      const currentHash = window.location.hash.replace('#', '')

      if (currentHash.includes(sourceHash)) {
        url.hash = currentHash.replace(sourceHash, targetHash)
        window.history.replaceState(null, '', url)
        window.dispatchEvent(new Event('hashchange'))
      } else if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(`❗️${sourceHash} does not exist in the hash.`)
      }
    },
    [],
  )

  const hasUriHash = useCallback(
    (hash: string) => {
      if (!uriHash) {
        return false
      }
      const hasHash = uriHash.split('&').some((val) => val.startsWith(hash))
      return hasHash
    },
    [uriHash],
  )

  const value = {
    uriHash,
    addUriHash,
    removeUriHash,
    hasUriHash,
    replaceUriHash,
  }

  return (
    <HashRouterContext.Provider value={value}>
      {children}
    </HashRouterContext.Provider>
  )
}
