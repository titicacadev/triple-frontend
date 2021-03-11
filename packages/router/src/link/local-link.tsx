import React, { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react'
import Router, { useRouter } from 'next/router'
import qs from 'qs'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { useAppBridge } from './use-app-bridge'
import { LinkType } from './use-rel'
import { ANCHOR_TARGET_MAP, TargetType } from './target'
import { AllowSource, RouterGuardedLink } from './router-guarded-link'
import { addWebUrlBase } from './add-web-url-base'

function addBasePath(href: string, basePath: string): string {
  const { path } = parseUrl(href)

  return path === '/' ? basePath : `${basePath}${path}`
}

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

/**
 * https://github.com/vercel/next.js/blob/7d48241949bc7bac7b8e30fda6be71f37286886f/packages/next/client/link.tsx#L64
 * which 속성은 deprecated 됐다고 하여 사용하지 않습니다.
 *
 * @param e 앵커 태그 클릭 이벤트
 */
export function isKeyPressingClick(e: MouseEvent<HTMLAnchorElement>): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}

/**
 * 같은 도메인의 페이지로 이동할 때 사용하는 링크 컴포넌트
 */
export function LocalLink({
  href,
  target,
  relList,
  allowSource,
  replace,
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
  onClick,
  children,
}: PropsWithChildren<{
  href: string
  target: TargetType
  relList?: LinkType[]
  allowSource?: AllowSource
  replace?: boolean
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
}>) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()
  const { basePath } = useRouter()

  const finalHref =
    (lnbTarget || noNavbar || shouldPresent) && !isPublic
      ? generateUrl(
          {
            path: addBasePath(href, basePath),
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
      : generateUrl({ path: addBasePath(href, basePath) }, href)

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onClick) {
      onClick()
    }

    switch (target) {
      case 'current':
        if (isKeyPressingClick(e)) {
          return
        }

        e.preventDefault()

        Router[replace ? 'replace' : 'push'](href)
        window.scrollTo(0, 0)
        return

      case 'new':
        if (!isPublic) {
          e.preventDefault()

          openInlink(finalHref)
        }
        return

      case 'browser':
        if (!isPublic) {
          e.preventDefault()

          openOutlink(addWebUrlBase(finalHref, webUrlBase), {
            target: 'browser',
          })
        }
    }
  }

  return (
    <RouterGuardedLink
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
