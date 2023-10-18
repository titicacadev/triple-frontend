import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface HashRouterContextValue {
  uriHash: string
  addUriHash: (hash: string, type?: 'push' | 'replace') => void
  removeUriHash: (type?: 'pop' | 'replace') => void
}

const HashRouterContext = createContext<HashRouterContextValue | null>(null)

export type HashRouterProviderProps = PropsWithChildren<{
  isAndroid?: boolean
}>

export function HashRouterProvider({
  isAndroid = false,
  children,
}: HashRouterProviderProps) {
  const [uriHash, setUriHash] = useState<string>('')

  useEffect(() => {
    setUriHash(window.location.hash.replace('#', ''))
  }, [setUriHash])

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
      url.hash = hash

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
      if (type === 'pop' || isAndroid) {
        return window.history.back()
      } else {
        const url = new URL(window.location.href)
        url.hash = ''

        window.history.replaceState(null, '', url)
      }
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

export function useHashRouter(): HashRouterContextValue {
  const context = useContext(HashRouterContext)

  if (!context) {
    throw new Error('HashRouterContext가 존재하지 않습니다.')
  }

  return context
}
