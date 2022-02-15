import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components'

import {
  AllowSourceProps,
  useDisabledLinkNotifierCreator,
} from '../common/disabled-link-notifier'

import { RelListProps, useRel } from './use-rel'

const Button = styled.button`
  cursor: pointer;
  font-size: 16px;
  background-color: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  text-align: left;
`

const A = styled.a`
  box-sizing: border-box;
  display: inline-block;
  line-height: normal;
`

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
      <Button className={className} onClick={() => disabledLinkNotifier()}>
        {children}
      </Button>
    )
  }

  return (
    <A className={className} rel={rel} {...restProps}>
      {children}
    </A>
  )
}
