import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

interface EnvContextValue {
  appUrlScheme: string
  webUrlBase: string
  authBasePath: string
  facebookAppId: string
}

const EnvContext = createContext<EnvContextValue>({
  appUrlScheme: '',
  webUrlBase: '',
  authBasePath: '',
  facebookAppId: '',
})

export function EnvProvider({
  appUrlScheme,
  webUrlBase,
  authBasePath,
  facebookAppId,
  children,
}: PropsWithChildren<EnvContextValue>) {
  const value = useMemo<EnvContextValue>(
    () => ({
      appUrlScheme,
      webUrlBase,
      authBasePath,
      facebookAppId,
    }),
    [appUrlScheme, authBasePath, facebookAppId, webUrlBase],
  )
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>
}

export function useEnv(): EnvContextValue {
  return useContext(EnvContext)
}
