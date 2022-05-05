/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { get } from '@titicaca/fetcher'

interface FetchResponse {
  data?: any
  response?: Response
  error?: Error
}

interface FetchStatus extends FetchResponse {
  loading: boolean
}

const createFetchError = (response: Response): Error => {
  const err = new Error(`${response.status} ${response.statusText}`)
  err.name = 'FetchError'
  return err
}

export function useFetch(url: string, options?: any): FetchStatus {
  const [fetchResponse, setFetchResponse] = useState<FetchResponse | null>(null)
  const [fetchOptions, setFetchOptions] = useState(options)

  useEffect(() => {
    if (!isEqual(fetchOptions, options)) {
      setFetchOptions(options)
    }
  }, [options, fetchOptions])

  useEffect(() => {
    async function fetchData() {
      setFetchResponse(null)

      const response = await get(
        url,
        ...(fetchOptions ? [{ ...fetchOptions }] : []),
      )

      try {
        if (response.ok === true) {
          const { parsedBody: data } = response

          setFetchResponse({
            data,
            response: response as unknown as Response,
          })
        } else {
          setFetchResponse({
            error: createFetchError(response as unknown as Response),
          })
        }
      } catch (error) {
        if (error instanceof Error || error === undefined) {
          setFetchResponse({ error })
        }
      }
    }

    fetchData()
  }, [url, fetchOptions])

  return {
    loading: fetchResponse === null,
    ...fetchResponse,
  }
}
