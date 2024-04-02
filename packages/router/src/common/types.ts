import { AllowSourceProps } from './disabled-link-notifier'
import { TargetProps } from './target'
import { RelListProps } from './use-rel'

export interface HrefProps {
  href: string
}

type LnbTargetType = 'trip' | 'zone' | 'region'

export interface AppSpecificLinkProps {
  /**
   *lnb를 위한 속성값. type과 id를 전달 받습니다
   *@param lnbTarget
   */
  lnbTarget?: {
    type: LnbTargetType
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

/**
 * LocalLink, ExternalLink 공통으로 쓰는 props
 */
export type LinkCommonProps = {
  /**
   * anchor를 클릭했을 때 작동하는 핸들러입니다.
   * `allowSource` 조건에 의해 사용할 수 없는 링크이면 클릭해도 작동하지 않습니다.
   */
  onClick?: () => void
  className?: string
} & HrefProps &
  TargetProps &
  RelListProps &
  AllowSourceProps &
  AppSpecificLinkProps
