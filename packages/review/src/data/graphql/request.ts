import { GraphQLClient, RequestDocument, Variables } from 'graphql-request'

interface UseQueryProps {
  query: RequestDocument
  variables: Variables
}

export function graphqlQuery({ query, variables }: UseQueryProps) {
  return async () => {
    const response = await new GraphQLClient('/api/graphql').request(
      query,
      variables,
    )
    return response
  }
}

export async function graphqlInfiniteQuery({
  query,
  variables,
}: UseQueryProps) {
  const response = await new GraphQLClient('/api/graphql').request(
    query,
    variables,
  )
  return response
}
