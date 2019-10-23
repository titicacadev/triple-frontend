import React, { createContext, ComponentType, useContext } from 'react'

interface DeviceContextValue {
  inRegion: boolean
  latitude: number | null
  longitude: number | null
}

const Context = createContext<DeviceContextValue>({
  inRegion: false,
  latitude: null,
  longitude: null,
})

export const DeviceProvider = Context.Provider

export function withDeviceContext<
  P extends { deviceContext: DeviceContextValue }
>(Component: ComponentType<P>) {
  return function WithDeviceComponent(props: Omit<P, 'deviceContext'>) {
    return (
      <Context.Consumer>
        {(context) => {
          const componentProps = {
            ...props,
            deviceContext: context,
          } as P

          return <Component {...componentProps} />
        }}
      </Context.Consumer>
    )
  }
}

export function useDeviceContext() {
  return useContext(Context)
}
