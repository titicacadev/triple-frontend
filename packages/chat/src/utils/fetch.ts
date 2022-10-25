import { IncomingMessage } from 'http'

import fetch from 'isomorphic-fetch'
import qs from 'qs'
import Cookies from 'universal-cookie'
import { generateUrl } from '@titicaca/view-utilities'

/* eslint-disable */
export enum SuppressErrorType {
  ALL,
  STATUS_4XX,
  OFF,
}

export interface RequestBuilderOptions extends RequestInit {
  req?: IncomingMessage
  params?: {
    [key: string]: any
  }
}

export interface FetchWithResponse<T> {
  status: number
  ok: boolean
  result: T
}

export interface FetchWithOptions extends RequestBuilderOptions {
  responseType?: string
  silently?: boolean
  defaultResult?: any
  abortController?: AbortController
  suppressErrorTracking?: SuppressErrorType
  captureException?: (e: Error) => any
}

export interface FetchResult {
  status: number
  ok: boolean
  result: any
}

const suppressError = (suppress: SuppressErrorType, status: number) => {
  const status4xx = status >= 400 && status < 500

  switch (suppress) {
    case SuppressErrorType.ALL: {
      return true
    }
    case SuppressErrorType.STATUS_4XX: {
      return status4xx
    }
    case SuppressErrorType.OFF: {
      return false
    }
  }
}

export default class FetchHttp {
  private sessionKey: string

  private apiUriBase: string

  constructor({
                sessionKey,
                apiUriBase,
              }: {
    sessionKey: string
    apiUriBase: string
  }) {
    this.sessionKey = sessionKey
    this.apiUriBase = apiUriBase
  }

  private buildRequest(
    apiPath: string,
    {
      req,
      params = {},
      headers: extraHeaders,
      ...reqInit
    }: RequestBuilderOptions = {},
  ): [string, RequestInit] {
    const sessionId = req
      ? new Cookies(req.headers.cookie).get(this.sessionKey)
      : undefined

    const headers = {
      ...(sessionId ? { [this.sessionKey]: sessionId } : {}),
      ...(extraHeaders || {}),
    }

    return [
      generateUrl(
        {
          path: apiPath,
          query: qs.stringify(params, { skipNulls: true, indices: false }),
        },
        req ? this.apiUriBase : '',
      ) as string,
      {
        headers,
        ...(!sessionId ? { credentials: 'same-origin' } : {}),
        ...reqInit,
      } as RequestInit,
    ]
  }

  async fetch(apiPath: string, opts: FetchWithOptions = {}) {
    const {
      responseType = 'json',
      silently = false,
      defaultResult,
      abortController = null,
      suppressErrorTracking = SuppressErrorType.OFF,
      captureException,
      ...builderOptions
    } = opts
    const method = builderOptions.method || 'GET'
    const [url, request] = this.buildRequest(apiPath, builderOptions)
    const { signal } = abortController || {}
    const response = await fetch(url, { ...request, ...(signal && { signal }) })
    const { ok, status } = response
    const isCaptureSuppressed = suppressError(suppressErrorTracking, status)

    const fetchResult: FetchResult = { status, ok, result: defaultResult }

    try {
      const resultBody =
        responseType === 'json' ? await response.json() : await response.text()
      if (!ok) {
        const err = new Error(
          `[${status}] Failed to fetch ${method} request of '${apiPath}' with response '${JSON.stringify(
            resultBody,
          )}'`,
        )
        if (silently) {
          isCaptureSuppressed || (captureException && captureException(err))

          return fetchResult
        } else {
          throw err
        }
      }

      fetchResult.result = resultBody
      return fetchResult
    } catch (e) {
      const err = !ok
        ? new Error(
          `[${status}] Failed to fetch ${method} request of '${apiPath}' with response.json() parsing error: ${e}`,
        )
        : null

      if (silently) {
        err &&
        (isCaptureSuppressed || (captureException && captureException(err)))
        isCaptureSuppressed || (captureException && captureException(e as any))

        return fetchResult
      } else {
        throw err || e
      }
    }
  }
}
