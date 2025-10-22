import { useCallback } from 'react'
import { useClientApp, useEnv } from '@titicaca/triple-web'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

type InlinkLnbType = 'trip' | 'zone' | 'region'

export interface MakeInlinkOptions {
  /**
   * true 일 때, inlink path에 basePath를 포함합니다.
   * Next.js <Link> 컴포넌트와 함께 사용합니다.
   */
  local?: boolean
  /**
   * lnb를 위한 속성값. type과 id를 전달 받습니다.
   */
  lnb?: {
    type: InlinkLnbType
    id: string
  }
  /**
   * 인앱 웹뷰 상단 네비게이션 바를 가립니다.
   */
  noNavbar?: boolean
  /**
   * 네비게이션 스택이 아닌 팝업으로 화면을 띄웁니다. (lnb가 없습니다.)
   * 웹뷰 최상단에서 아래로 당기면 화면을 닫습니다. (iOS only)
   */
  swipeToClose?: boolean
  /**
   * 네비게이션 스택이 아닌 팝업으로 화면을 띄웁니다. (lnb가 없습니다.)
   * 웹뷰 최상단에서 아래로 당겨도 화면을 닫지 않습니다. (iOS only)
   */
  shouldPresent?: boolean
}

export function useMakeInlink() {
  const clientApp = useClientApp()
  const { appUrlScheme, basePath } = useEnv()

  const makeInlink = useCallback(
    (
      /**
       * Inlink로 만들 relative URL.
       */
      path: string,
      options?: MakeInlinkOptions,
    ) => {
      if (!clientApp) {
        return path
      }

      return generateUrl({
        scheme: appUrlScheme,
        path: '/inlink',
        query: qs.stringify({
          path: generateUrl({
            path: options?.local ? basePath + path : path,
            query: qs.stringify({
              ...(options?.lnb
                ? getLnb(options.lnb.type, options.lnb.id)
                : undefined),
              _triple_no_navbar: options?.noNavbar,
              _triple_swipe_to_close: options?.swipeToClose,
              _triple_should_present: options?.shouldPresent,
            }),
          }),
        }),
      })
    },
    [clientApp, appUrlScheme, basePath],
  )

  return makeInlink
}

function getLnb(type: InlinkLnbType, id: string) {
  switch (type) {
    case 'region':
      return { _triple_lnb_region_id: id }
    case 'trip':
      return { _triple_lnb_trip_id: id }
    case 'zone':
      return { _triple_lnb_zone_id: id }
  }
}
