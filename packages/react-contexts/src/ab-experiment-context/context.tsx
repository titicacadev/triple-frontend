import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ABExperimentMeta, getABExperiment } from './service'

type ABExperimentContextValue = ABExperimentMeta | null

const ABExperimentContext = createContext<ABExperimentContextValue>(null)

export function ABExperimentProvider({
  experimentSlug,
  meta: metaFromSSR,
  onError,
  children,
}: PropsWithChildren<{
  experimentSlug: string
  /**
   * SSR 단계에서 조회한 값을 넣어 줄 수 있는 prop
   */
  meta?: ABExperimentMeta
  onError?: (error: unknown) => void
}>) {
  const [meta, setMeta] = useState(metaFromSSR)

  useEffect(() => {
    async function fetchAndSetMeta() {
      const { result, error } = await getABExperiment(experimentSlug)

      if (error && onError) {
        onError(error)
      }

      if (result) {
        setMeta(result)
      }
    }

    if (!metaFromSSR) {
      fetchAndSetMeta()
    }
  }, [experimentSlug, metaFromSSR, onError])

  return (
    <ABExperimentContext.Provider value={meta || null}>
      {children}
    </ABExperimentContext.Provider>
  )
}

export function useABExperimentVariant<T>(
  variants: {
    [group: string]: T
  },
  fallback: T,
): T {
  const meta = useContext(ABExperimentContext)

  const { group } = meta || {}

  // TODO: session 시작을 기록해야함

  return group ? variants[group] : fallback
}
