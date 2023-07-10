export type SessionContextProviderProps =
  | {
      type: 'browser'
      props: InBrowserSessionContextProviderProps
    }
  | {
      type: 'app'
      props: InAppSessionContextProviderProps
    }

export interface InBrowserSessionContextProviderProps {
  initialSessionAvailability: boolean
  initialUser: User | undefined
}

export interface InAppSessionContextProviderProps {
  initialSessionId: string | undefined
  initialUser: User | undefined
  preventSessionFixation?: boolean | undefined
}

export interface User {
  uid: string
}
