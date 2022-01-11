import React, {
  AnchorHTMLAttributes,
  Children,
  cloneElement,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'

import {
  AllowSourceProps,
  useDisabledLinkNotifierCreator,
} from '../common/disabled-link-notifier'

import { RelListProps, useRel } from './use-rel'

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
  const rel = useRel(relList)
  const createDisabledLinkNotifier = useDisabledLinkNotifierCreator()

  const disabledLinkNotifier = createDisabledLinkNotifier({ allowSource })

  const isDisabledRoute = disabledLinkNotifier !== undefined

  const disabledLinkClickHandler: MouseEventHandler<HTMLAnchorElement> = (
    e,
  ) => {
    if (disabledLinkNotifier === undefined) {
      return
    }

    e.preventDefault()

    disabledLinkNotifier()
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
