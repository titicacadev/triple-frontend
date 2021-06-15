import { get, RequestOptions } from '@titicaca/fetcher'

export interface User {
  uid: string
}

export async function fetchUser(options?: RequestOptions) {
  const { result, error, status } = await get<User>('/api/users/me', options)

  if ((!result || error) && status !== 401) {
    throw error || new Error('Fail to fetch User')
  }

  return result || null
}
