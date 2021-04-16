import { createContext, useContext } from 'react'

export type TNAProductsFetcher = (slotId: number) => Promise<Response>

const TNAProductsFetcherContext = createContext<TNAProductsFetcher | undefined>(
  undefined,
)

export const TNAProductsFetcherProvider = TNAProductsFetcherContext.Provider

export function useTNAProductsFetcher() {
  return useContext(TNAProductsFetcherContext)
}
