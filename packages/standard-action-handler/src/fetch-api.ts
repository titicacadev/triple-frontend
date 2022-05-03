import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import { get } from '@titicaca/fetcher'

export default async function fetchApi({ path, query }: UrlElements) {
  if (path === '/web-action/fetch-api' && query) {
    const { path: apiPath, body } = qs.parse(query, {
      ignoreQueryPrefix: true,
    })

    await get(apiPath as string, {
      ...(body ? { headers: { 'content-type': 'application/json' } } : {}),
      body: body as string,
    })

    return true
  }

  return false
}
