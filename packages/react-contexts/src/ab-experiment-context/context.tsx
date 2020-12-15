import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { ABExperimentMeta, getABExperiment } from './service'

interface ABExperimentMetas {
  [key: string]: ABExperimentMeta | undefined
}

type ABExperimentContextValue = ABExperimentMetas

const ABExperimentContext = createContext<ABExperimentContextValue>({})

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
  const experimentMetas = useContext(ABExperimentContext)
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

  const value = useMemo(
    () => ({ ...experimentMetas, [experimentSlug]: meta }),
    [experimentMetas, experimentSlug, meta],
  )

  return (
    <ABExperimentContext.Provider value={value}>
      {children}
    </ABExperimentContext.Provider>
  )
}

export function useABExperimentVariant<T>(
  slug: string,
  variants: {
    [group: string]: T
  },
  fallback: T,
): T {
  const metas = useContext(ABExperimentContext)

  const { group } = metas[slug] || {}

  // TODO: session 시작을 기록해야함

  return group ? variants[group] : fallback
}
