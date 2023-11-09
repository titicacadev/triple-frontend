import { createContext, useContext } from 'react'
import { ImageSourceType } from '@titicaca/kint5-core-elements'

const ImageSourceContext = createContext<ImageSourceType | undefined>(undefined)

export const ImageSourceProvider = ImageSourceContext.Provider

export function useImageSource() {
  return useContext(ImageSourceContext)
}
