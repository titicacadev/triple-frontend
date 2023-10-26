import { createContext } from 'react'

export const enum ClientAppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

export type ClientApp = {
  metadata: {
    name: ClientAppName
    version: string
  }
  device: {
    autoplay: 'always' | 'wifi_only' | 'never'
    networkType: 'wifi' | 'cellular' | 'unknown'
  }
} | null

export const ClientAppContext = createContext<ClientApp | undefined>(undefined)
