import { createContext, useContext } from 'react'

import { GeolocationValue } from '../types/geolocation'

export const GeolocationContext = createContext<GeolocationValue | undefined>(
  undefined,
)

export function useGeolocation() {
  const context = useContext(GeolocationContext)

  if (context === undefined) {
    throw new Error('GeolocationContext가 없습니다.')
  }

  return context
}
