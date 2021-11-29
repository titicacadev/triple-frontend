import React, {
  AnchorHTMLAttributes,
  Children,
  cloneElement,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'
import {
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import {
  TransitionType,
  useLoginCTAModal,
  useTransitionModal,
} from '@titicaca/modals'

import { RelListProps, useRel } from './use-rel'

export type AllowSource = 'all' | 'app' | 'app-with-session' | 'none'

export interface AllowSourceProps {
  /**
   * 링크가 작동하는 환경을 설정합니다.
   * `all`, `app`, `app-with-session`, `none` 네 가지를 사용할 수 있습니다.
   * 기본 값은 `all`.
   */
  allowSource?: AllowSource
}

/**
 * 조건부 라우팅 검사 로직을 자식 a 엘리먼트에 주입하는 컴포넌트
 */
export function RouterGuardedLink({
  href,
  relList = [],
  allowSource = 'all',
  onClick,
  children,
  ...restProps
}: PropsWithChildren<
  Partial<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'rel'>> &
    RelListProps &
    AllowSourceProps
>) {
  const sessionAvailable = useSessionAvailability()
  const { isPublic } = useUserAgentContext()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCTAModal } = useLoginCTAModal()

  const isDisabledRoute =
    allowSource === 'none' ||
    (allowSource === 'app' && isPublic) ||
    (allowSource === 'app-with-session' &&
      (isPublic || sessionAvailable === false))

  const rel = useRel(relList)

  const disabledLinkClickHandler: MouseEventHandler<HTMLAnchorElement> = (
    e,
  ) => {
    e.preventDefault()

    if (isPublic) {
      showTransitionModal(TransitionType.General)
    } else {
      showLoginCTAModal()
    }
  }

  const anchorProps: Partial<AnchorHTMLAttributes<HTMLAnchorElement>> = {
    ...restProps,
    href: isDisabledRoute ? undefined : href,
    rel,
    onClick: isDisabledRoute ? disabledLinkClickHandler : onClick,
  }

  const child = Children.only(children)

  if (!child || typeof child !== 'object' || !('type' in child)) {
    return <>{children}</>
  }

  warnDuplicateAttributes(child.props, anchorProps)

  return cloneElement(child, anchorProps)
}

function warnDuplicateAttributes(
  originalProps: Record<string, unknown>,
  overridingProps: Record<string, unknown>,
) {
  const originalPropKeys = Object.keys(originalProps)

  originalPropKeys.forEach((key) => {
    if (overridingProps[key]) {
      // eslint-disable-next-line no-console
      console.warn(`Link 컴포넌트의 자식 태그의 속성이 덮어쓰였습니다. ${key}`)
    }
  })
}
