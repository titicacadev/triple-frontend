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
