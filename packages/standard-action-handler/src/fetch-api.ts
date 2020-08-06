import qs from 'qs'
import fetch from 'isomorphic-fetch'
import { UrlElements } from '@titicaca/view-utilities'

export default async function fetchApi({ path, query }: UrlElements) {
  const { path: apiPath, method, body } = qs.parse(query, {
    ignoreQueryPrefix: true,
  })

  if (path === '/web-action/fetch-api') {
    await fetch(apiPath as string, {
      method: (method as string) || 'GET',
      ...(body ? { headers: { 'content-type': 'application/json' } } : {}),
      body: body as string,
    })

    return true
  }

  return false
}
