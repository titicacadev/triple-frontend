import qs from 'qs'
import fetch from 'isomorphic-fetch'
import { UrlElements } from '@titicaca/view-utilities'

export default async function fetchApi({ path, query }: UrlElements) {
  const { path: apiPath, method, body } = qs.parse(query, {
    ignoreQueryPrefix: true,
  })

  if (path === '/web-action/fetch-api') {
    await fetch(apiPath, {
      method: method || 'GET',
      ...(body ? { headers: { 'content-type': 'application/json' } } : {}),
      body,
    })

    return true
  }

  return false
}
