import React, { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import qs from 'qs'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { useAppBridge } from './use-app-bridge'
import { LinkType } from './use-rel'
import { ANCHOR_TARGET_MAP, TargetType } from './target'
import { AllowSource, RouterGuardedLink } from './router-guarded-link'
import { addWebUrlBase } from './add-web-url-base'

function getlnbTaget(type: string, id: string) {
  switch (type) {
    case 'region':
      return { _triple_lnb_region_id: id }
    case 'trip':
      return { _triple_lnb_trip_id: id }
    case 'zone':
      return { _triple_lnb_zone_id: id }
    default:
      return undefined
  }
}

function composeStringifiedQuery({
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
}: {
  lnbTarget?: {
    [key: string]: string | undefined
  }
  noNavbar?: boolean
  swipeToClose?: boolean
  shouldPresent?: boolean
}) {
  const composedQuery = qs.stringify({
    ...lnbTarget,
    _triple_no_navbar: noNavbar,
    _triple_swipe_to_close: swipeToClose,
    _triple_should_present: shouldPresent,
  })

  return composedQuery
}

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
}: PropsWithChildren<{
  href: string
  target: TargetType
  relList?: LinkType[]
  allowSource?: AllowSource
  title?: string
  /**
   *lnb를 위한 속성값. type과 id를 전달 받습니다
   *@param lnbTarget
   */
  lnbTarget?: {
    type: 'trip' | 'zone' | 'region'
    id: string
  }
  /**
   *인앱 웹뷰 상단 네비게이션 바를 가립니다.
   *@param noNavbar
   */
  noNavbar?: boolean
  /**
   *네비게이션 스택이 아닌 팝업으로 화면을 뛰우빈다 (lnb X)
   *웹뷰 최상단에서 아래로 당기면 화면을 닫습니다 (iosOnly)
   *@param swipeToClose
   */
  swipeToClose?: boolean
  /**
   *lnb를 위한 속성값. type과 id를 전달 받습니다
   *네비게이션 스택이 아닌 팝업으로 화면을 뛰웁니다. (lnb X)
   *웹뷰 최상단에서 아래로 당겨도 화면을 닫지 않습니다. (iosOnly)
   *@param lnbTarget
   */
  shouldPresent?: boolean
  onClick?: () => void
  onError?: (error: Error) => void
}>) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()

  const { host } = parseUrl(href)
  const outOfTriple = !!host
  const forbiddenLinkCondition =
    !isPublic && outOfTriple && target === 'current'

  const finalHref =
    (lnbTarget || noNavbar || shouldPresent) && !isPublic
      ? generateUrl(
          {
            query: composeStringifiedQuery({
              lnbTarget: lnbTarget
                ? getlnbTaget(lnbTarget.type, lnbTarget.id)
                : undefined,
              noNavbar,
              swipeToClose,
              shouldPresent,
            }),
          },
          href,
        )
      : href

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
