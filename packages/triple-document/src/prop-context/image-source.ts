import { createContext, useContext } from 'react'
import { ImageSourceType } from '@titicaca/core-elements'

const ImageSourceContext = createContext<ImageSourceType | undefined>(undefined)

export const ImageSourceProvider = ImageSourceContext.Provider

export function useImageSource() {
  return useContext(ImageSourceContext)
}
