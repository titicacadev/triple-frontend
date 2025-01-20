import { MouseEvent } from 'react'
import { useExternalRouter, useHrefToProps } from '@titicaca/router'
import { useClientApp, useEnv } from '@titicaca/triple-web'

export default function useATagNavigator() {
  const routeExternally = useExternalRouter()
  const { webUrlBase } = useEnv()
  const convertHrefToProps = useHrefToProps()
  const app = useClientApp()

  const aTagNavigator = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const eventTarget = event.target as HTMLElement

    if (eventTarget.tagName === 'A') {
      const originHref = eventTarget.getAttribute('href') ?? ''

      const href =
        originHref.includes(webUrlBase) && app
          ? convertHrefToProps(originHref).href
          : originHref

      if (href) {
        routeExternally({
          href,
          target: 'browser',
          noNavbar: true,
        })
      }
    }
  }

  return aTagNavigator
}
