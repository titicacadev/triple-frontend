import { AppSpecificLinkProps } from '@titicaca/react-triple-client-interfaces'

import {
  AllowSourceProps,
  useDisabledLinkNotifierCreator,
} from '../common/disabled-link-notifier'
import { TargetProps } from '../common/target'
import { HrefProps } from '../common/types'
import useDefaultRouter from '../common/default-router'

import { useBasePathAdder } from './base-path'
import { NextjsRoutingOptions, useLocalHrefHandler } from './href-handler'

export default function useLocalRouter() {
  const customRouter = useLocalHrefHandler()
  const addBasePath = useBasePathAdder()
  const createDisabledLinkNotifier = useDisabledLinkNotifierCreator()
  const defaultRouter = useDefaultRouter()

  const routeLocally = async ({
    allowSource,
    href,
    target,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
    replace,
    scroll,
  }: AllowSourceProps &
    HrefProps &
    TargetProps &
    AppSpecificLinkProps &
    NextjsRoutingOptions) => {
    const notifyDisabledLink = createDisabledLinkNotifier({ allowSource })

    if (notifyDisabledLink !== undefined) {
      notifyDisabledLink()

      return
    }

    let hrefHandled = false

    await customRouter({
      href,
      target,
      lnbTarget,
      noNavbar,
      shouldPresent,
      swipeToClose,
      replace,
      scroll,
      isKeyPressing: false,
      stopDefaultHandler: () => {
        hrefHandled = true
      },
    })

    if (hrefHandled === false) {
      const hrefWithBasePath = addBasePath(href)

      defaultRouter({ href: hrefWithBasePath, target })
    }
  }

  return routeLocally
}
