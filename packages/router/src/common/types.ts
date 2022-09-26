import { AppSpecificLinkProps } from '@titicaca/react-triple-client-interfaces'

import { AllowSourceProps } from './disabled-link-notifier'
import { TargetProps } from './target'
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
  className?: string
} & HrefProps &
  TargetProps &
  RelListProps &
  AllowSourceProps &
  AppSpecificLinkProps
