import { AppSpecificLinkProps } from '../common/app-specific-link-options'
import { TargetProps } from '../common/target'

import { AllowSourceProps } from './router-guarded-link'
import { RelListProps } from './use-rel'

export interface HrefProps {
  href: string
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
} & HrefProps &
  TargetProps &
  RelListProps &
  AllowSourceProps &
  AppSpecificLinkProps
