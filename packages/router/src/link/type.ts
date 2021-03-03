/**
 * target: 해당 url을 아웃링크로 실행합니다.
 * regionId: lnb를 위한 regionId값을 전달 받습니다.
 * zoneId: lnb를 위한 zoneId값을 전달 받습니다.
 * tripId: lnb를 위한 tripId값을 전달 받습니다.
 * noNavbar: 인앱 웹뷰 상단 네비게이션 바를 가립니다.
 * swipeToClose: 네비게이션 스택이 아닌 팝업으로 화면을 띄웁니다. (lnb가 없습니다.)
 *               웹뷰 최상단에서 아래로 당기면 화면을 닫습니다. (iOS only)
 * shouldPresent: 네비게이션 스택이 아닌 팝업으로 화면을 띄웁니다. (lnb가 없습니다.)
 *                웹뷰 최상단에서 아래로 당겨도 화면을 닫지 않습니다. (iOS only)
 *
 * @param TripleQueryType
 */

export interface TripleQueryType {
  target?: string
  regionId?: string
  zoneId?: string
  tripId?: string
  noNavbar?: boolean
  swipeToClose?: boolean
  shouldPresent?: boolean
}
