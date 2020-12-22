import React, { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { useAppBridge } from './use-app-bridge'
import { LinkType } from './use-rel'
import { ANCHOR_TARGET_MAP, TargetType } from './target'
import { AllowSource, RouterGuardedLink } from './router-guarded-link'

export function ExternalLink({
  href,
  target,
  relList = [],
  allowSource,
  title,
  onClick,
  onError,
  children,
}: PropsWithChildren<{
  href: string
  target: TargetType
  relList?: LinkType[]
  allowSource?: AllowSource
  title?: string
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
            openOutlink(href, { title })
          } else {
            openInlink(href)
          }
        }

        return

      case 'browser':
        if (!isPublic) {
          e.preventDefault()

          const { scheme, host } = parseUrl(webUrlBase)

          openOutlink(
            outOfTriple ? href : generateUrl({ scheme, host }, href),
            { target: 'browser', title },
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
      href={!forbiddenLinkCondition ? href : undefined}
      relList={outOfTriple ? ['external', ...relList] : relList}
      allowSource={allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
