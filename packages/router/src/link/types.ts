import { AppSpecificLinkProps } from './app-specific-link-options'
import { AllowSourceProps } from './router-guarded-link'
import { TargetType } from './target'
import { RelListProps } from './use-rel'

/**
 * LocalLink, ExternalLink 공통으로 쓰는 props
 */
export type LinkCommonProps = {
  /**
   * 페이지를 이동할 목표를 설정합니다.
   * `current`, `new`, `browser` 세 가지를 사용할 수 있습니다.
   * 각각 현재 창, 새 창(새 웹뷰), 기본 브라우저(앱에서만 작동)를 의미합니다.
   */
  target: TargetType
  /**
   * anchor를 클릭했을 때 작동하는 핸들러입니다.
   * `allowSource` 조건에 의해 사용할 수 없는 링크이면 클릭해도 작동하지 않습니다.
   */
  onClick?: () => void
} & RelListProps &
  AllowSourceProps &
  AppSpecificLinkProps
