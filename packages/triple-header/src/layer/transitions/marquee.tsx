import { Fragment, ReactNode, useEffect, useRef, useState } from 'react'
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
  height: 100%;
`

export function Marquee({ children }: { children: ReactNode[] }) {
  const [offsetX, setOffsetX] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const frames = [
    ...children.map((child, index) => (
      <Fragment key={`${index}_1`}>{child}</Fragment>
    )),
    ...children.map((child, index) => (
      <Fragment key={`${index}_2`}>{child}</Fragment>
    )),
  ]

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
      custom={offsetX * frames.length}
    >
      {frames}
    </MarqueeContainer>
  )
}
