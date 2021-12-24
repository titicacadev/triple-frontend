import { makeDeepLinkGenerator } from '@titicaca/view-utilities'

export const generateDeepLink = makeDeepLinkGenerator({
  oneLinkParams: {
    subdomain: process.env.NEXT_PUBLIC_AF_ONELINK_SUBDOMAIN,
    id: process.env.NEXT_PUBLIC_AF_ONELINK_ID as string,
    pid: process.env.NEXT_PUBLIC_AF_ONELINK_PID as string,
  },
  appScheme: process.env.NEXT_PUBLIC_APP_URL_SCHEME as string,
  webURLBase: process.env.NEXT_PUBLIC_WEB_URL_BASE as string,
})
