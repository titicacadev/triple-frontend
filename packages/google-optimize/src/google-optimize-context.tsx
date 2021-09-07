import React, {
  useState,
  useEffect,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'
import Head from 'next/head'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

const GOOGLE_OPTIMIZE_SCRIPT_ID = 'google-optimize-script'

const ExperimentVariantContext = createContext<number | null>(null)

export function GoogleOptimizeExperimentProvider({
  experimentId,
  containerId,
  children,
}: PropsWithChildren<{
  experimentId: string | undefined
  containerId: string
}>) {
  const [variant, setVariant] = useState<number>(-1)

  useEffect(() => {
    function gtag(..._: any[]) {
      if (window.dataLayer) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments)
      } else {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer = [arguments]
      }
    }

    if (!experimentId) {
      return
    }

    gtag('event', 'optimize.callback', {
      name: experimentId,
      callback: (value: string) => {
        setVariant(parseInt(value))
      },
    })
  }, [experimentId])

  if (!experimentId) {
    return <>{children}</>
  }

  return (
    <>
      <Head>
        <script
          key={GOOGLE_OPTIMIZE_SCRIPT_ID}
          id={GOOGLE_OPTIMIZE_SCRIPT_ID}
          src={`https://www.googleoptimize.com/optimize.js?id=${containerId}`}
        />
      </Head>

      <ExperimentVariantContext.Provider value={variant}>
        {children}
      </ExperimentVariantContext.Provider>
    </>
  )
}

export function useExperimentVariant<T>({ variants }: { variants: T[] }) {
  const variant = useContext(ExperimentVariantContext)

  if (variant === -1) {
    return null
  }

  if (variant === null) {
    throw new Error('최적화 variant provider가 없습니다.')
  }
  return variants[variant]
}
