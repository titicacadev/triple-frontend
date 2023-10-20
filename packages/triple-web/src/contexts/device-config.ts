import { createContext } from 'react'

export interface DeviceConfig {
  autoplay: 'always' | 'wifi_only' | 'never'
  networkType: 'wifi' | 'cellular' | 'unknown'
}

export const deviceConfigDefaultValue: DeviceConfig = {
  autoplay: 'always',
  networkType: 'unknown',
}

export const DeviceConfigContext = createContext<DeviceConfig | undefined>(
  undefined,
)
