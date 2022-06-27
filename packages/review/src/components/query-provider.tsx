import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function QueryProvider({
  children,
}: PropsWithChildren<unknown>) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
