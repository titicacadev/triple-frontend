import { useExternalHrefHandler } from '@titicaca/router/src/external/href-handler'
import { MouseEvent } from 'react'
import { useEnv } from '@titicaca/react-contexts'
import { useHrefToProps } from '@titicaca/router'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

export default function useATagNavigator() {
  const handleHrefExternally = useExternalHrefHandler()
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
        handleHrefExternally({
          href,
          target: 'new',
          noNavbar: true,
          stopDefaultHandler: () => {
            event.preventDefault()
            event.stopPropagation()
          },
        })
      }
    }
  }

  return aTagNavigator
}
