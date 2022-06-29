import { useQueries } from 'react-query'
import { RequestDocument, Variables } from 'graphql-request'

import graphqlRequest from '../../data/graphql/request'
import { ReviewData } from '../types'

export function useGraphqlQueries(
  queries: Array<{
    key: string | (string | boolean | ReviewData[])[]
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
