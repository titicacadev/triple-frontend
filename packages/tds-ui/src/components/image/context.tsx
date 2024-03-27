import {
  createContext,
  PropsWithChildren,
  useMemo,
  useContext,
  useState,
} from 'react'

interface ImageStateContextValue {
  borderRadius: number
  overlayMounted: boolean
  setOverlayMounted: (mounted: boolean) => void
}

const ImageStateContext = createContext<ImageStateContextValue | null>(null)

export function ImageStateContextProvider({
  borderRadius,
  children,
}: PropsWithChildren<{
  borderRadius?: number
}>) {
  const [overlayMounted, setOverlayMounted] = useState(false)

  const value = useMemo(
    () => ({
      borderRadius: borderRadius ?? 6,
      overlayMounted,
      setOverlayMounted,
    }),
    [borderRadius, overlayMounted],
  )

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
