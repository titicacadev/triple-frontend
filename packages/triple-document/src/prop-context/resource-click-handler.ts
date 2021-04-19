import { createContext, SyntheticEvent, useContext } from 'react'

export type ResourceClickHandler = (
  e: SyntheticEvent,
  resource: {
    id: string
    type: string
    source: unknown
  },
) => void

const ResourceClickHandlerContext = createContext<ResourceClickHandler | null>(
  null,
)
export const ResourceClickHandlerProvider = ResourceClickHandlerContext.Provider

export function useResourceClickHandler() {
  const handleResourceClick = useContext(ResourceClickHandlerContext)

  if (!handleResourceClick) {
    throw new Error('Resource click handler context가 없습니다.')
  }

  return handleResourceClick
}
