import { createContext, useContext } from 'react'

export type TNAProductClickHandler = (
  e: React.SyntheticEvent,
  product: unknown,
  slotId?: number,
  index?: number,
) => void

const TNAProductClickHandlerContext = createContext<
  TNAProductClickHandler | undefined
>(undefined)

export const TNAProductClickHandlerProvider =
  TNAProductClickHandlerContext.Provider

export function useTNAProductClickHandler() {
  return useContext(TNAProductClickHandlerContext)
}
