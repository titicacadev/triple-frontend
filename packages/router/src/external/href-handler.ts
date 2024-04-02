import { useClientApp } from '@titicaca/triple-web'

import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { TargetProps } from '../common/target'
import { AppSpecificLinkProps, HrefProps } from '../common/types'
import { OpenOutlinkOptions, useOpenInlink, useOpenOutlink } from '../links'

import { checkHrefIsAbsoluteUrl } from './utils'

export function useExternalHrefHandler() {
  const app = useClientApp()
  const addWebUrlBase = useWebUrlBaseAdder()
  const openInlink = useOpenInlink()
  const openOutlink = useOpenOutlink()

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
    Pick<OpenOutlinkOptions, 'title'> & { stopDefaultHandler: () => void }) => {
    const outOfTriple = checkHrefIsAbsoluteUrl(href)

    if (target === 'current' && app && outOfTriple === true) {
      stopDefaultHandler()

      return
    }

    if (target === 'new' && app) {
      stopDefaultHandler()

      if (outOfTriple === true) {
        openOutlink(href, { title })
      } else {
        openInlink(href, {
          lnb: lnbTarget,
          noNavbar,
          shouldPresent,
          swipeToClose,
        })
      }

      return
    }

    if (target === 'browser' && app) {
      stopDefaultHandler()

      openOutlink(outOfTriple ? href : addWebUrlBase(href), {
        target: 'browser',
        title,
      })
    }
  }

  return handleHrefExternally
}
