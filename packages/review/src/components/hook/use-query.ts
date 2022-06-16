import { RequestDocument, Variables } from 'graphql-request'
import { useCallback } from 'react'

import { graphqlFetch } from '../../data/graphql/fetch'

interface UseQueryProps {
  query: RequestDocument
  variables: Variables
}

export default function useQuery() {
  return useCallback(async ({ query, variables }: UseQueryProps) => {
    if (!query || !variables) {
      throw new Error('query 또는 variables가 존재하지 않습니다.')
    }
    const data = await graphqlFetch({
      query,
      variables,
    })

    return data
  }, [])
}
