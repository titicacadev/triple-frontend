/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable promise/prefer-await-to-then */
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
    fetchLocaleAsset({ language, namespace })
      .then((asset) => callback(null, asset))
      .catch((error) => {
        callback(error, null)
      })
  }
}

async function fetchLocaleAsset({
  language,
  namespace,
}: {
  language: string
  namespace: string
}) {
  const assetUrl = `https://assets.triple.guide/locales/${language}/${namespace}.json`
  const response = await get(assetUrl)

  if (response.ok === true) {
    const { parsedBody } = response
    return parsedBody
  }

  throw new Error(`Fail to fetch ${assetUrl}`)
}
