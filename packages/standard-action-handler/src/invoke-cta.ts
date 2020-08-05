import { UrlElements } from '@titicaca/view-utilities'

import { ContextOptions } from './types'

export default async function invokeCta(
  { path }: UrlElements,
  { navigate, cta }: ContextOptions,
) {
  if (path === '/web-action/cta') {
    if (cta) {
      navigate(cta)

      return true
    }
  }

  return false
}
