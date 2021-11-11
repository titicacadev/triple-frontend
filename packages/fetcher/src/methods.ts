import { fetcher } from './fetcher'
import { HTTPMethods, HttpResponse, RequestOptions } from './types'

export const get = addMethod(fetcher, HTTPMethods.GET)
export const put = addMethod(fetcher, HTTPMethods.PUT)
export const post = addMethod(fetcher, HTTPMethods.POST)
export const del = addMethod(fetcher, HTTPMethods.DELETE)

function addMethod(
  fetcher: <SuccessBody, FailureBody = unknown>(
    href: string,
    options: RequestOptions,
  ) => Promise<HttpResponse<SuccessBody, FailureBody>>,
  method: HTTPMethods,
) {
  return <SuccessBody, FailureBody = unknown>(
    href: string,
    options?: RequestOptions,
  ) => fetcher<SuccessBody, FailureBody>(href, { ...options, method })
}
