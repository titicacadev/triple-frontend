import Lottie, { SVGRendererConfig, AnimationItem } from 'lottie-web'
import { useRef, useEffect, useState } from 'react'

export function useLottie<T extends HTMLElement>({
  loop = true,
  autoplay = true,
  path,
  data,
  rendererSettings,
}: {
  loop?: boolean
  autoplay?: boolean
  path?: string
  data?: unknown
  rendererSettings?: SVGRendererConfig
}) {
  const [animation, setAnimation] = useState<AnimationItem>()
  const animationRef = useRef<T>(null)

  useEffect(
    () => {
      if (animationRef.current) {
        const animation = Lottie.loadAnimation({
          container: animationRef.current,
          renderer: 'svg',
          loop,
          autoplay,
          path,
          animationData: data,
          rendererSettings,
        })

        setAnimation(animation)

        return () => {
          animation.destroy()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return { animation, animationRef }
}
