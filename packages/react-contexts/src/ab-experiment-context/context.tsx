import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { useEventTrackingContext } from '../event-tracking-context'

import { ABExperimentMeta, getABExperiment } from './service'

interface ABExperimentMetas {
  [key: string]: ABExperimentMeta | undefined
}

type ABExperimentContextValue = ABExperimentMetas

const ABExperimentContext = createContext<ABExperimentContextValue>({})

export function ABExperimentProvider({
  slug,
  meta: metaFromSSR,
  onError: onErrorFromProps,
  children,
}: PropsWithChildren<{
  slug: string
  /**
   * SSR 단계에서 조회한 값을 넣어 줄 수 있는 prop
   */
  meta?: ABExperimentMeta
  onError?: (error: unknown) => void
}>) {
  const onErrorRef = useRef(onErrorFromProps)
  const experimentMetas = useContext(ABExperimentContext)
  const [meta, setMeta] = useState(metaFromSSR)

  useEffect(() => {
    const onError = onErrorRef.current

    async function fetchAndSetMeta() {
      const { result, error } = await getABExperiment(slug)

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
  }, [slug, metaFromSSR])

  const value = useMemo(() => ({ ...experimentMetas, [slug]: meta }), [
    experimentMetas,
    slug,
    meta,
  ])

  return (
    <ABExperimentContext.Provider value={value}>
      {children}
    </ABExperimentContext.Provider>
  )
}

function useABExperimentMeta(slug: string, onError?: (error: Error) => void) {
  const metas = useContext(ABExperimentContext)
  const meta = useMemo(() => metas[slug], [metas, slug])

  try {
    if (!meta) {
      throw new Error(`Cannot find "${slug}" in AB experiments.`)
    }
    return meta
  } catch (error) {
    if (onError) {
      onError(error)
    }
    return null
  }
}

export function useABExperimentConversionTracker(
  slug: string,
  onError?: (error: Error) => void,
): (params?: {
  contentType?: string
  itemId?: string
  itemName?: string
  regionId?: string
  zoneId?: string
}) => void {
  const { trackEvent } = useEventTrackingContext()
  const meta = useABExperimentMeta(slug, onError)

  return useCallback(
    (eventParams) => {
      const { contentType, itemId, itemName, regionId, zoneId } =
        eventParams || {}

      if (meta) {
        const { testId, group } = meta

        trackEvent({
          fa: {
            action: 'experiment_key_conversion',
            experiment_name: slug,
            experiment_id: testId,
            variant_id: group,
            content_type: contentType,
            item_id: itemId,
            item_name: itemName,
            region_id: regionId,
            zone_id: zoneId,
          },
        })
      }
    },
    [meta, slug, trackEvent],
  )
}

export function useABExperimentVariant<T>(
  slug: string,
  variants: {
    [group: string]: T
  },
  fallback: T,
  onError?: (error: Error) => void,
): T {
  const { trackEvent } = useEventTrackingContext()
  const meta = useABExperimentMeta(slug, onError)
  const { testId, group } = meta || {}

  useEffect(() => {
    if (testId && group) {
      trackEvent({
        fa: {
          action: 'enter_experiment',
          experiment_name: slug,
          experiment_id: testId,
          variant_id: group,
        },
      })
    }
  }, [group, slug, testId, trackEvent])

  return group ? variants[group] : fallback
}
