import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'

import { ContextOptions } from './types'

export default async function serial(
  { path, query }: UrlElements,
  options: ContextOptions,
  handler: { execute: (url: string) => Promise<void> },
) {
  if (path === '/web-action/serial' && query) {
    const { actions } = qs.parse(query, { ignoreQueryPrefix: true })

    if (actions) {
      for (const actionUrl of actions as string[]) {
        await handler.execute(actionUrl as string)
        await sleep(0.4)
      }
    }

    return true
  }

  return false
}

function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}
