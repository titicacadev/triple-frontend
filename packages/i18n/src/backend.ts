import fetch from 'isomorphic-fetch'

export default class I18nextFetchBackend {
  type: 'backend' = 'backend'

  static type: 'backend' = 'backend'

  read(language: string, namespace: string, callback: Function) {
    return this.loadUrl(
      `https://assets.triple-dev.titicaca-corp.com/locales/${language}/${namespace}.json`,
      callback,
    )
  }

  async loadUrl(url: string, callback: Function) {
    const response = await fetch(url)

    if (response.ok) {
      callback(null, await response.json())
    } else {
      callback(new Error(`Failed to fetch ${url}`), false)
    }
  }
}
