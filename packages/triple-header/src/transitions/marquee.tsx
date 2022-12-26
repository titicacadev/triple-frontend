import { Fragment, ReactNode, useEffect, useRef, useState } from 'react'
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
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  height: 100%;
`

export default function Marquee({ children }: FlowLoop) {
  const [offsetX, setOffsetX] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)

  const frames = [
    ...children.map((child, index) => (
      <Fragment key={`${index}_1`}>{child}</Fragment>
    )),
    ...children.map((child, index) => (
      <Fragment key={`${index}_2`}>{child}</Fragment>
    )),
  ]

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
