import qs from 'qs'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

export interface AppSpecificLinkProps {
  /**
   *lnb를 위한 속성값. type과 id를 전달 받습니다
   *@param lnbTarget
   */
  lnbTarget?: {
    type: 'trip' | 'zone' | 'region'
    id: string
  }
  /**
   *인앱 웹뷰 상단 네비게이션 바를 가립니다.
   *@param noNavbar
   */
  noNavbar?: boolean
  /**
   *네비게이션 스택이 아닌 팝업으로 화면을 뛰우빈다 (lnb X)
   *웹뷰 최상단에서 아래로 당기면 화면을 닫습니다 (iosOnly)
   *@param swipeToClose
   */
  swipeToClose?: boolean
  /**
   *lnb를 위한 속성값. type과 id를 전달 받습니다
   *네비게이션 스택이 아닌 팝업으로 화면을 뛰웁니다. (lnb X)
   *웹뷰 최상단에서 아래로 당겨도 화면을 닫지 않습니다. (iosOnly)
   *@param lnbTarget
   */
  shouldPresent?: boolean
}

export function addBasePath(
  href: string,
  basePath?: string,
): string | undefined {
  const { path } = parseUrl(href)

  return path === '/' ? basePath : `${basePath}${path}`
}

function getlnbTaget(type: string, id: string) {
  switch (type) {
    case 'region':
      return { _triple_lnb_region_id: id }
    case 'trip':
      return { _triple_lnb_trip_id: id }
    case 'zone':
      return { _triple_lnb_zone_id: id }
    default:
      return undefined
  }
}

function composeStringifiedQuery({
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
}: {
  lnbTarget?: {
    [key: string]: string | undefined
  }
  noNavbar?: boolean
  swipeToClose?: boolean
  shouldPresent?: boolean
}) {
  const composedQuery = qs.stringify({
    ...lnbTarget,
    _triple_no_navbar: noNavbar,
    _triple_swipe_to_close: swipeToClose,
    _triple_should_present: shouldPresent,
  })

  return composedQuery
}

export function appSpecificLinkOptions({
  href,
  basePath,
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
}: {
  href: string
  basePath?: string
} & AppSpecificLinkProps) {
  return generateUrl(
    {
      path: addBasePath(href, basePath),
      query: composeStringifiedQuery({
        lnbTarget: lnbTarget
          ? getlnbTaget(lnbTarget.type, lnbTarget.id)
          : undefined,
        noNavbar,
        swipeToClose,
        shouldPresent,
      }),
    },
    href,
  )
}
