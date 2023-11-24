import { MouseEvent } from 'react'
import { useEnv } from '@titicaca/react-contexts'
import { useExternalRouter, useHrefToProps } from '@titicaca/router'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

export default function useATagNavigator() {
  const routeExternally = useExternalRouter()
  const { webUrlBase } = useEnv()
  const convertHrefToProps = useHrefToProps()
  const app = useTripleClientMetadata()

  const aTagNavigator = (event: MouseEvent) => {
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
          target: 'new',
          noNavbar: true,
        })
      }
    }
  }

  return aTagNavigator
}
