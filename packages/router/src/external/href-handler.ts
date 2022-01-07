import { useUserAgentContext } from '@titicaca/react-contexts'

import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { useAppBridge, OutlinkOptions } from '../common/app-bridge'
import { AppSpecificLinkProps } from '../common/app-specific-link-options'
import { TargetProps } from '../common/target'
import { HrefProps } from '../common/types'

import { checkHrefIsAbsoluteUrl } from './utils'

export function useExternalHrefHandler() {
  const { isPublic } = useUserAgentContext()
  const { openInlink, openOutlink } = useAppBridge()
  const addWebUrlBase = useWebUrlBaseAdder()

  const handleHrefExternally = ({
    href,
    target,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
    title,
    stopDefaultHandler,
  }: HrefProps &
    TargetProps &
    AppSpecificLinkProps &
    Pick<OutlinkOptions, 'title'> & { stopDefaultHandler: () => void }) => {
    const outOfTriple = checkHrefIsAbsoluteUrl(href)

    if (target === 'current' && isPublic === false && outOfTriple === true) {
      stopDefaultHandler()

      return
    }

    if (target === 'new' && isPublic === false) {
      stopDefaultHandler()

      if (outOfTriple === true) {
        openOutlink(href, { title })
      } else {
        openInlink(href, {
          lnbTarget,
          noNavbar,
          shouldPresent,
          swipeToClose,
        })
      }

      return
    }

    if (target === 'browser' && isPublic === false) {
      stopDefaultHandler()

      openOutlink(outOfTriple ? href : addWebUrlBase(href), {
        target: 'browser',
        title,
      })
    }
  }

  return handleHrefExternally
}
