import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()

export default function QueryProvider({
  children,
}: PropsWithChildren<unknown>) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
