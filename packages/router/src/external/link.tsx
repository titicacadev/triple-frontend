import React, { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { parseUrl } from '@titicaca/view-utilities'

import {
  AppSpecificLinkProps,
  useTripleAppRoutingOptionsAdder,
} from '../common/app-specific-link-options'
import { ANCHOR_TARGET_MAP, TargetProps } from '../common/target'
import { OutlinkOptions, useAppBridge } from '../common/app-bridge'
import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { HrefProps } from '../common/types'
import { RouterGuardedLink } from '../link/router-guarded-link'
import { LinkCommonProps } from '../link/types'

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
  const { isPublic } = useUserAgentContext()
  const addTripleAppRoutingOptions = useTripleAppRoutingOptionsAdder()
  const handleHrefExternally = useExternalHrefHandler()

  const hrefIsAbsoluteUrl = checkHrefIsAbsoluteUrl(href)
  const forbiddenLinkCondition =
    !isPublic && hrefIsAbsoluteUrl && target === 'current'

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

    handleHrefExternally({
      href,
      target,
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
      title,
      stopDefaultHandler: () => {
        e.preventDefault()
      },
    })
  }

  useEffect(
    () => {
      if (forbiddenLinkCondition && onError) {
        onError(new Error('현재 창에서 절대 경로로 이동할 수 없습니다.'))
      }
    },
    // onError 변경에 대응하지 않습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forbiddenLinkCondition],
  )

  return (
    <RouterGuardedLink
      href={finalHref}
      relList={hrefIsAbsoluteUrl ? ['external', ...relList] : relList}
      allowSource={forbiddenLinkCondition ? 'none' : allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}

function useExternalHrefHandler() {
  const { isPublic } = useUserAgentContext()
  const addTripleAppRoutingOptions = useTripleAppRoutingOptionsAdder()
  const { openInlink, openOutlink } = useAppBridge()
  const addWebUrlBase = useWebUrlBaseAdder()

  const handleHrefExternally = ({
    href,
    target,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
    title,
    stopDefaultHandler,
  }: HrefProps &
    TargetProps &
    AppSpecificLinkProps &
    Pick<OutlinkOptions, 'title'> & { stopDefaultHandler: () => void }) => {
    const outOfTriple = checkHrefIsAbsoluteUrl(href)

    if (target === 'current' && isPublic === false && outOfTriple === true) {
      stopDefaultHandler()

      return
    }

    const finalHref = addTripleAppRoutingOptions({
      href,
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
    })

    if (target === 'new' && isPublic === false) {
      stopDefaultHandler()

      if (outOfTriple === true) {
        openOutlink(finalHref, { title })
      } else {
        openInlink(finalHref)
      }

      return
    }

    if (target === 'browser' && isPublic === false) {
      stopDefaultHandler()

      openOutlink(outOfTriple ? finalHref : addWebUrlBase(finalHref), {
        target: 'browser',
        title,
      })
    }
  }

  return handleHrefExternally
}

function checkHrefIsAbsoluteUrl(href: string): boolean {
  const { host } = parseUrl(href)
  return !!host
}
