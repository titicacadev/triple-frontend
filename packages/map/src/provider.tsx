import React, { CSSProperties, useMemo, PropsWithChildren } from 'react'
import {
  GoogleMap,
  GoogleMapProps,
  useLoadScript,
} from '@react-google-maps/api'
import { Spinner } from '@titicaca/core-elements'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'

const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  zoom: 13,
  center: { lat: 37.7577627, lng: -122.4726194 },
  noClear: true,
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: 'greedy',
}
const DEFAULT_MAP_CONTAINER_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
}

export interface WithGoogleMapProps extends GoogleMapProps {
  mapContainerStyle?: CSSProperties

  googleMapLoadOptions: {
    /** goole map api key */
    googleMapsApiKey: string
    /** region default: kr - https://developers.google.com/maps/faq#languagesupport */
    region?: string
    /**
     * google map additional libraries
     * default: ['geometry'] - https://developers.google.com/maps/documentation/javascript/libraries */
    libraries?: Libraries
  }
}

export function MapProvider<P extends WithGoogleMapProps>({
  options: _options,
  mapContainerStyle: _mapContainerStyle,
  googleMapLoadOptions: {
    googleMapsApiKey,
    region = 'kr',
    libraries = ['geometry'],
  },
  children,
  ...props
}: PropsWithChildren<P>) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    region,
    libraries,
  })
  const options: google.maps.MapOptions = useMemo(
    () => ({
      ...DEFAULT_MAP_OPTIONS,
      ...(_options && _options),
    }),
    [_options],
  )
  const mapContainerStyle: CSSProperties = useMemo(
    () => ({
      ...DEFAULT_MAP_CONTAINER_STYLE,
      ...(_mapContainerStyle && _mapContainerStyle),
    }),
    [_mapContainerStyle],
  )

  return loadError ? (
    <div>Map cannot be loaded right now, sorry.</div>
  ) : isLoaded ? (
    <GoogleMap
      options={options}
      mapContainerStyle={mapContainerStyle}
      {...(props as GoogleMapProps)}
    >
      {children}
    </GoogleMap>
  ) : (
    <Spinner />
  )
}

export function withMapProvider<P>(
  Component: React.ComponentType<P>,
): React.ComponentType<P & WithGoogleMapProps> {
  return function ComponentWithMaps(props: WithGoogleMapProps & P) {
    return (
      <MapProvider {...(props as P & WithGoogleMapProps)}>
        <Component {...(props as P)} />
      </MapProvider>
    )
  }
}
