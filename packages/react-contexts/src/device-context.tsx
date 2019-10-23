import React, { createContext, ComponentType, useContext } from 'react'

interface DeviceContextValue {
  inRegion: boolean
  latitude: number | null
  longitude: number | null
}

interface DeviceProviderProps {
  initialInRegion: boolean
  initialLatitude: number | undefined
  initialLongitude: number | undefined
}

interface DeviceProviderState {
  value: DeviceContextValue
}

const Context = createContext<DeviceContextValue>({
  inRegion: false,
  latitude: null,
  longitude: null,
})

export class DeviceProvider extends React.PureComponent<
  DeviceProviderProps,
  DeviceProviderState
> {
  readonly state: Readonly<DeviceProviderState> = {
    value: {
      inRegion: this.props.initialInRegion || false,
      latitude: this.props.initialLatitude || null,
      longitude: this.props.initialLongitude || null,
    },
  }

  render() {
    const {
      props: { children },
      state: { value },
    } = this

    return <Context.Provider value={value}>{children}</Context.Provider>
  }
}

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
