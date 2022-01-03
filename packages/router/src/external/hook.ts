import { AppSpecificLinkProps } from '../common/app-specific-link-options'
import useDefaultRouter from '../common/default-router'
import {
  AllowSourceProps,
  useDisabledLinkNotifierCreator,
} from '../common/disabled-link-notifier'
import { TargetProps } from '../common/target'
import { HrefProps } from '../common/types'
import { OutlinkOptions } from '../common/app-bridge'

import { useExternalHrefHandler } from './href-handler'

export default function useExternalRouter() {
  const customRouter = useExternalHrefHandler()
  const createDisabledLinkNotifier = useDisabledLinkNotifierCreator()
  const defaultRouter = useDefaultRouter()

  const routeExternally = ({
    allowSource,
    href,
    target,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
    title,
  }: AllowSourceProps &
    HrefProps &
    TargetProps &
    AppSpecificLinkProps &
    Pick<OutlinkOptions, 'title'>) => {
    const notifyDisabledLink = createDisabledLinkNotifier({ allowSource })

    if (notifyDisabledLink !== undefined) {
      notifyDisabledLink()

      return
    }

    let hrefHandled = false

    customRouter({
      href,
      target,
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
      title,
      stopDefaultHandler: () => {
        hrefHandled = true
      },
    })

    if (hrefHandled === false) {
      defaultRouter({ href, target })
    }
  }

  return routeExternally
}
