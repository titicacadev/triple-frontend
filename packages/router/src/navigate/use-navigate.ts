import {
  checkIfRoutable,
  generateUrl,
  parseUrl,
} from '@titicaca/view-utilities'
import { useCallback } from 'react'
import {
  useClientApp,
  useEnv,
  useSessionAvailability,
  useLoginCtaModal,
  useAppInstallCtaModal,
} from '@titicaca/triple-web'
import { hasAccessibleTripleNativeClients } from '@titicaca/triple-web-to-native-interfaces'
import qs from 'qs'

import { OpenOutlinkOptions, useOpenNativeLink, useOpenOutlink } from '../links'

import canonizeTargetAddress from './canonization'

export function useNavigate({
  changeLocationHref = defaultChangeLocationHref,
  appInstallCtaTriggeredEventAction,
}: {
  changeLocationHref?: (href: string) => void
  appInstallCtaTriggeredEventAction?: string
} = {}) {
  const { webUrlBase, appUrlScheme } = useEnv()
  const sessionAvailable = useSessionAvailability()
  const { show: showAppInstallCtaModal } = useAppInstallCtaModal()
  const { show: showLoginCtaModal } = useLoginCtaModal()
  const app = useClientApp()
  const openOutlink = useOpenOutlink()
  const openNativeLink = useOpenNativeLink()

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

      showAppInstallCtaModal({
        triggeredEventAction: appInstallCtaTriggeredEventAction,
      })
    },
    [
      changeLocationHref,
      showAppInstallCtaModal,
      webUrlBase,
      appInstallCtaTriggeredEventAction,
    ],
  )

  const navigateInApp = useCallback(
    (rawHref: string, options?: OpenOutlinkOptions) => {
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
        openOutlink(rawHref, options)
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
    (rawHref: string, options?: OpenOutlinkOptions) => {
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
          ...(options || {}),
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
    [appUrlScheme, sessionAvailable, showLoginCtaModal],
  )

  return {
    navigate: app ? navigateInApp : navigateInBrowser,
    openWindow,
  }
}

function defaultChangeLocationHref(href: string) {
  window.location.href = href
}
