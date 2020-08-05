import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'

import { ContextOptions } from './types'

export default async function serial(
  { path, query }: UrlElements,
  options: ContextOptions,
  { execute }: { execute: (url: string) => Promise<void> },
) {
  if (path === '/web-action/serial') {
    const { actions } = qs.parse(query, { ignoreQueryPrefix: true })

    if (actions) {
      for (const actionUrl of actions as string[]) {
        await execute(actionUrl as string)
        await sleep(0.5)
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
