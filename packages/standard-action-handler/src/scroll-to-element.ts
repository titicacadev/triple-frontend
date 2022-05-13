import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import { scrollToElement as scrollTo } from '@titicaca/scroll-to-element'
import { App } from '@titicaca/react-triple-client-interfaces'

export default async function scrollToElement(
  { path, query }: UrlElements,
  { app }: { app?: App | null },
) {
  if (path === '/web-action/scroll-to-element' && query) {
    const { hash } = qs.parse(query) as {
      hash?: string
    }

    if (hash) {
      const element = document.getElementById(hash)
      element && scrollTo(element, { offset: app ? -102 : -110 })
    }

    return true
  }

  return false
}
