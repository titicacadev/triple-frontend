import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useRef,
  RefObject,
  useState,
  useCallback,
} from 'react'
import type { FlickingProps } from '@egjs/react-flicking'
import type { FlickingEvent, FlickingOptions } from '@egjs/flicking'
import Flicking from '@egjs/react-flicking'

interface FlickingCarouselBase {
  currentPage?: number
}

interface FlickingEvents {
  onMoveStart?: FlickingProps['onMoveStart']
  onMove?: FlickingProps['onMove']
  onMoveEnd?: FlickingProps['onMoveEnd']
  options?: Partial<FlickingOptions>
}

export type FlickingCarouselProps = FlickingCarouselBase & FlickingEvents

interface FlickingCarouselContextProps {
  flickingRef: RefObject<Flicking>
  currentPage: number
  handleMoveStart: FlickingProps['onMoveStart']
  handleMove: FlickingProps['onMove']
  handleMoveEnd: FlickingProps['onMoveEnd']
  options: Partial<FlickingOptions>
}

const FlickingCarouselContext = createContext<
  FlickingCarouselContextProps | undefined
>(undefined)

export function FlickingCarouselProvider({
  currentPage: initialCurrentPage,
  onMoveStart,
  onMove,
  onMoveEnd,
  options = {},
  children,
}: PropsWithChildren<FlickingCarouselProps>) {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage || 0)
  const flickingRef = useRef<Flicking>(null)

  const handleMoveStart = useCallback(
    (e: FlickingEvent) => {
      onMoveStart?.(e)
    },
    [onMoveStart],
  )

  const handleMove = useCallback(
    (e: FlickingEvent) => {
      onMove?.(e)
    },
    [onMove],
  )

  const handleMoveEnd = useCallback(
    (e: FlickingEvent) => {
      setCurrentPage(e.index)

      onMoveEnd?.(e)
    },
    [onMoveEnd],
  )

  const values = useMemo(
    () => ({
      flickingRef,
      currentPage,
      setCurrentPage,
      handleMoveStart,
      handleMove,
      handleMoveEnd,
      options,
    }),
    [
      flickingRef,
      currentPage,
      setCurrentPage,
      handleMoveStart,
      handleMove,
      handleMoveEnd,
      options,
    ],
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
