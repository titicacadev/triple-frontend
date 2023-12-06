import { createContext, useContext } from 'react'
import { ImageSource } from '@titicaca/tds-widget'

const ImageSourceContext = createContext<typeof ImageSource | undefined>(
  undefined,
)

export const ImageSourceProvider = ImageSourceContext.Provider

export function useImageSource() {
  return useContext(ImageSourceContext)
}
