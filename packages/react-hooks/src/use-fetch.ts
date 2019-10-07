import { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'

interface FetchStatus {
  data: any
  response: Response
  loading: boolean
  error?: Error
}

const createFetchError = (response: Response): Error => {
  const err = new Error(`${response.status} ${response.statusText}`)
  err.name = 'FetchError'
  return err
}

export function useFetch(url: string, options?: any): FetchStatus {
  const [fetchResponse, setFetchResponse] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setFetchResponse(null)

      const response = await fetch(url, options)

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
  }, [url, options])

  return {
    loading: fetchResponse === null,
    ...fetchResponse,
  }
}
