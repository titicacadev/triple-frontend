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

/**
 * 주어진 slug의 AB 테스트 전환 이벤트를 기록합니다.
 * 콜백 함수가 받는 파라미터는 이벤트에 따라 선택적으로 넣어줄 수 있습니다.
 * @param slug 실험 slug
 * @param onError
 */
export function useABExperimentConversionTracker(
  slug: string,
  onError?: (error: Error) => void,
): (params?: {
  [key: string]: string | undefined
  content_type?: string
  item_id?: string
  item_name?: string
  region_id?: string
  zone_id?: string
  action: never
  experiment_name: never
  experiment_id: never
  variant_id: never
}) => void {
  const { trackEvent } = useEventTrackingContext()
  const meta = useABExperimentMeta(slug, onError)

  return useCallback(
    (eventParams) => {
      if (meta) {
        const { testId, group } = meta

        trackEvent({
          fa: {
            action: 'experiment_key_conversion',
            experiment_name: slug,
            experiment_id: testId,
            variant_id: group,
            ...eventParams,
          },
        })
      }
    },
    [meta, slug, trackEvent],
  )
}

/**
 * 주어진 slug의 실험 variant를 선택합니다.
 * @param slug 실험 slug
 * @param variants 실험 선택지. A, B, C, D...를 key 값으로 하는 객체
 * @param fallback 실험을 찾을 수 없거나 variants에 현재 실험군이 설정되어있지 않으면 반환하는 값
 * @param onError
 */
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

  return group && group in variants ? variants[group] : fallback
}
