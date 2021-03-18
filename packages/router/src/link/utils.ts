import qs from 'qs'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

import { AppSpecificLinkProps } from './type'

export function addBasePath(href: string, basePath: string): string {
  const { path } = parseUrl(href)

  return path === '/' ? basePath : `${basePath}${path}`
}

function getlnbTaget(type: string, id: string) {
  switch (type) {
    case 'region':
      return { _triple_lnb_region_id: id }
    case 'trip':
      return { _triple_lnb_trip_id: id }
    case 'zone':
      return { _triple_lnb_zone_id: id }
    default:
      return undefined
  }
}

function composeStringifiedQuery({
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
}: {
  lnbTarget?: {
    [key: string]: string | undefined
  }
  noNavbar?: boolean
  swipeToClose?: boolean
  shouldPresent?: boolean
}) {
  const composedQuery = qs.stringify({
    ...lnbTarget,
    _triple_no_navbar: noNavbar,
    _triple_swipe_to_close: swipeToClose,
    _triple_should_present: shouldPresent,
  })

  return composedQuery
}

export function composeFinalHref({
  href,
  basePath,
  lnbTarget,
  noNavbar,
  swipeToClose,
  shouldPresent,
}: {
  href: string
  basePath?: string
} & AppSpecificLinkProps) {
  return generateUrl(
    {
      path: basePath ? addBasePath(href, basePath) : undefined,
      query: composeStringifiedQuery({
        lnbTarget: lnbTarget
          ? getlnbTaget(lnbTarget.type, lnbTarget.id)
          : undefined,
        noNavbar,
        swipeToClose,
        shouldPresent,
      }),
    },
    href,
  )
}
