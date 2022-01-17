import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface OverlayControllerContextValue {
  hash: string | undefined
  show: (hash: string) => void
  hide: () => void
}

const OverlayControllerContext = createContext<
  OverlayControllerContextValue | undefined
>(undefined)

export function useOverlayController(hash: string) {
  const context = useContext(OverlayControllerContext)

  if (context === undefined) {
    throw new Error('OverlayControllerContext의 Provider가 없습니다.')
  }

  const { hash: currentHash, show, hide } = context

  return {
    isVisible: currentHash === hash,
    show: () => show(hash),
    hide,
  }
}

export function OverlayControllerProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [hash, setHash] = useState<string>()

  const show = useCallback<OverlayControllerContextValue['show']>((newHash) => {
    if (window.location.hash === `#${newHash}`) {
      return
    }

    setHash(newHash)

    window.location.hash = newHash
  }, [])

  const hide = useCallback<OverlayControllerContextValue['hide']>(() => {
    if (window.location.hash === '') {
      return
    }

    setHash(undefined)

    window.location.hash = ''
  }, [])

  useEffect(() => {
    if (window.location.hash !== '') {
      setHash(window.location.hash.replace('#', ''))
    }
  }, [])

  useEffect(() => {
    const handleHashChange = ({ newURL: newUrl }: HashChangeEvent) => {
      const [, hash] = newUrl.split('#')

      setHash(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const value = useMemo(() => ({ hash, show, hide }), [hash, hide, show])

  return (
    <OverlayControllerContext.Provider value={value}>
      {children}
    </OverlayControllerContext.Provider>
  )
}
