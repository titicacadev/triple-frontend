/* eslint-disable promise/prefer-await-to-callbacks */

import { get } from '@titicaca/fetcher'

export default class I18nextTripleWebAssetsBackend {
  public type: 'backend' = 'backend'

  public static type: 'backend' = 'backend'

  public read(
    language: string,
    namespace: string,
    callback: (error: Error | null, data: unknown) => void,
  ) {
    return this.loadUrl(
      `https://assets.triple.guide/locales/${language}/${namespace}.json`,
      callback,
    )
  }

  public async loadUrl(
    url: string,
    callback: (error: Error | null, data: unknown) => void,
  ) {
    const response = await get(url)

    if (response.ok === true) {
      const { parsedBody } = response
      callback(null, parsedBody)
    } else {
      callback(new Error(`Failed to fetch ${url}`), false)
    }
  }
}
