import { get, RequestOptions } from '@titicaca/fetcher'

export interface User {
  uid: string
}

export async function fetchUser(options?: RequestOptions) {
  const response = await get<User>('/api/users/me', options)

  if (response.ok === false) {
    const { status } = response

    if (status === 401) {
      return null
    }

    throw new Error(`Fail to fetch User: ${status}`)
  }

  const { parsedBody } = response

  return parsedBody || null
}
