import {
  createContext,
  useContext,
  ComponentType,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { DeepPartial } from 'utility-types'
import {
  hasAccessibleTripleNativeClients,
  trackScreen as nativeTrackScreen,
  trackEvent as nativeTrackEvent,
  viewItem as nativeViewItem,
} from '@titicaca/triple-web-to-native-interfaces'
import { getApps as getFirebaseApps } from 'firebase/app'
import {
  getAnalytics as getFirebaseAnalytics,
  logEvent as logFirebaseEvent,
  setUserId,
} from 'firebase/analytics'
import { useSearchParams } from 'next/navigation'

import { useUser } from '../../session-context'
import {
  FirebaseAnalyticsParams,
  GoogleAnalyticsParams,
  PixelParams,
} from '../types'

const NOOP = () => {}

export interface EventTrackingContextValue {
  trackScreen: (
    screenPath: string,
    label?: string,
    additionalMetadata?: { [key: string]: string },
  ) => void
  trackEvent: (params: {
    ga?: GoogleAnalyticsParams
    fa?: Partial<FirebaseAnalyticsParams>
    /**
     * Facebook Pixel 이벤트 파라미터
     *
     * type을 "track"으로 설정하면 주어진 action만 사용할 수 있습니다.
     * 그리고 type을 생략하면 맞춤 이벤트를 사용합니다.
     */
    pixel?: PixelParams
  }) => void
  viewItem: typeof nativeViewItem
  /**
   * Firebase Analytics Web 인스턴스에 User ID를 설정하는 함수.
   * @param userId 빈 문자열이나 null을 넣으면 userId를 지울 수 있습니다.
   */
  setFirebaseUserId: (userId: string | null) => void
}

const Context = createContext<EventTrackingContextValue>({
  trackScreen: NOOP,
  trackEvent: NOOP,
  viewItem: NOOP,
  setFirebaseUserId: NOOP,
})

const DEFAULT_EVENT_NAME = 'user_interaction'
const WEB_FA_EVENT_NAME = 'web_user_interaction'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

/**
 * Firebase Analytics Web이 자동으로 page_view 이벤트를 기록하지 않게 설정하는 함수
 *
 * 참고: https://github.com/firebase/firebase-js-sdk/issues/3988
 * 이후 버전(>= 9)에서 더 나은 해결책이 나올 수도 있습니다.
 */
function disableFirebaseAutoPageView() {
  function gtag(..._: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    gtag('set', { send_page_view: false })
  }
}

function getFirebaseAnalyticsWebInstance() {
  if (
    typeof navigator !== 'undefined' &&
    !hasAccessibleTripleNativeClients() &&
    getFirebaseApps().length > 0
  ) {
    disableFirebaseAutoPageView()

    return getFirebaseAnalytics()
  }

  return null
}

interface EventTrackingProviderProps {
  page: {
    label: string
    path: string
  }
  item?: {
    id: string
    type: string
    name: string
    regionId?: string
    zoneId?: string
    referrer?: string
  }
  onError?: (error: Error) => void
}

declare global {
  interface Window {
    ga?: (
      method: 'send' | 'set',
      type: 'pageview' | 'event' | 'page',
      ...data: (string | undefined)[]
    ) => void
    fbq?: (
      type: 'track' | 'trackCustom',
      action: string,
      payload?: { [key: string]: unknown },
    ) => void
  }
}

export function EventTrackingProvider({
  page,
  item,
  onError: onErrorFromProps,
  children,
}: PropsWithChildren<EventTrackingProviderProps>) {
  const user = useUser()

  const onErrorRef = useRef(onErrorFromProps)
  const searchParams = useSearchParams()

  const trackScreen: EventTrackingContextValue['trackScreen'] = useCallback(
    (
      path: string,
      label?: string,
      additionalMetadata?: { [key: string]: string },
    ) => {
      try {
        if (window.ga) {
          window.ga('set', 'page', path)
          window.ga('send', 'pageview')
        }

        if (window.fbq && label) {
          window.fbq('trackCustom', `PageView_${label}`, { path })
        }

        const firebaseAnalyticsWebInstance = getFirebaseAnalyticsWebInstance()

        if (firebaseAnalyticsWebInstance) {
          logFirebaseEvent(firebaseAnalyticsWebInstance, 'page_view', {
            page_path: path,
            category: label,
          })
        }

        nativeTrackScreen(path, label, additionalMetadata)
      } catch (error) {
        onErrorRef.current?.(error as Error)
      }
    },
    [],
  )

  const trackEvent: EventTrackingContextValue['trackEvent'] = useCallback(
    ({ ga, fa, pixel }) => {
      try {
        if (window.ga && ga) {
          const [action, label] = ga
          window.ga('send', 'event', page.label, action, label)
        }

        if (window.fbq && pixel) {
          const { type = 'trackCustom', action, payload } = pixel

          window.fbq(type, action, { pageLabel: page.label, ...payload })
        }

        const firebaseAnalyticsWebInstance = getFirebaseAnalyticsWebInstance()

        if (firebaseAnalyticsWebInstance && fa) {
          logFirebaseEvent(firebaseAnalyticsWebInstance, WEB_FA_EVENT_NAME, {
            category: page.label,
            ...fa,
          })
        }

        nativeTrackEvent({
          ga: ga && [page.label, ...ga],
          fa: fa && {
            category: page.label,
            event_name: DEFAULT_EVENT_NAME,
            ...fa,
          },
        })
      } catch (error) {
        onErrorRef.current?.(error as Error)
      }
    },
    [page.label],
  )

  const setFirebaseUserId: EventTrackingContextValue['setFirebaseUserId'] =
    useCallback((userId) => {
      const firebaseAnalyticsWebInstance = getFirebaseAnalyticsWebInstance()

      if (firebaseAnalyticsWebInstance) {
        setUserId(firebaseAnalyticsWebInstance, userId || '')
      }
    }, [])

  const value = useMemo<EventTrackingContextValue>(
    () => ({
      viewItem: nativeViewItem,
      trackScreen: (path: string, label?: string) => {
        if (path === page?.path) {
          /* eslint-disable-next-line no-console */
          console.warn(
            'trackScreen이 중복으로 기록될 수 있습니다. EventTrackingProvider를 확인하세요.',
          )
        }

        return trackScreen(path, label)
      },
      trackEvent,
      setFirebaseUserId,
    }),
    [setFirebaseUserId, trackEvent, trackScreen, page.path],
  )

  useEffect(() => {
    setFirebaseUserId(user?.uid || null)
  }, [setFirebaseUserId, user?.uid])

  useEffect(() => {
    if (page?.path) {
      const utmParams = Array.from(searchParams.keys())
        .filter((key) => key.match(/^utm_/i))
        .reduce(
          (params, key) => ({
            ...params,
            [key.replace(/^utm_/, '')]: searchParams.get(key),
          }),
          {},
        )

      trackScreen(page?.path, page.label, utmParams)
    }
  }, [trackScreen, page?.path, page.label, searchParams])

  useEffect(() => {
    if (item?.id) {
      const { type, id, name } = item

      nativeViewItem({
        contentType: type,
        itemId: id,
        itemName: name,
      })
    }
  }, [item?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useEventTrackingContext() {
  return useContext(Context)
}

export type WithEventTrackingBaseProps = EventTrackingContextValue

export function withEventTracking<
  P extends DeepPartial<WithEventTrackingBaseProps>,
>(Component: ComponentType<P>) {
  return function EventTrackingComponent(
    props: Omit<P, keyof WithEventTrackingBaseProps>,
  ) {
    return (
      <Context.Consumer>
        {({ trackScreen, trackEvent, viewItem }) => (
          <Component
            {...({
              ...props,
              trackScreen,
              trackEvent,
              viewItem,
            } as P)}
          />
        )}
      </Context.Consumer>
    )
  }
}
