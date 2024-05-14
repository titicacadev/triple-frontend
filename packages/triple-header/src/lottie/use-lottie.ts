import Lottie, { SVGRendererConfig } from 'lottie-web'
import { useRef, useEffect } from 'react'

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
  const animationRef = useRef<T>(null)

  useEffect(() => {
    if (animationRef.current) {
      const instance = Lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop,
        autoplay,
        path,
        animationData: data,
        rendererSettings,
      })

      return () => instance.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return { animationRef }
}
