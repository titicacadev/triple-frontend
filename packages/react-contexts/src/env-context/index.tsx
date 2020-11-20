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
}

const EnvContext = createContext<EnvContextValue>({
  appUrlScheme: '',
  webUrlBase: '',
  authBasePath: '',
})

export function EnvProvider({
  appUrlScheme,
  webUrlBase,
  authBasePath,
  children,
}: PropsWithChildren<EnvContextValue>) {
  const value = useMemo<EnvContextValue>(
    () => ({
      appUrlScheme,
      webUrlBase,
      authBasePath,
    }),
    [appUrlScheme, authBasePath, webUrlBase],
  )
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>
}

export function useEnv(): EnvContextValue {
  return useContext(EnvContext)
}
