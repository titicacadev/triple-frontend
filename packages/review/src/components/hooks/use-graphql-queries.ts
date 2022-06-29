import { useQueries } from 'react-query'
import { RequestDocument, Variables } from 'graphql-request'

import graphqlRequest from '../../data/graphql/request'

export function useGraphqlQueries(
  queries: Array<{
    key: string | string[]
    query: RequestDocument
    variables: Variables
  }>,
) {
  const queryArray = queries.map(({ key: queryKey, query, variables }) => ({
    queryKey,
    queryFn: graphqlRequest({
      query,
      variables,
    }),
  }))

  return useQueries(queryArray)
}
