import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import { scrollToElement as scrollTo } from '@titicaca/scroll-to-element'

export default async function scrollToElement({ path, query }: UrlElements) {
  if (path === '/web-action/scroll-to-element' && query) {
    const { hash } = qs.parse(query) as {
      hash?: string
    }

    if (hash) {
      const element = document.getElementById(hash)
      element && scrollTo(element, { offset: -52 })
    }

    return true
  }

  return false
}
