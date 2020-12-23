import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useContext,
  useState,
} from 'react'

interface ImageStateContextValue {
  borderRadius: number
  quality?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  unoptimized?: boolean
  overlayMounted: boolean
  setOverlayMounted: (mounted: boolean) => void
}

const ImageStateContext = createContext<ImageStateContextValue | null>(null)

export function ImageStateContextProvider({
  borderRadius,
  quality,
  priority,
  loading,
  unoptimized,
  children,
}: PropsWithChildren<{
  borderRadius?: number
  quality?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  unoptimized?: boolean
}>) {
  const [overlayMounted, setOverlayMounted] = useState(false)

  const value = useMemo(
    () => ({
      borderRadius: borderRadius ?? 6,
      quality: quality ?? 100,
      priority: priority ?? false,
      loading: loading ?? 'lazy',
      unoptimized: unoptimized ?? true,
      overlayMounted,
      setOverlayMounted,
    }),
    [borderRadius, loading, overlayMounted, priority, quality, unoptimized],
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
