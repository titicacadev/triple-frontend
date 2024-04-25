import {
  useTripleClientMetadata,
  useTripleClientNavigate,
  OutlinkOptions,
  AppSpecificLinkProps,
} from '@titicaca/react-triple-client-interfaces'

import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { TargetProps } from '../common/target'
import { HrefProps } from '../common/types'

import { checkHrefIsAbsoluteUrl } from './utils'

export function useExternalHrefHandler() {
  const app = useTripleClientMetadata()
  const { openInlink, openOutlink } = useTripleClientNavigate()
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
          lnbTarget,
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
