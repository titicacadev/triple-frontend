import { createContext, useContext } from 'react'
import { ImageSource } from '@titicaca/image-source'

const ImageSourceContext = createContext<typeof ImageSource | undefined>(
  undefined,
)

export const ImageSourceProvider = ImageSourceContext.Provider

export function useImageSource() {
  return useContext(ImageSourceContext)
}
