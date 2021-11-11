import { fetcher } from './fetcher'
import {
  HttpErrorResponse,
  HTTPMethods,
  HttpResponse,
  RequestOptions,
} from './types'

export const get = addMethod(fetcher, HTTPMethods.GET)
export const put = addMethod(fetcher, HTTPMethods.PUT)
export const post = addMethod(fetcher, HTTPMethods.POST)
export const del = addMethod(fetcher, HTTPMethods.DELETE)

function addMethod(
  fetcher: <T, E>(
    href: string,
    options: RequestOptions,
  ) => Promise<HttpResponse<T, E>>,
  method: HTTPMethods,
) {
  return <T extends {}, E = HttpErrorResponse>(
    href: string,
    options?: RequestOptions,
  ): Promise<HttpResponse<T, E>> => fetcher<T, E>(href, { ...options, method })
}
