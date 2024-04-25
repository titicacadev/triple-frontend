import {
  TransitionType,
  useLoginCtaModal,
  useTransitionModal,
} from '@titicaca/modals'
import { checkIfRoutable, parseUrl } from '@titicaca/view-utilities'
import { useCallback } from 'react'
import { useEnv, useSessionAvailability } from '@titicaca/react-contexts'
import {
  OutlinkOptions,
  useTripleClientMetadata,
  useTripleClientNavigate,
} from '@titicaca/react-triple-client-interfaces'

import canonizeTargetAddress from './canonization'

export function useNavigate({
  changeLocationHref = defaultChangeLocationHref,
}: { changeLocationHref?: (href: string) => void } = {}) {
  const { webUrlBase } = useEnv()
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

      showTransitionModal(TransitionType.General)
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

  return app ? navigateInApp : navigateInBrowser
}

function defaultChangeLocationHref(href: string) {
  window.location.href = href
}
