import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface FlowLoop {
  children: ReactNode[]
}

const marqueeVariants = {
  animate: (offsetX: number) => ({
    x: [0, -offsetX],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
        duration: 30,
      },
    },
  }),
}

const Track = styled(motion.div)`
  display: -webkit-box;
  height: 100%;
`

export default function Marquee({ children }: FlowLoop) {
  const [offsetX, setOffsetX] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const frames = [...children, ...children]

  useEffect(() => {
    if (trackRef.current) {
      setOffsetX(trackRef.current.clientWidth)
    }
  }, [trackRef])

  return (
    <Track
      variants={marqueeVariants}
      animate="animate"
      ref={trackRef}
      custom={offsetX * children.length}
    >
      {frames}
    </Track>
  )
}
