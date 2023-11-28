import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { useEnv } from '@titicaca/triple-web'
import {
  useTripleClientMetadata,
  AppSpecificLinkProps,
  appSpecificLinkOptions,
} from '@titicaca/react-triple-client-interfaces'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

export interface InlinkProps
  extends PropsWithChildren,
    AppSpecificLinkProps,
    Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  path: string
}

export const Inlink = ({
  children,
  path,
  lnbTarget,
  noNavbar,
  shouldPresent,
  swipeToClose,
  ...props
}: InlinkProps) => {
  const { appUrlScheme } = useEnv()
  const app = useTripleClientMetadata()

  const href = app
    ? generateUrl({
        scheme: appUrlScheme,
        path: '/inlink',
        query: qs.stringify({
          path: appSpecificLinkOptions({
            href: path,
            lnbTarget,
            noNavbar,
            shouldPresent,
            swipeToClose,
          }),
        }),
      })
    : path

  return (
    <a {...props} href={href}>
      {children}
    </a>
  )
}
