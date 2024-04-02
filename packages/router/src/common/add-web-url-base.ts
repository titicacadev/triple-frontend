import { useEnv } from '@titicaca/triple-web'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'

export function useWebUrlBaseAdder() {
  const { webUrlBase } = useEnv()

  const addWebUrlBaseToHref = (href: string) => {
    const { scheme, host } = parseUrl(webUrlBase)

    if (href === '/') {
      return webUrlBase
    }

    return generateUrl({ scheme, host }, href)
  }

  return addWebUrlBaseToHref
}
