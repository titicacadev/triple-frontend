import { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react'

import { ANCHOR_TARGET_MAP } from '../common/target'
import { RouterGuardedLink } from '../common/router-guarded-link'
import { LinkCommonProps } from '../common/types'

import { useBasePathAdder } from './base-path'
import { NextjsRoutingOptions, useLocalHrefHandler } from './href-handler'

/**
 * https://github.com/vercel/next.js/blob/7d48241949bc7bac7b8e30fda6be71f37286886f/packages/next/client/link.tsx#L64
 * which 속성은 deprecated 됐다고 하여 사용하지 않습니다.
 *
 * @param e 앵커 태그 클릭 이벤트
 */
function isKeyPressingClick(e: MouseEvent<HTMLAnchorElement>): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}

/**
 * 같은 도메인의 페이지로 이동할 때 사용하는 링크 컴포넌트
 * href에 basePath를 제외한 값을 넣습니다.
 */
export function LocalLink({
  href,
  target,
  relList,
  allowSource,
  replace,
  scroll = true,
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
  onClick,
  className,
  children,
}: PropsWithChildren<LinkCommonProps & NextjsRoutingOptions>) {
  const handleHrefLocally = useLocalHrefHandler()
  const addBasePath = useBasePathAdder()

  const finalHref = addBasePath(href)

  const handleClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    if (onClick) {
      onClick()
    }

    await handleHrefLocally({
      href,
      target,
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
      replace,
      scroll,
      isKeyPressing: isKeyPressingClick(e),
      stopDefaultHandler: () => {
        e.preventDefault()
      },
    })
  }

  return (
    <RouterGuardedLink
      className={className}
      href={finalHref}
      relList={relList}
      allowSource={allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
