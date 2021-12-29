import {
  TransitionType,
  useLoginCTAModal,
  useTransitionModal,
} from '@titicaca/modals'
import {
  checkIfRoutable,
  generateUrl,
  parseUrl,
} from '@titicaca/view-utilities'
import { useCallback } from 'react'
import {
  useEnv,
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import qs from 'qs'

import { OutlinkOptions } from '../common/app-bridge'

import canonizeTargetAddress from './canonization'

export function useNavigate({
  changeLocationHref = defaultChangeLocationHref,
}: { changeLocationHref?: (href: string) => void } = {}) {
  const { webUrlBase, appUrlScheme } = useEnv()
  const { isPublic } = useUserAgentContext()
  const sessionAvailable = useSessionAvailability()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCtaModal } = useLoginCTAModal()

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
        const outlinkParams = qs.stringify({
          url: rawHref,
          ...(params || {}),
        })

        window.location.href = `${appUrlScheme}:///outlink?${outlinkParams}`
      } else {
        window.location.href = generateUrl({ scheme: appUrlScheme }, rawHref)
      }
    },
    [appUrlScheme, sessionAvailable, showLoginCtaModal, webUrlBase],
  )

  return isPublic ? navigateInBrowser : navigateInApp
}

function defaultChangeLocationHref(href: string) {
  window.location.href = href
}
