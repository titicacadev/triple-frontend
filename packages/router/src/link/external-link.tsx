import React, { MouseEventHandler, PropsWithChildren } from 'react'
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
  children,
}: PropsWithChildren<{
  href: string
  target: TargetType
  relList?: LinkType[]
  allowSource?: AllowSource
  title?: string
  onClick?: () => void
}>) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()

  const { host } = parseUrl(href)
  const outOfTriple = !!host

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onClick) {
      onClick()
    }

    switch (target) {
      case 'current':
        if (!isPublic && outOfTriple) {
          e.preventDefault()
          // TODO: 처리 방법 고민: error | 침묵 | 새창 열기
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

  return (
    <RouterGuardedLink
      href={href}
      relList={outOfTriple ? ['external', ...relList] : relList}
      allowSource={allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
