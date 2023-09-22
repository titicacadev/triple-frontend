import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { useEnv } from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

export interface OutlinkProps
  extends PropsWithChildren,
    Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  url: string
  title?: string
}

export const Outlink = ({ children, url, title, ...props }: OutlinkProps) => {
  const { appUrlScheme } = useEnv()
  const app = useTripleClientMetadata()

  const href = app
    ? generateUrl({
        scheme: appUrlScheme,
        path: '/outlink',
        query: qs.stringify({
          url,
          title,
        }),
      })
    : url

  return (
    <a {...props} href={href}>
      {children}
    </a>
  )
}
