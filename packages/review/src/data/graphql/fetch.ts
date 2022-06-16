import { GraphQLClient, RequestDocument, Variables } from 'graphql-request'

export const graphqlFetch = ({
  query,
  variables,
  headers,
}: {
  query: RequestDocument
  variables: Variables
  headers?: HeadersInit
}) => new GraphQLClient('/api/graphql').request(query, variables, headers)
