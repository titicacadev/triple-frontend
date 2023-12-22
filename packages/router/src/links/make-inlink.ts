import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

type InlinkLnbType = 'trip' | 'zone' | 'region'

export interface InlinkParams {
  /**
   * Inlink로 만들 relative URL.
   */
  path: string
  /**
   * lnb를 위한 속성값. type과 id를 전달 받습니다
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

export function makeInlink(scheme: string, params: InlinkParams) {
  return generateUrl({
    scheme,
    path: '/inlink',
    query: qs.stringify({
      path: generateUrl({
        path: params.path,
        query: qs.stringify({
          ...(params.lnb ? getLnb(params.lnb.type, params.lnb.id) : undefined),
          _triple_no_navbar: params.noNavbar,
          _triple_swipe_to_close: params.swipeToClose,
          _triple_should_present: params.shouldPresent,
        }),
      }),
    }),
  })
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
