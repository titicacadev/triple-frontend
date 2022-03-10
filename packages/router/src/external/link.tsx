import { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { ANCHOR_TARGET_MAP } from '../common/target'
import { RouterGuardedLink } from '../common/router-guarded-link'
import { LinkCommonProps } from '../common/types'

import { useExternalHrefHandler } from './href-handler'
import { checkHrefIsAbsoluteUrl } from './utils'

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
  className,
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
  const app = useTripleClientMetadata()
  const handleHrefExternally = useExternalHrefHandler()

  const hrefIsAbsoluteUrl = checkHrefIsAbsoluteUrl(href)
  const forbiddenLinkCondition =
    app && hrefIsAbsoluteUrl && target === 'current'

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
      className={className}
      href={href}
      relList={hrefIsAbsoluteUrl ? ['external', ...relList] : relList}
      allowSource={forbiddenLinkCondition ? 'none' : allowSource}
      onClick={handleClick}
      target={ANCHOR_TARGET_MAP[target]}
    >
      {children}
    </RouterGuardedLink>
  )
}
