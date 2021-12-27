import React, { MouseEvent, MouseEventHandler, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { useAppBridge } from './use-app-bridge'
import { ANCHOR_TARGET_MAP, TargetProps } from './target'
import { RouterGuardedLink } from './router-guarded-link'
import { useWebUrlBaseAdder } from './add-web-url-base'
import {
  AppSpecificLinkProps,
  useTripleAppRoutingOptionsAdder,
} from './app-specific-link-options'
import { HrefProps, LinkCommonProps } from './types'

function addBasePath(href: string, basePath: string): string {
  const { path, ...rest } = parseUrl(href)
  const newPath = path === '/' ? basePath : `${basePath}${path}`

  return generateUrl({ path: newPath, ...rest })
}

/**
 * https://github.com/vercel/next.js/blob/7d48241949bc7bac7b8e30fda6be71f37286886f/packages/next/client/link.tsx#L64
 * which 속성은 deprecated 됐다고 하여 사용하지 않습니다.
 *
 * @param e 앵커 태그 클릭 이벤트
 */
function isKeyPressingClick(e: MouseEvent<HTMLAnchorElement>): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}

interface NextjsRoutingOptions {
  /**
   * 현재 창을 history에 남기지 않고 이동합니다. target="current"일 때만 작동합니다.
   */
  replace?: boolean
  /**
   * 현재창에서 라우팅할 때 페이지 스크롤을 상단으로 올릴지 여부를 결정합니다.
   * 기본 값 true
   */
  scroll?: boolean
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
  children,
}: PropsWithChildren<LinkCommonProps & NextjsRoutingOptions>) {
  const { basePath } = useRouter()
  const addTripleAppRoutingOptions = useTripleAppRoutingOptionsAdder()
  const handleHrefLocally = useLocalHrefHandler()

  const finalHref = addTripleAppRoutingOptions({
    href: addBasePath(href, basePath),
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
  })

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

function useLocalHrefHandler() {
  const router = useRouter()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()
  const addTripleAppRoutingOptions = useTripleAppRoutingOptionsAdder()
  const addWebUrlBase = useWebUrlBaseAdder()

  const { basePath } = router

  const handleNextjsRouting = async (
    href: string,
    { replace, scroll = true }: NextjsRoutingOptions,
  ): Promise<void> => {
    const success = await router[replace ? 'replace' : 'push'](
      href,
      undefined,
      {
        scroll,
      },
    )
    if (success && scroll) {
      window.scrollTo(0, 0)
    }
  }

  const handleHrefLocally = async ({
    href,
    target,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
    replace,
    scroll,
    isKeyPressing,
    stopDefaultHandler,
  }: HrefProps &
    TargetProps &
    NextjsRoutingOptions &
    AppSpecificLinkProps & {
      isKeyPressing: boolean
      stopDefaultHandler: () => void
    }) => {
    if (target === 'current' && isKeyPressing === false) {
      stopDefaultHandler()

      await handleNextjsRouting(href, { replace, scroll })

      return
    }

    const finalHref = addTripleAppRoutingOptions({
      href: addBasePath(href, basePath),
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
    })

    if (target === 'new' && isPublic === false) {
      stopDefaultHandler()

      openInlink(finalHref)

      return
    }

    if (target === 'browser' && isPublic === false) {
      stopDefaultHandler()

      openOutlink(addWebUrlBase(finalHref), {
        target: 'browser',
      })
    }
  }

  return handleHrefLocally
}
