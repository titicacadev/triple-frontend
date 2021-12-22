import React, {
  CSSProperties,
  useMemo,
  PropsWithChildren,
  useEffect,
  useCallback,
  useState,
} from 'react'
import {
  GoogleMap,
  GoogleMapProps,
  useLoadScript,
} from '@react-google-maps/api'
import { Spinner } from '@titicaca/core-elements'

export * from './utilities'
export * from './marker'
export * from './polygon'
export * from './polyline'

const DEFAULT_BOUNDS_PADDING = {
  top: 20,
  right: 22,
  left: 22,
  bottom: 20,
}

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
  googleMapLoadOptions: {
    /** goole map api key */
    googleMapsApiKey: string
    /** region default: kr - https://developers.google.com/maps/faq#languagesupport */
    region?: string
    /**
     * google map additional libraries
     * default: ['geometry'] - https://developers.google.com/maps/documentation/javascript/libraries */
    // libraries?: Libraries
  }
  /**
   * https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral */
  bounds?: google.maps.LatLngBoundsLiteral
  padding?:
    | number
    | {
        top?: number
        right?: number
        bottom?: number
        left?: number
      }
  onLoad?: (map: google.maps.Map) => void
}

const GOOGLE_MAP_LIBRARIES = ['geometry' as const]

export default function MapView({
  options: _options,
  mapContainerStyle: _mapContainerStyle,
  googleMapLoadOptions: { googleMapsApiKey, region = 'kr' },
  bounds,
  padding = DEFAULT_BOUNDS_PADDING,
  children,
  onLoad,
  ...props
}: PropsWithChildren<WithGoogleMapProps>) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    region,
    libraries: GOOGLE_MAP_LIBRARIES,
  })
  const [map, setMap] = useState<google.maps.Map>()

  const options: google.maps.MapOptions = useMemo(
    () => ({
      ...DEFAULT_MAP_OPTIONS,
      ..._options,
    }),
    [_options],
  )

  const mapContainerStyle: CSSProperties = useMemo(
    () => ({
      ...DEFAULT_MAP_CONTAINER_STYLE,
      ..._mapContainerStyle,
    }),
    [_mapContainerStyle],
  )

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      onLoad && onLoad(map)

      if (!bounds) {
        setMap(map)
        return
      }

      google.maps.event.addListenerOnce(map, 'idle', () => {
        map.fitBounds(bounds, padding)
        setMap(map)
      })
    },
    [bounds, onLoad, padding],
  )

  useEffect(() => {
    bounds && map?.fitBounds(bounds, padding)
  }, [map, bounds, padding])

  return loadError ? (
    <div>Map cannot be loaded right now, sorry.</div>
  ) : isLoaded ? (
    <GoogleMap
      options={options}
      mapContainerStyle={mapContainerStyle}
      onLoad={handleOnLoad}
      {...(props as GoogleMapProps)}
    >
      {children}
    </GoogleMap>
  ) : (
    <Spinner />
  )
}
