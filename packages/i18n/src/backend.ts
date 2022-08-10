/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/prefer-await-to-callbacks */

import { get } from '@titicaca/fetcher'

export default class I18nextTripleWebAssetsBackend {
  public type: 'backend' = 'backend'
  private dev = false

  public static type: 'backend' = 'backend'

  public init(_: unknown, backendConfig: unknown) {
    const hasDevFlag = (config: unknown): config is { dev: boolean } =>
      typeof config === 'object' && config !== null && 'dev' in config

    if (hasDevFlag(backendConfig)) {
      this.dev = backendConfig.dev
    }
  }

  public read(
    language: string,
    namespace: string,
    callback: (error: Error | null, data: unknown) => void,
  ) {
    fetchLocaleAsset({ language, namespace, dev: this.dev })
      .then((asset) => callback(null, asset))
      .catch((error) => {
        callback(error, null)
      })
  }
}

const PRODUCTION_TRIPLE_WEB_ASSETS_URL = 'https://assets.triple.guide'
const DEV_TRIPLE_WEB_ASSETS_URL = 'https://assets.triple-dev.titicaca-corp.com'

async function fetchLocaleAsset({
  language,
  namespace,
  dev = false,
}: {
  language: string
  namespace: string
  dev?: boolean
}) {
  const urlBase = dev
    ? DEV_TRIPLE_WEB_ASSETS_URL
    : PRODUCTION_TRIPLE_WEB_ASSETS_URL
  const assetUrl = `${urlBase}/locales/${language}/${namespace}.json`
  const response = await get(assetUrl)

  if (response.ok === true) {
    const { parsedBody } = response
    return parsedBody
  }

  throw new Error(`Fail to fetch ${assetUrl}`)
}
