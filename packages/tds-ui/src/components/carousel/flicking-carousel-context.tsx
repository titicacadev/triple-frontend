import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  forwardRef,
  ForwardedRef,
} from 'react'
import type { FlickingProps } from '@egjs/react-flicking'
import type { FlickingOptions } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'

interface FlickingCarouselBase {
  flickingRef: ForwardedRef<Flicking>
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

function FlickingCarouselProvider(
  {
    onMoveStart,
    onMove,
    onMoveEnd,
    options,
    children,
  }: PropsWithChildren<FlickingEvents>,
  flickingRef: ForwardedRef<Flicking>,
) {
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

export default forwardRef(FlickingCarouselProvider)

export function useFlickingCarousel() {
  const context = useContext(FlickingCarouselContext)

  if (!context) {
    throw new Error('CarouselProvider is not mount')
  }

  return context
}
