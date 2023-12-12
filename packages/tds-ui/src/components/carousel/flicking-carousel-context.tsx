import { PropsWithChildren, createContext, useContext, useMemo } from 'react'
import type { FlickingProps } from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'

interface FlickingEvent {
  onMoveStart?: FlickingProps['onMoveStart']
  onMove?: FlickingProps['onMove']
  onMoveEnd?: FlickingProps['onMoveEnd']
  options?: Partial<FlickingOptions>
}

const FlickingCarouselContext = createContext<FlickingEvent | undefined>(
  undefined,
)

export function FlickingCarouselProvider({
  onMoveStart,
  onMove,
  onMoveEnd,
  options,
  children,
}: PropsWithChildren<FlickingEvent>) {
  const values = useMemo(
    () => ({
      onMoveStart,
      onMove,
      onMoveEnd,
      options,
    }),
    [onMove, onMoveEnd, onMoveStart, options],
  )

  return (
    <FlickingCarouselContext.Provider value={values}>
      {children}
    </FlickingCarouselContext.Provider>
  )
}

export function useFlickingCarousel() {
  const context = useContext(FlickingCarouselContext)

  if (!context) {
    throw new Error('CarouselProvider is not mount')
  }

  return context
}
