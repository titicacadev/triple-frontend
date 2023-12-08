import {
  checkIfRoutable,
  generateUrl,
  parseUrl,
} from '@titicaca/view-utilities'
import { useCallback } from 'react'
import {
  useEnv,
  useSessionAvailability,
  useLoginCtaModal,
  useTransitionModal,
  TransitionType,
} from '@titicaca/triple-web'
import {
  OutlinkOptions,
  useTripleClientMetadata,
  useTripleClientNavigate,
} from '@titicaca/react-triple-client-interfaces'
import { hasAccessibleTripleNativeClients } from '@titicaca/triple-web-to-native-interfaces'
import qs from 'qs'

import canonizeTargetAddress from './canonization'

export function useNavigate({
  transitionType = TransitionType.General,
  changeLocationHref = defaultChangeLocationHref,
}: {
  changeLocationHref?: (href: string) => void
  transitionType?: TransitionType
} = {}) {
  const { webUrlBase, appUrlScheme } = useEnv()
  const sessionAvailable = useSessionAvailability()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCtaModal } = useLoginCtaModal()
  const app = useTripleClientMetadata()
  const { openOutlink, openNativeLink } = useTripleClientNavigate()

  const navigateInBrowser = useCallback(
    (rawHref: string) => {
      const href = canonizeTargetAddress({
        href: rawHref,
        webUrlBase,
        expandInlinkStrictly: true,
      })

      if (checkIfRoutable({ href })) {
        changeLocationHref(href)
        return
      }

      showTransitionModal(transitionType)
    },
    [changeLocationHref, showTransitionModal, webUrlBase],
  )

  const navigateInApp = useCallback(
    (rawHref: string, params?: OutlinkOptions) => {
      const canonizedHref = canonizeTargetAddress({
        href: rawHref,
        webUrlBase,
        expandInlinkStrictly: false,
        /* Routability 체크에만 사용하므로 /outlink를 해체합니다. */
        allowRawOutlink: false,
      })

      if (
        sessionAvailable === false &&
        !checkIfRoutable({ href: canonizedHref })
      ) {
        showLoginCtaModal()

        return
      }

      const { scheme } = parseUrl(rawHref)

      if (scheme === 'http' || scheme === 'https') {
        openOutlink(rawHref, params)
      } else {
        openNativeLink(rawHref)
      }
    },
    [
      openNativeLink,
      openOutlink,
      sessionAvailable,
      showLoginCtaModal,
      webUrlBase,
    ],
  )

  const openWindow = useCallback(
    (rawHref: string, params?: OutlinkOptions) => {
      if (!hasAccessibleTripleNativeClients()) {
        window.open(rawHref, undefined, 'noopener')
        return
      }

      if (!appUrlScheme) {
        return
      }

      const { href, scheme, host = '' } = parseUrl(rawHref)

      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: href,
          ...(params || {}),
        })

        window.location.href = generateUrl({
          scheme: appUrlScheme,
          path: '/outlink',
          query: outlinkParams,
        })
      } else if (!scheme && !host) {
        if (sessionAvailable === true || checkIfRoutable({ href: rawHref })) {
          window.location.href = generateUrl({
            scheme: appUrlScheme,
            path: '/inlink',
            query: `path=${encodeURIComponent(rawHref)}`,
          })
        } else {
          showLoginCtaModal()
        }
      }
    },
    [appUrlScheme, sessionAvailable],
  )

  return {
    navigate: app ? navigateInApp : navigateInBrowser,
    openWindow,
  }
}

function defaultChangeLocationHref(href: string) {
  window.location.href = href
}
