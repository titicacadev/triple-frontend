/* eslint-disable promise/prefer-await-to-callbacks */

import fetch from 'isomorphic-fetch'

export default class I18nextFetchBackend {
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
    const response = await fetch(url)

    if (response.ok) {
      callback(null, await response.json())
    } else {
      callback(new Error(`Failed to fetch ${url}`), false)
    }
  }
}
