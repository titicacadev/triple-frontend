import React, { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import { parseUrl } from '@titicaca/view-utilities'

import { useAppBridge } from './use-app-bridge'
import { ANCHOR_TARGET_MAP } from './target'
import { RouterGuardedLink } from './router-guarded-link'
import { addWebUrlBase } from './add-web-url-base'
import { useTripleAppRoutingOptionsAdder } from './app-specific-link-options'
import { LinkCommonProps } from './types'

export function ExternalLink({
  href,
  target,
  relList = [],
  allowSource,
  title,
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
  onClick,
  onError,
  children,
}: PropsWithChildren<
  LinkCommonProps & {
    /**
     * 새로 열 창의 제목을 지정합니다. 외부 URL이고 target이 "new"이거나 "browser"일 때만 작동합니다.
     */
    title?: string
    /**
     * 링크 규칙 결정에 오류가 있을 때 핸들러입니다.
     * 앱에서 트리플 외부 URL을 현재 창으로 열 수 없습니다.
     */
    onError?: (error: Error) => void
  }
>) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()
  const addTripleAppRoutingOptions = useTripleAppRoutingOptionsAdder()

  const { host } = parseUrl(href)
  const outOfTriple = !!host
  const forbiddenLinkCondition =
    !isPublic && outOfTriple && target === 'current'

  const finalHref = addTripleAppRoutingOptions({
    href,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
  })

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onClick) {
      onClick()
    }

    switch (target) {
      case 'current':
        if (!isPublic && outOfTriple) {
          e.preventDefault()
        }
        return

      case 'new':
        if (!isPublic) {
          e.preventDefault()

          if (outOfTriple) {
            openOutlink(finalHref, { title })
          } else {
            openInlink(finalHref)
          }
        }

        return

      case 'browser':
        if (!isPublic) {
          e.preventDefault()

          openOutlink(
            outOfTriple ? finalHref : addWebUrlBase(finalHref, webUrlBase),
            {
              target: 'browser',
              title,
            },
          )
        }
    }
  }

  useEffect(
    () => {
      if (forbiddenLinkCondition && onError) {
        onError(new Error('현재 창에서 외부 URL로 이동할 수 없습니다.'))
      }
    },
    // onError 변경에 대응하지 않습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forbiddenLinkCondition],
  )

  return (
    <RouterGuardedLink
      href={finalHref}
      relList={outOfTriple ? ['external', ...relList] : relList}
      allowSource={forbiddenLinkCondition ? 'none' : allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
