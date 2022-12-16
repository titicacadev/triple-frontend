import { createContext, useContext } from 'react'

import { ImageEventHandler } from '../types'

const ImageClickHandlerContext =
  createContext<ImageEventHandler | undefined>(undefined)

export const ImageClickHandlerProvider = ImageClickHandlerContext.Provider

export function useImageClickHandler() {
  return useContext(ImageClickHandlerContext)
}
