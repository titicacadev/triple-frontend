import {
  TransitionType,
  useLoginCtaModal,
  useTransitionModal,
} from '@titicaca/modals'
import {
  checkIfRoutable,
  generateUrl,
  parseUrl,
} from '@titicaca/view-utilities'
import { useCallback } from 'react'
import { useEnv, useSessionAvailability } from '@titicaca/react-contexts'
import {
  OutlinkOptions,
  useTripleClientMetadata,
  useTripleClientNavigate,
} from '@titicaca/react-triple-client-interfaces'
import { hasAccessibleTripleNativeClients } from '@titicaca/triple-web-to-native-interfaces'
import qs from 'qs'

import canonizeTargetAddress from './canonization'

export type NavigateOptions = OutlinkOptions & {
  onFailRoutableInBrowser?: () => void
  onFailRoutableInApp?: () => void
}

export type OpenWindowOptions = OutlinkParams & {
  onFail?: () => void
}

export interface OutlinkParams {
  target?: string
  title?: string
  [key: string]: unknown
}

export interface NavigateProps {
  changeLocationHref?: (href: string) => void
}

function useNavigate({
  changeLocationHref = defaultChangeLocationHref,
}: NavigateProps) {
  const { appUrlScheme, webUrlBase } = useEnv()
  const sessionAvailable = useSessionAvailability()
  const { openOutlink, openNativeLink } = useTripleClientNavigate()
  const app = useTripleClientMetadata()

  const navigateInBrowser = useCallback(
    (rawHref: string, { onFailRoutableInBrowser }: NavigateOptions) => {
      const href = canonizeTargetAddress({
        href: rawHref,
        webUrlBase,
        expandInlinkStrictly: true,
      })

      if (checkIfRoutable({ href })) {
        changeLocationHref(href)
        return
      }

      onFailRoutableInBrowser?.()
    },
    [changeLocationHref, webUrlBase],
  )

  const navigateInApp = useCallback(
    (
      rawHref: string,
      {
        onFailRoutableInApp,
        onFailRoutableInBrowser: _,
        ...params
      }: NavigateOptions,
    ) => {
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
        onFailRoutableInApp?.()

        return
      }

      const { scheme } = parseUrl(rawHref)

      if (scheme === 'http' || scheme === 'https') {
        openOutlink(rawHref, params)
      } else {
        openNativeLink(rawHref)
      }
    },
    [openNativeLink, openOutlink, sessionAvailable, webUrlBase],
  )

  const openWindow = useCallback(
    (rawHref: string, { onFail, ...params }: OpenWindowOptions) => {
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
          onFail?.()
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

export function useAuthNavigate({
  changeLocationHref = defaultChangeLocationHref,
}: { changeLocationHref?: (href: string) => void } = {}) {
  // const { webUrlBase } = useEnv()
  // const sessionAvailable = useSessionAvailability()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCtaModal } = useLoginCtaModal()
  // const app = useTripleClientMetadata()
  // const { openOutlink, openNativeLink } = useTripleClientNavigate()
  const { navigate: _navigate, openWindow: _openWindow } = useNavigate({
    changeLocationHref,
  })

  return {
    navigate: (rawHref: string, params?: OutlinkOptions) =>
      _navigate(rawHref, {
        ...params,
        onFailRoutableInApp: showLoginCtaModal,
        onFailRoutableInBrowser: () =>
          showTransitionModal(TransitionType.General),
      }),
    openWindow: (rawHref: string, params?: OutlinkParams) =>
      _openWindow(rawHref, {
        ...params,
        onFail: showLoginCtaModal,
      }),
  }

  // const navigateInBrowser = useCallback(
  //   (rawHref: string) => {
  //     const href = canonizeTargetAddress({
  //       href: rawHref,
  //       webUrlBase,
  //       expandInlinkStrictly: true,
  //     })

  //     if (checkIfRoutable({ href })) {
  //       changeLocationHref(href)
  //       return
  //     }

  //     showTransitionModal(TransitionType.General)
  //   },
  //   [changeLocationHref, showTransitionModal, webUrlBase],
  // )

  // const navigateInApp = useCallback(
  //   (rawHref: string, params?: OutlinkOptions) => {
  //     const canonizedHref = canonizeTargetAddress({
  //       href: rawHref,
  //       webUrlBase,
  //       expandInlinkStrictly: false,
  //       /* Routability 체크에만 사용하므로 /outlink를 해체합니다. */
  //       allowRawOutlink: false,
  //     })

  //     if (
  //       sessionAvailable === false &&
  //       !checkIfRoutable({ href: canonizedHref })
  //     ) {
  //       showLoginCtaModal()

  //       return
  //     }

  //     const { scheme } = parseUrl(rawHref)

  //     if (scheme === 'http' || scheme === 'https') {
  //       openOutlink(rawHref, params)
  //     } else {
  //       openNativeLink(rawHref)
  //     }
  //   },
  //   [
  //     openNativeLink,
  //     openOutlink,
  //     sessionAvailable,
  //     showLoginCtaModal,
  //     webUrlBase,
  //   ],
  // )

  // return app ? navigateInApp : navigateInBrowser
}

function defaultChangeLocationHref(href: string) {
  window.location.href = href
}
