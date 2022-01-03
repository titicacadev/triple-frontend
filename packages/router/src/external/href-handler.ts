import { useUserAgentContext } from '@titicaca/react-contexts'

import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { useAppBridge, OutlinkOptions } from '../common/app-bridge'
import {
  useTripleAppRoutingOptionsAdder,
  AppSpecificLinkProps,
} from '../common/app-specific-link-options'
import { TargetProps } from '../common/target'
import { HrefProps } from '../common/types'

import { checkHrefIsAbsoluteUrl } from './utils'

export function useExternalHrefHandler() {
  const { isPublic } = useUserAgentContext()
  const addTripleAppRoutingOptions = useTripleAppRoutingOptionsAdder()
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

    const finalHref = addTripleAppRoutingOptions({
      href,
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
    })

    if (target === 'new' && isPublic === false) {
      stopDefaultHandler()

      if (outOfTriple === true) {
        openOutlink(finalHref, { title })
      } else {
        openInlink(finalHref)
      }

      return
    }

    if (target === 'browser' && isPublic === false) {
      stopDefaultHandler()

      openOutlink(outOfTriple ? finalHref : addWebUrlBase(finalHref), {
        target: 'browser',
        title,
      })
    }
  }

  return handleHrefExternally
}
