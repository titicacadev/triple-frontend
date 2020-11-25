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
  defaultPageTitle: string
  defaultPageDescription: string
}

const EnvContext = createContext<EnvContextValue>({
  appUrlScheme: '',
  webUrlBase: '',
  authBasePath: '',
  facebookAppId: '',
  defaultPageTitle: '',
  defaultPageDescription: '',
})

export function EnvProvider({
  appUrlScheme,
  webUrlBase,
  authBasePath,
  facebookAppId,
  defaultPageTitle,
  defaultPageDescription,
  children,
}: PropsWithChildren<EnvContextValue>) {
  const value = useMemo<EnvContextValue>(
    () => ({
      appUrlScheme,
      webUrlBase,
      authBasePath,
      facebookAppId,
      defaultPageTitle,
      defaultPageDescription,
    }),
    [
      appUrlScheme,
      authBasePath,
      defaultPageDescription,
      defaultPageTitle,
      facebookAppId,
      webUrlBase,
    ],
  )
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>
}

export function useEnv(): EnvContextValue {
  return useContext(EnvContext)
}
