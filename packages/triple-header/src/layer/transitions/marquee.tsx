import {
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const marqueeVariants = {
  animate: (offsetX: number) => ({
    x: [0, -offsetX],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
        duration: 10,
      },
    },
  }),
}

const MarqueeContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
`

export function Marquee({ children }: { children: ReactNode[] }) {
  const [offsetX, setOffsetX] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const frames = useMemo(
    () =>
      Array.from({ length: 2 }).map((_, idx) => {
        return (
          <Fragment key={idx}>
            {children.map((child, index) => (
              <Fragment key={index}>{child}</Fragment>
            ))}
          </Fragment>
        )
      }),
    [children],
  )

  useEffect(() => {
    if (containerRef.current) {
      setOffsetX(containerRef.current.clientWidth)
    }
  }, [containerRef])

  useEffect(() => {
    addEventListener('resize', () => {
      if (containerRef.current) {
        setOffsetX(containerRef.current.clientWidth)
      }
    })
  }, [])

  return (
    <MarqueeContainer
      variants={marqueeVariants}
      animate="animate"
      ref={containerRef}
      custom={offsetX * children.length}
    >
      {frames}
    </MarqueeContainer>
  )
}
