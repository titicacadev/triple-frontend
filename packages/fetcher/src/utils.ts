import humps from 'humps'

import { HttpResponse } from './types'

/**
 * fetcher 의 result 의 key 값을 camelize 처리합니다.
 *
 * Usage
 * const { result, error } = camelize(await get(url, options))
 *
 * @param target fetcher response
 */
export function camelize<T extends object | object[]>(
  target: HttpResponse<T>,
): HttpResponse<T> {
  target.result = humps.camelizeKeys(target.result as any) as T
  return target
}
