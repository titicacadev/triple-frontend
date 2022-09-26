import { createContext, useContext } from 'react'

const DeepLinkContext = createContext<string | undefined>(undefined)

export const DeepLinkProvider = DeepLinkContext.Provider

export function useDeepLink() {
  return useContext(DeepLinkContext)
}
