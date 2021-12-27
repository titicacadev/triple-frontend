import { fetcher } from './fetcher'
import { HttpMethods, HttpResponse, RequestOptions } from './types'

export const get = addMethod(fetcher, HttpMethods.GET)
export const put = addMethod(fetcher, HttpMethods.PUT)
export const post = addMethod(fetcher, HttpMethods.POST)
export const del = addMethod(fetcher, HttpMethods.DELETE)

function addMethod(
  fetcher: <SuccessBody, FailureBody = unknown>(
    href: string,
    options: RequestOptions,
  ) => Promise<HttpResponse<SuccessBody, FailureBody>>,
  method: HttpMethods,
) {
  return <SuccessBody, FailureBody = unknown>(
    href: string,
    options?: RequestOptions,
  ) => fetcher<SuccessBody, FailureBody>(href, { ...options, method })
}
