import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react'

import {
  AllowSourceProps,
  useDisabledLinkNotifierCreator,
} from '../common/disabled-link-notifier'

import { RelListProps, useRel } from './use-rel'

/**
 * 조건부 라우팅 검사 로직을 자식 a 엘리먼트에 주입하는 컴포넌트
 */
export function RouterGuardedLink({
  relList = [],
  allowSource = 'all',
  children,
  className,
  ...restProps
}: PropsWithChildren<
  Partial<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'rel'>> &
    RelListProps &
    AllowSourceProps
>) {
  const rel = useRel(relList)
  const createDisabledLinkNotifier = useDisabledLinkNotifierCreator()

  const disabledLinkNotifier = createDisabledLinkNotifier({ allowSource })

  if (disabledLinkNotifier !== undefined) {
    return (
      <button className={className} onClick={() => disabledLinkNotifier()}>
        {children}
      </button>
    )
  }

  return (
    <a className={className} rel={rel} {...restProps}>
      {children}
    </a>
  )
}
