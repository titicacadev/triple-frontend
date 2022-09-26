import { fetcher } from './fetcher'
import { HttpMethods, HttpResponse, RequestOptions } from './types'

export const get = addMethod(fetcher, HttpMethods.Get)
export const put = addMethod(fetcher, HttpMethods.Put)
export const post = addMethod(fetcher, HttpMethods.Post)
export const del = addMethod(fetcher, HttpMethods.Delete)

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
