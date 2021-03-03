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

function addBasePath(
  href: string,
  basePath: string,
  query?: {
    regionId?: string
    zoneId?: string
    noNavbar?: boolean
    swipeToClose?: boolean
  },
): string {
  const { path } = parseUrl(href)
  const queryString = getQueryStringify({ query })

  if (queryString) {
    return generateUrl(
      {
        path: path === '/' ? basePath : `${basePath}${path}`,
        query: queryString,
      },
      href,
    )
  }
  return generateUrl(
    {
      path: path === '/' ? basePath : `${basePath}${path}`,
    },
    href,
  )
}

function getQueryStringify({
  query,
}: {
  query?: {
    regionId?: string
    zoneId?: string
    noNavbar?: boolean
    swipeToClose?: boolean
  }
}) {
  const stringifyQuery = qs.stringify({
    regionId: query?.regionId,
    zoneId: query?.zoneId,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _triple_no_navbar: query?.noNavbar,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _triple_swipe_to_close: query?.swipeToClose,
  })

  if (stringifyQuery) {
    stringifyQuery.replace('=true', '')
  }

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
  query?: {
    regionId?: string
    zoneId?: string
    noNavbar?: boolean
    swipeToClose?: boolean
  }
  onClick?: () => void
}>) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()
  const { basePath } = useRouter()

  const hrefWithBasePath = addBasePath(href, basePath, query)

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

          openInlink(hrefWithBasePath)
        }
        return

      case 'browser':
        if (!isPublic) {
          e.preventDefault()

          openOutlink(addWebUrlBase(hrefWithBasePath, webUrlBase), {
            target: 'browser',
          })
        }
    }
  }

  return (
    <RouterGuardedLink
      href={hrefWithBasePath}
      relList={relList}
      allowSource={allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
