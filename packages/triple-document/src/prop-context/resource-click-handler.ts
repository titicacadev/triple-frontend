import { createContext, SyntheticEvent, useContext } from 'react'

type ResourceClickHandler = (e: SyntheticEvent, resource: unknown) => void

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
