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
  uriHash: string
  addUriHash: (hash: string, type?: 'push' | 'replace') => void
  removeUriHash: (type?: 'pop' | 'replace') => void
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

      if (window.location.hash) {
        url.hash = window.location.hash.replace('#', '') + '&' + hash
      } else {
        url.hash = hash
      }

      if (type === 'push' || isAndroid) {
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

      if (type === 'pop' || isAndroid) {
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

  const value = {
    uriHash,
    addUriHash,
    removeUriHash,
  }

  return (
    <HashRouterContext.Provider value={value}>
      {children}
    </HashRouterContext.Provider>
  )
}
