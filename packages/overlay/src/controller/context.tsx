import { useRouter } from 'next/router'
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
  close: () => void
}

const OverlayControllerContext = createContext<
  OverlayControllerContextValue | undefined
>(undefined)

export function useOverlayController(hash: string) {
  const context = useContext(OverlayControllerContext)

  if (context === undefined) {
    throw new Error('OverlayControllerContext의 Provider가 없습니다.')
  }

  const { hash: currentHash, show, close } = context

  return {
    isVisible: currentHash === hash,
    show: () => show(hash),
    close,
  }
}

export function OverlayControllerProvider({
  children,
}: PropsWithChildren<unknown>) {
  const router = useRouter()
  const [hash, setHash] = useState<string>()

  const show = useCallback<OverlayControllerContextValue['show']>(
    async (newHash) => {
      if (window.location.hash === `#${newHash}`) {
        return
      }

      setHash(newHash)

      await router.push(`#${newHash}`)
    },
    [router],
  )

  const close = useCallback<
    OverlayControllerContextValue['close']
  >(async () => {
    if (window.location.hash === '') {
      return
    }

    setHash(undefined)

    await router.push('#')
  }, [router])

  useEffect(() => {
    if (window.location.hash !== '') {
      setHash(window.location.hash.replace('#', ''))
    }
  }, [])

  useEffect(() => {
    const handleHashChange = (url: string) => {
      const [, hash] = url.split('#')

      setHash(hash)
    }

    router.events.on('hashChangeStart', handleHashChange)
    return () => {
      router.events.off('hashChangeStart', handleHashChange)
    }
  }, [router.events])

  const value = useMemo<OverlayControllerContextValue>(
    () => ({ hash, show, close }),
    [hash, close, show],
  )

  return (
    <OverlayControllerContext.Provider value={value}>
      {children}
    </OverlayControllerContext.Provider>
  )
}
