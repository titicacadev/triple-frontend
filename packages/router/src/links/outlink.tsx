import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { useClientApp, useEnv } from '@titicaca/triple-web'

import { OutlinkParams, makeOutlink } from './make-outlink'

export interface OutlinkProps
  extends PropsWithChildren,
    Omit<OutlinkParams, 'target'>,
    Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  url: string
  /**
   * 인 앱 웹뷰일 때, 외부 브라우저로 열립니다.
   */
  external?: boolean
}

/**
 * 인 앱 웹뷰에서 누르면 `/outlink`를 사용해서 외부 브라우저로 열립니다.
 * 인 앱 웹뷰가 아니라면 평범한 `<a>` 태그로 작동합니다.
 */
export const Outlink = ({
  children,
  url,
  external,
  title,
  ...props
}: OutlinkProps) => {
  const clientApp = useClientApp()
  const { appUrlScheme } = useEnv()

  const href = clientApp
    ? makeOutlink(appUrlScheme, {
        url,
        target: external ? 'browser' : undefined,
        title,
      })
    : url

  return (
    // url prop이 항상 absolute이므로 local URL일 수가 없기 때문에 a 태그를 사용합니다.
    <a {...props} href={href}>
      {children}
    </a>
  )
}
