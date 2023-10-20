import { useContext } from 'react'

import { DeviceConfigContext } from '../contexts/device-config'

export function useDeviceConfig() {
  const context = useContext(DeviceConfigContext)

  if (!context) {
    throw new Error('DeviceConfigContext가 없습니다.')
  }

  return context
}
