import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useContext,
} from 'react'

interface ImageStateContextValue {
  borderRadius: number | undefined
}

const ImageStateContext = createContext<ImageStateContextValue | null>(null)

export function ImageStateContextProvider({
  borderRadius,
  children,
}: PropsWithChildren<{
  borderRadius?: number
}>) {
  const value = useMemo(() => ({ borderRadius }), [borderRadius])

  return (
    <ImageStateContext.Provider value={value}>
      {children}
    </ImageStateContext.Provider>
  )
}

export function useImageState() {
  const context = useContext(ImageStateContext)

  if (!context) {
    throw new Error('Cannot use image state outside of provider')
  }
  return context
}
