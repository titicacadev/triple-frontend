import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'
import Cookies from 'universal-cookie'

export function getRedirectUrl(href: string) {
  const currentUrl = decodeURI(window.location.href)
  const deviceId = new Cookies(document.cookie).get<string>(
    'x-triple-web-device-id',
  )

  const redirectUrl = generateUrl({
    href,
    query: qs.stringify({
      returnUrl: currentUrl,
      deviceId,
    }),
  })

  return redirectUrl
}
