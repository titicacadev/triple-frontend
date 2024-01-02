import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useClientApp } from '@titicaca/triple-web/client-app'
import { useEnv } from '@titicaca/triple-web/env'

import { InlinkParams, makeInlink } from './make-inlink'

export interface InlinkProps
  extends PropsWithChildren,
    InlinkParams,
    Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {}

/**
 * 인 앱 웹뷰에서 누르면 `/inlink`를 사용해서 새로운 웹뷰 인스턴스를 생성합니다.
 * 인 앱 웹뷰가 아니라면 Next.js `<Link>` 컴포넌트로 작동합니다.
 */
export const Inlink = ({
  children,
  path,
  lnb,
  noNavbar,
  shouldPresent,
  swipeToClose,
  ...props
}: InlinkProps) => {
  const clientApp = useClientApp()
  const { appUrlScheme } = useEnv()

  const href = clientApp
    ? makeInlink(appUrlScheme, {
        path,
        lnb,
        noNavbar,
        shouldPresent,
        swipeToClose,
      })
    : path

  return (
    // path prop이 local URL일 수도 있기 때문에 Next.js <Link>를 사용합니다.
    // <Link>는 href가 local URL이 아니면 내부적으로 아무 동작도 하지 않으므로 <a> 태그와 동일합니다.
    <Link {...props} href={href}>
      {children}
    </Link>
  )
}
