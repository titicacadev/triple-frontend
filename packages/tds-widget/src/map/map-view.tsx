import {
  CSSProperties,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
  useCallback,
} from 'react'
import {
  GoogleMap,
  GoogleMapProps,
  useLoadScript,
} from '@react-google-maps/api'

import { getGeometry, literalToString } from './utilities'

const MAX_LAT = (Math.atan(Math.sinh(Math.PI)) * 180) / Math.PI

const DEFAULT_BOUNDS_PADDING = {
  top: 20,
  right: 22,
  left: 22,
  bottom: 20,
}

const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  noClear: true,
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: 'greedy',
  // 지도 뷰를 제외한 회색 영역으로 움직임을 방지
  restriction: {
    latLngBounds: {
      north: MAX_LAT,
      south: -MAX_LAT,
      west: -180,
      east: 180,
    },
    strictBounds: true,
  },
}

const DEFAULT_MAP_CONTAINER_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
}

export interface WithGoogleMapProps extends GoogleMapProps {
  /**
   * 중앙좌표 값과 bounds를 계산하기 위한 좌표값
   */
  coordinates?: [number, number][]
  /**
   * Google Map SDK 로드를 위해 필요한 configuration
   *
   * 여러 옵션이 있지만 googleMapApiKey 정도만 설정하면 되고 기본값을 갖습니다.
   */
  googleMapLoadOptions: {
    /** goole map api key */
    googleMapsApiKey: string
    /** region default: kr - https://developers.google.com/maps/faq#languagesupport */
    region?: string
    language?: string
  }
  /**
   * Map SDK loaded 콜백 핸들러
   */
  padding?:
    | number
    | {
        top?: number
        right?: number
        bottom?: number
        left?: number
      }
  /**
   * Map SDK loaded 콜백 핸들러
   */
  onLoad?: (map: google.maps.Map) => void
  /**
   * map의 fitBounds를 비활성화합니다.
   */
  disableFitBounds?: boolean
}

const GOOGLE_MAP_LIBRARIES = ['geometry' as const]

/**
 * 기본 Map 컴포넌트입니다.
 *
 * - 참고: https://tomchentw.github.io/react-google-maps/#googlemap
 */
export function MapView({
  coordinates = [],
  options: originOptions,
  mapContainerStyle: originMapContainerStyle,
  googleMapLoadOptions: { googleMapsApiKey, region = 'kr', language },
  padding = DEFAULT_BOUNDS_PADDING,
  children,
  onLoad,
  disableFitBounds = false,
  ...props
}: PropsWithChildren<WithGoogleMapProps>) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    region,
    language,
    libraries: GOOGLE_MAP_LIBRARIES,
  })

  const [map, setMap] = useState<google.maps.Map>()
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null)
  const [bounds, setBounds] = useState<google.maps.LatLngBoundsLiteral | null>(
    null,
  )

  const coordinateLength = coordinates.length

  useEffect(() => {
    if (disableFitBounds || coordinates.length === 0) {
      if (!center || !bounds) {
        return
      }
      setCenter(null)
      setBounds(null)
      return
    }

    const { center: newCenter, bounds: newBounds } = getGeometry(coordinates)
    setCenter(newCenter)
    setBounds(newBounds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, disableFitBounds])

  const options = useMemo(() => {
    return {
      ...DEFAULT_MAP_OPTIONS,
      center,
      ...(coordinateLength === 1 && { zoom: 17 }),
      ...originOptions,
    }
  }, [center, coordinateLength, originOptions])

  const mapContainerStyle: CSSProperties = useMemo(
    () => ({
      ...DEFAULT_MAP_CONTAINER_STYLE,
      ...originMapContainerStyle,
    }),
    [originMapContainerStyle],
  )

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      onLoad && onLoad(map)
      setMap(map)
    },
    [onLoad],
  )

  useEffect(() => {
    if (!bounds || coordinateLength === 0 || disableFitBounds) {
      return
    }
    map?.fitBounds(bounds, padding)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, literalToString(bounds), padding, coordinateLength])

  return loadError ? (
    <div>Map cannot be loaded right now, sorry.</div>
  ) : isLoaded ? (
    <GoogleMap
      options={options}
      onLoad={handleOnLoad}
      mapContainerStyle={mapContainerStyle}
      {...(props as GoogleMapProps)}
    >
      {children}
    </GoogleMap>
  ) : null
}
