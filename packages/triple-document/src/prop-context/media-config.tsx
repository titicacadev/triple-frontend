import { createContext, PropsWithChildren, useContext } from 'react'

export interface MediaConfig {
  videoAutoPlay?: boolean
  hideVideoControls?: boolean
  optimized?: boolean
}

const MediaConfigContext = createContext<MediaConfig>({})

export function MediaConfigProvider({
  children,
  ...mediaConfig
}: PropsWithChildren<MediaConfig>) {
  return (
    <MediaConfigContext.Provider value={mediaConfig}>
      {children}
    </MediaConfigContext.Provider>
  )
}

export function useMediaConfig() {
  return useContext(MediaConfigContext)
}
