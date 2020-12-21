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

export function useABExperimentConversionTracker(
  slug: string,
): (params?: {
  contentType?: string
  itemId?: string
  itemName?: string
  regionId?: string
  zoneId?: string
}) => void {
  const { trackEvent } = useEventTrackingContext()
  const metas = useContext(ABExperimentContext)

  const { testId, group } = metas[slug] || {}

  return useCallback(
    (eventParams) => {
      const { contentType, itemId, itemName, regionId, zoneId } =
        eventParams || {}

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
    },
    [group, slug, testId, trackEvent],
  )
}

export function useABExperimentVariant<T>(
  slug: string,
  variants: {
    [group: string]: T
  },
  fallback: T,
): T {
  const { trackEvent } = useEventTrackingContext()
  const metas = useContext(ABExperimentContext)

  const { testId, group } = metas[slug] || {}

  useEffect(() => {
    trackEvent({
      fa: {
        action: 'enter_experiment',
        experiment_name: slug,
        experiment_id: testId,
        variant_id: group,
      },
    })
  }, [group, slug, testId, trackEvent])

  return group ? variants[group] : fallback
}
