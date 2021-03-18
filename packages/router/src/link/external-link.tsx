import React, { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { useAppBridge } from './use-app-bridge'
import { LinkType } from './use-rel'
import { ANCHOR_TARGET_MAP, TargetType } from './target'
import { AllowSource, RouterGuardedLink } from './router-guarded-link'
import { addWebUrlBase } from './add-web-url-base'
import { AppSpecificLinkProps } from './type'
import { getlnbTaget, composeStringifiedQuery } from './utils'

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
  {
    href: string
    target: TargetType
    relList?: LinkType[]
    allowSource?: AllowSource
    title?: string
    onClick?: () => void
    onError?: (error: Error) => void
  } & AppSpecificLinkProps
>) {
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
