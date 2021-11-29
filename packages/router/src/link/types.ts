import { AppSpecificLinkProps } from './app-specific-link-options'
import { AllowSourceProps } from './router-guarded-link'
import { TargetProps } from './target'
import { RelListProps } from './use-rel'

/**
 * LocalLink, ExternalLink 공통으로 쓰는 props
 */
export type LinkCommonProps = {
  /**
   * anchor를 클릭했을 때 작동하는 핸들러입니다.
   * `allowSource` 조건에 의해 사용할 수 없는 링크이면 클릭해도 작동하지 않습니다.
   */
  onClick?: () => void
} & TargetProps &
  RelListProps &
  AllowSourceProps &
  AppSpecificLinkProps
