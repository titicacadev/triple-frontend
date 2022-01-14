import { checkIfRoutable, parseUrl } from '@titicaca/view-utilities'
import { useCallback } from 'react'
import {
  useEnv,
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'

import { OutlinkOptions, useAppBridge } from '../common/app-bridge'
import { useOnTripleClientRequired } from '../common/on-client-required'
import { useOnSessionRequired } from '../common/on-session-required'

import canonizeTargetAddress from './canonization'

export function useNavigate({
  changeLocationHref = defaultChangeLocationHref,
}: { changeLocationHref?: (href: string) => void } = {}) {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()
  const sessionAvailable = useSessionAvailability()
  const { openOutlink, openNativeLink } = useAppBridge()
  const onClientRequired = useOnTripleClientRequired()
  const onSessionRequired = useOnSessionRequired()

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

      onClientRequired()
    },
    [changeLocationHref, onClientRequired, webUrlBase],
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
        onSessionRequired()

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
      onSessionRequired,
      webUrlBase,
    ],
  )

  return isPublic ? navigateInBrowser : navigateInApp
}

function defaultChangeLocationHref(href: string) {
  window.location.href = href
}
