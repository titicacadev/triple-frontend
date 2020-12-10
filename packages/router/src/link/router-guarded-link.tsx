import React, {
  AnchorHTMLAttributes,
  Children,
  cloneElement,
  PropsWithChildren,
} from 'react'
import {
  useSessionContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import {
  TransitionType,
  useLoginCTAModal,
  useTransitionModal,
} from '@titicaca/modals'

import { LinkType, useRel } from './use-rel'

export type AllowSource = 'all' | 'app' | 'app-with-session'

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
  Partial<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'rel'>> & {
    href: string
    relList?: LinkType[]
    /**
     * 라우팅 가능 환경을 결정하는 prop. 기본 값은 all.
     *
     * all | app | app-with-session
     */
    allowSource?: AllowSource
  }
>) {
  const { hasSessionId } = useSessionContext()
  const { isPublic } = useUserAgentContext()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCTAModal } = useLoginCTAModal()

  const isDisabledRoute =
    (allowSource === 'app' && isPublic) ||
    (allowSource === 'app-with-session' && (isPublic || !hasSessionId))

  const rel = useRel([
    ...relList,
    ...(isDisabledRoute ? ['nofollow' as const] : []),
  ])

  const anchorProps: Partial<AnchorHTMLAttributes<HTMLAnchorElement>> = {
    ...restProps,
    href,
    rel,
    onClick: (e) => {
      if (isDisabledRoute) {
        e.preventDefault()

        if (isPublic) {
          showTransitionModal(TransitionType.General)
        } else {
          showLoginCTAModal()
        }

        return
      }

      if (onClick) {
        onClick(e)
      }
    },
  }

  const child = Children.only(children)

  if (!child || typeof child !== 'object' || !('type' in child)) {
    return <>{children}</>
  }

  return cloneElement(child, anchorProps)
}
