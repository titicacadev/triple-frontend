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
import { TripleQueryType } from './type'

function addBasePath(href: string, basePath: string): string {
  const { path } = parseUrl(href)

  return path === '/' ? basePath : `${basePath}${path}`
}

function composeStringifiedQuery(query?: TripleQueryType) {
  const stringifyQuery = qs.stringify({
    _triple_target: query?.target,
    _triple_lnb_region_id: query?.regionId,
    _triple_lnb_zone_id: query?.zoneId,
    _triple_lnb_trip_id: query?.tripId,
    _triple_no_navbar: query?.noNavbar,
    _triple_swipe_to_close: query?.swipeToClose,
    _triple_should_present: query?.shouldPresent,
  })

  return stringifyQuery
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
  query,
  onClick,
  children,
}: PropsWithChildren<{
  href: string
  target: TargetType
  relList?: LinkType[]
  allowSource?: AllowSource
  replace?: boolean
  query?: TripleQueryType
  onClick?: () => void
}>) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()
  const { basePath } = useRouter()

  const finalHref = () => {
    if (query) {
      return generateUrl(
        {
          path: addBasePath(href, basePath),
          query: composeStringifiedQuery(query),
        },
        href,
      )
    }
    return generateUrl(
      {
        path: addBasePath(href, basePath),
      },
      href,
    )
  }

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

          openInlink(finalHref())
        }
        return

      case 'browser':
        if (!isPublic) {
          e.preventDefault()

          openOutlink(addWebUrlBase(finalHref(), webUrlBase), {
            target: 'browser',
          })
        }
    }
  }

  return (
    <RouterGuardedLink
      href={finalHref()}
      relList={relList}
      allowSource={allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
