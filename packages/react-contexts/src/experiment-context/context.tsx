import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'

import { ExperimentMeta, getExperiment } from './service'

type ExperimentContextValue = ExperimentMeta | null

const ExperimentContext = createContext<ExperimentContextValue>(null)

export function ExperimentProvider({
  experimentSlug,
  meta: metaFromSSR,
  onError,
  children,
}: PropsWithChildren<{
  experimentSlug: string
  /**
   * SSR 단계에서 조회한 값을 넣어 줄 수 있는 prop
   */
  meta?: ExperimentMeta
  onError?: (error: unknown) => void
}>) {
  const [meta, setMeta] = useState(metaFromSSR)

  useEffect(() => {
    async function fetchAndSetMeta() {
      const { result, error } = await getExperiment(experimentSlug)

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
    <ExperimentContext.Provider value={meta || null}>
      {children}
    </ExperimentContext.Provider>
  )
}
