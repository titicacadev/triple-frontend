import { GraphQLClient, RequestDocument, Variables } from 'graphql-request'
import { useQuery as originUseQuery } from 'react-query'

interface UseQueryProps {
  query: RequestDocument
  variables: Variables
}

export default function graphqlRequest({ query, variables }: UseQueryProps) {
  const { data } = originUseQuery('posts', async () => {
    const response = await new GraphQLClient('/api/graphql').request(
      query,
      variables,
    )

    return response
  })

  return data
}
