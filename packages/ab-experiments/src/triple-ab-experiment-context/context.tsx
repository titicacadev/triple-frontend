/* eslint-disable @typescript-eslint/naming-convention */
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  useEventTrackingContext,
  useSessionAvailability,
} from '@titicaca/react-contexts'

import { TripleABExperimentMeta, getTripleABExperiment } from './service'

interface TripleABExperimentMetas {
  [key: string]: TripleABExperimentMeta | undefined
}

const TripleABExperimentContext = createContext<TripleABExperimentMetas>({})

export function TripleABExperimentProvider({
  slug,
  meta: metaFromSSR,
  onError: onErrorFromProps,
  children,
}: PropsWithChildren<{
  slug: string
  /**
   * SSR 단계에서 조회한 값을 넣어 줄 수 있는 prop
   */
  meta?: TripleABExperimentMeta
  onError?: (error: unknown) => void
}>) {
  const sessionAvailable = useSessionAvailability()
  const onErrorRef = useRef(onErrorFromProps)
  const experimentMetas = useContext(TripleABExperimentContext)
  const [meta, setMeta] = useState(metaFromSSR)

  useEffect(() => {
    const onError = onErrorRef.current

    async function fetchAndSetMeta() {
      const response = await getTripleABExperiment(slug)

      if (response.ok === false) {
        const { status, url } = response

        if (onError !== undefined) {
          onError(new Error(`${status} - ${url}`))
        }
        return
      }

      const { parsedBody } = response

      setMeta(parsedBody)
    }

    if (!metaFromSSR && sessionAvailable === true) {
      fetchAndSetMeta()
    }
  }, [metaFromSSR, sessionAvailable, slug])

  const value = useMemo(
    () => ({ ...experimentMetas, [slug]: meta }),
    [experimentMetas, slug, meta],
  )

  return (
    <TripleABExperimentContext.Provider value={value}>
      {children}
    </TripleABExperimentContext.Provider>
  )
}

function useTripleABExperimentMeta(
  slug: string,
  onError?: (error: Error) => void,
) {
  const sessionAvailable = useSessionAvailability()

  const metas = useContext(TripleABExperimentContext)
  const meta = useMemo(() => metas[slug], [metas, slug])

  try {
    if (!meta) {
      throw new Error(`Cannot find "${slug}" in AB experiments.`)
    }
    return meta
  } catch (error) {
    if (sessionAvailable === true && onError) {
      // session이 없을 때 발생한 에러는 리포팅 할 필요 없습니다.
      onError(error as Error)
    }
    return null
  }
}

interface OptionalAttributes {
  content_type?: string
  item_id?: string
  item_name?: string
  region_id?: string
  zone_id?: string
}
type ReservedAttributes =
  | 'action'
  | 'experiment_name'
  | 'experiment_id'
  | 'variant_id'
type EventAttributes<T = OptionalAttributes> = keyof T &
  ReservedAttributes extends never
  ? T
  : Omit<T, ReservedAttributes>

/**
 * 주어진 slug의 AB 테스트 전환 이벤트를 기록합니다.
 * 콜백 함수가 받는 파라미터는 이벤트에 따라 선택적으로 넣어줄 수 있습니다.
 * @param slug 실험 slug
 * @param onError
 */

export function useTripleABExperimentConversionTracker(
  slug: string,
  onError?: (error: Error) => void,
): <T = OptionalAttributes>(params?: EventAttributes<T>) => void {
  const { trackEvent } = useEventTrackingContext()
  const meta = useTripleABExperimentMeta(slug, onError)

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
 * 주어진 slug의 AB 테스트 노출 이벤트를 기록합니다.
 * 콜백 함수가 받는 파라미터는 이벤트에 따라 선택적으로 넣어줄 수 있습니다.
 * @param slug 실험 slug
 * @param onError
 */

export function useTripleABExperimentImpressionTracker(
  slug: string,
  onError?: (error: Error) => void,
): <T = OptionalAttributes>(params?: EventAttributes<T>) => void {
  const { trackEvent } = useEventTrackingContext()
  const meta = useTripleABExperimentMeta(slug, onError)

  return useCallback(
    (eventParams) => {
      if (meta) {
        const { testId, group } = meta

        trackEvent({
          fa: {
            action: 'experiment_impression',
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
export function useTripleABExperimentVariant<T, U = OptionalAttributes>(
  slug: string,
  variants: {
    [group: string]: T
  },
  fallback: T,
  onError?: (error: Error) => void,
  eventAttributesFromProps?: EventAttributes<U>,
): T {
  const { trackEvent } = useEventTrackingContext()
  const meta = useTripleABExperimentMeta(slug, onError)
  const eventAttributesRef = useRef(eventAttributesFromProps)

  const { testId, group } = meta || {}

  useEffect(() => {
    if (testId && group) {
      trackEvent({
        fa: {
          action: 'enter_experiment',
          experiment_name: slug,
          experiment_id: testId,
          variant_id: group,
          ...eventAttributesRef.current,
        },
      })
    }
  }, [group, slug, testId, trackEvent])

  return group && group in variants ? variants[group] : fallback
}

export function useTripleABExperimentContext() {
  const context = useContext(TripleABExperimentContext)

  if (context === undefined) {
    throw new Error('TripleABExperimentProvider is required')
  }

  return context
}
