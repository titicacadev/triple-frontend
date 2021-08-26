import { fetcher } from './fetcher'
import {
  HttpErrorResponse,
  HTTPMethods,
  HttpResponse,
  RequestOptions,
} from './types'

export const get = async <T extends {}, E = HttpErrorResponse>(
  url: string,
  options?: RequestOptions,
): Promise<HttpResponse<T, E>> =>
  fetcher<T, E>(url, {
    ...options,
    method: HTTPMethods.GET,
  })

export const put = async <T extends {}, E = HttpErrorResponse>(
  url: string,
  options?: RequestOptions,
): Promise<HttpResponse<T, E>> =>
  fetcher<T, E>(url, {
    ...options,
    method: HTTPMethods.PUT,
  })

export const post = async <T extends {}, E = HttpErrorResponse>(
  url: string,
  options?: RequestOptions,
): Promise<HttpResponse<T, E>> =>
  fetcher<T, E>(url, {
    ...options,
    method: HTTPMethods.POST,
  })

export const del = async <T extends {}, E = HttpErrorResponse>(
  url: string,
  options?: RequestOptions,
): Promise<HttpResponse<T, E>> =>
  fetcher<T, E>(url, {
    ...options,
    method: HTTPMethods.DELETE,
  })
