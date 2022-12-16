import { createContext, useContext } from 'react'

import { LinkEventHandler } from '../types'

const LinkClickHandlerContext =
  createContext<LinkEventHandler | undefined>(undefined)

export const LinkClickHandlerProvider = LinkClickHandlerContext.Provider

export function useLinkClickHandler() {
  return useContext(LinkClickHandlerContext)
}
