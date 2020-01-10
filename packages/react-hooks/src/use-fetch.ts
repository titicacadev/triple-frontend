import { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import isEqual from 'react-fast-compare'

type FetchResponse =
  | {
      data: any
      response: Response
    }
  | {
      error: Error
    }

type FetchStatus =
  | { loading: true }
  | ({
      loading: false
    } & FetchResponse)

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

      const response = await fetch(
        url,
        ...(fetchOptions ? [{ ...fetchOptions }] : []),
      )

      try {
        if (response.ok) {
          const data = await response.json()

          setFetchResponse({
            data,
            response,
          })
        } else {
          setFetchResponse({ error: createFetchError(response) })
        }
      } catch (error) {
        setFetchResponse({ error })
      }
    }

    fetchData()
  }, [url, fetchOptions])

  if (fetchResponse === null) {
    return { loading: true }
  }

  return {
    loading: false,
    ...fetchResponse,
  }
}
