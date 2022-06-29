import { useQueries } from 'react-query'
import { RequestDocument, Variables } from 'graphql-request'

import graphqlRequest from '../../data/graphql/request'
import { ReviewData } from '../types'

interface Query {
  key: string | (string | boolean | ReviewData[])[]
  query: RequestDocument
  variables: Variables
  options?: { [key: string]: boolean }
}

export function useGraphqlQueries(queries: Query[]) {
  const queryArray = queries.map(
    ({ key: queryKey, query, variables, options }) => ({
      queryKey,
      queryFn: graphqlRequest({
        query,
        variables,
      }),
      ...options,
    }),
  )

  return useQueries(queryArray)
}
