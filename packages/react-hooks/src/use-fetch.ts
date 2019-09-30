import { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'

interface Response extends ResponseInit {
  ok: boolean
}

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

export function useFetch(url: string, options: RequestInit = {}): FetchStatus {
  const [fetchResponse, setFetchResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    async function fetchData() {
      const response = await fetch(url, options)

      setLoading(false)

      try {
        if (response.ok) {
          const data = await response.json()

          setFetchResponse({
            data,
            response,
          })
        } else {
          setError(createFetchError(response))
        }
      } catch (e) {
        setError(e)
      }
    }

    fetchData()
  }, [url, options])

  return { ...fetchResponse, loading, error }
}
