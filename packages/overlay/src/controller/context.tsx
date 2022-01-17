import { useRouter } from 'next/router'
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
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
  const { push, back } = useRouter()
  const [hash, setHash] = useState<string>()

  const show = useCallback<OverlayControllerContextValue['show']>(
    (newHash) => {
      if (newHash === hash) {
        return
      }

      setHash(newHash)

      push(`#${newHash}`)
    },
    [hash, push],
  )

  const hide = useCallback<OverlayControllerContextValue['hide']>(() => {
    if (hash === undefined) {
      return
    }

    setHash(undefined)

    back()
  }, [back, hash])

  const value = useMemo(() => ({ hash, show, hide }), [hash, hide, show])

  return (
    <OverlayControllerContext.Provider value={value}>
      {children}
    </OverlayControllerContext.Provider>
  )
}
