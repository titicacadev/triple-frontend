import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react'
import { NextPageContext } from 'next'
import { parseApp } from '@titicaca/view-utilities'

type ClientContextProps = {
  appVersion: string
}

export const ClientContext = createContext<ClientContextProps | null>(null)

export function ClientContextProvider({
  appVersion,
  children,
}: React.PropsWithChildren<ClientContextProps>) {
  const value = useMemo(
    () => ({
      appVersion,
    }),
    [appVersion],
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}

ClientContextProvider.getInitialProps = async function ({
  req,
}: NextPageContext): Promise<ClientContextProps | null> {
  const parsedApp = parseApp(req?.headers.userAgent as string)

  if (parsedApp) {
    return {
      appVersion: parsedApp.version,
    }
  }

  return null
}

export function useClientContext() {
  return useContext(ClientContext)
}
