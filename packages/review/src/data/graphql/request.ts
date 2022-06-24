import { GraphQLClient, RequestDocument, Variables } from 'graphql-request'

interface UseQueryProps {
  query: RequestDocument
  variables: Variables
}

export default function graphqlRequest({ query, variables }: UseQueryProps) {
  return async () => {
    const response = await new GraphQLClient('/api/graphql').request(
      query,
      variables,
    )
    return response
  }
}
