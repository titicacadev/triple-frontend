import { createContext, SyntheticEvent, useContext } from 'react'

export type ResourceClickHandler = (
  e: SyntheticEvent,
  resource: {
    id: string
    type: string
    source: unknown
  },
) => void

const ResourceClickHandlerContext =
  createContext<ResourceClickHandler | undefined>(undefined)
export const ResourceClickHandlerProvider = ResourceClickHandlerContext.Provider

export function useResourceClickHandler() {
  return useContext(ResourceClickHandlerContext)
}
