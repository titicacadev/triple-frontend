import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useRef,
  RefObject,
} from 'react'
import type { FlickingProps } from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'

interface FlickingCarouselBase {
  flickingRef: RefObject<Flicking>
}

interface FlickingEvents {
  onMoveStart?: FlickingProps['onMoveStart']
  onMove?: FlickingProps['onMove']
  onMoveEnd?: FlickingProps['onMoveEnd']
  options?: Partial<FlickingOptions>
}

const FlickingCarouselContext = createContext<
  (FlickingCarouselBase & FlickingEvents) | undefined
>(undefined)

export function FlickingCarouselProvider({
  onMoveStart,
  onMove,
  onMoveEnd,
  options,
  children,
}: PropsWithChildren<FlickingEvents>) {
  const flickingRef = useRef<Flicking>(null)

  const values = useMemo(
    () => ({
      flickingRef,
      onMoveStart,
      onMove,
      onMoveEnd,
      options,
    }),
    [flickingRef, onMove, onMoveEnd, onMoveStart, options],
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
