import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'

export default async function fetchApi({ path, query }: UrlElements) {
  if (path === '/web-action/fetch-api' && query) {
    const {
      path: apiPath,
      method,
      body,
    } = qs.parse(query, {
      ignoreQueryPrefix: true,
    })

    await fetch(apiPath as string, {
      method: (method as string) || 'GET',
      ...(body ? { headers: { 'content-type': 'application/json' } } : {}),
      body: body as string,
    })

    return true
  }

  return false
}
