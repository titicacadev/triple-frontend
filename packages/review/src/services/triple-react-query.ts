import { QueryClient } from '@tanstack/react-query'
import { createContext } from 'react'

export const tripleQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const TripleQueryClientContext = createContext<QueryClient | undefined>(
  undefined,
)
