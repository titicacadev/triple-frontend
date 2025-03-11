import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

export function getRedirectUrl(href: string) {
  const currentUrl = decodeURI(window.location.href)

  const redirectUrl = generateUrl(
    {
      query: qs.stringify({
        redirect: currentUrl,
      }),
    },
    href,
  )

  return redirectUrl
}
