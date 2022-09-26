# Triple Map

구글맵을 기반으로 하는 트리플 공통 맵 컴포넌트입니다.

## Usage

### MapView

기본 Map 컴포넌트입니다.

- 참고: https://tomchentw.github.io/react-google-maps/#googlemap

#### Props

```ts
{
  /** 중앙좌표 값과 bounds를 계산하기 위한 좌표값 */
  coordinates?: [number,number][]
  /** 맵을 그리기 위한 중앙좌표와 맵의 동서남북 경계범위의 좌표를 포함하는 옵션 */
  options?: google.maps.MapOptions
  /** Map Container 에 인라인 스타일 적용이 필요한 경우 */
  mapContainerStyle?: CSSProperties
  /**
   * Google Map SDK 로드를 위해 필요한 configuration
   * 여러 옵션이 있지만 googleMapApiKey 정도만 설정하면 되고 기본값을 갖습니다.
   */
  gooleMapLoadOptions: {
    googleMapsApiKey: string
    region?: string
    libraries?: Libraries
  }
  /**
   * Map SDK loaded 콜백 핸들러
   */
  onLoad?: (map: google.maps.Map) => void
  /** 맵 내부에 애니메이션 핀이나 마커가 들어가면서 가상의 추가 여백이 필요하여 보정하기 위한 여백값입니다. */
  padding?: number | { top, left, right, bottom }
}
```

```tsx
import { MapView, FocusTracker } from '@titicaca/map'

function Page() {
  const [mapOptions] = useState({ center: { lat: 25.061425, lng: 121.380241 } })
  const poi = { source:{ pointGeolocation: { coordinates } } }
  const coordinates = [[114.14238, 22.28804],[130.408868, 33.592528],[125.50129726256557, 34.668727308992935]]
  const padding = { top: 10, left: 10, right: 10, bottom: 10 } // or 10

  const handleMapLoaded = useCallback((map: google.maps.Map) => {
    // do some after loaded google map
  }, [])

  return (
    <MapView
      coordinates={coordinates}
      options={mapOptions}
      onLoad={handleMapLoaded}
      googleMapLoadOptions={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      }}
      padding={padding}
    >
      // 지도 상의 Focus를 움직이기 위한 좌표 값 (해당 좌표값 위치로 초점 변경)
      <FocusTracker focusGeolocation={poi.source.pointGeolocation.coordinates}/>
    </>
  )
}
```

### Overlay

이미지는 아래와 같이 svg 이미지를 inline으로 사용합니다.

```tsx
import { white } from '@titicaca/color-palette'
import { OverlayView } from '@react-google-maps/api'

const coordinates = [
  { lat: 33.24577929502035, lng: 126.57157193028415 },
  { lat: 33.24588206713943, lng: 126.57193023026494 },
]

function Page() {
  const mapRef = useRef<google.maps.Map>(null)
  const handleMapLoaded = useCallback((map: google.maps.Map) => {
    // do some after loaded google map
    mapRef.current = map
  }, [])

  return (
    <MapView
      options={mapOptions}
      onLoad={handleMapLoaded}
      googleMapLoadOptions={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      }}
    >
      {coordinates.map((position, i) => (
        <OverlayView key={i} position={position}>
          <svg viewBox="0 0 34 34">
            <path
              fill="none"
              fillRule="evenodd"
              stroke="var(--color-white)"
              strokeLinejoin="round"
              strokeWidth="1.65"
              d="M17 11.229C17.877 9.683 19.55 8 22.005 8 24.994 8 27 10.426 27 13.374c0 5.83-5.768 9.873-10 12.626-4.232-2.753-10-6.796-10-12.626C7 10.426 9.006 8 11.995 8 14.45 8 16.123 9.683 17 11.229z"
            />
          </svg>
        </OverlayView>

        // 아래 호텔 예시 페이지 처럼 필요에 따라 wrapper 형식의 컴포넌트를 붙이는 경우
        // core-elements의 Container를 래핑하여 컴포넌트를 렌더시킵니다.
        // 예시 페이지 경로 - /hotels/d0316375-7cbf-4fd0-9ec9-5912ec7bd944
        <Container position={{ bottom: 0 }} position='absoulte'>
          <Component />
        </OverlayWrapper>
      ))}
    </MapView>
  )
}
```

### Marker 종류

- 말풍선 텍스트 및 poi dot marker를 렌더링하기 위한 `PoiDotMarker` 컴포넌트
- active 및 default 시 필요한 `CircleMarker` 마커를 렌더링 하기위한 `FlexibleMarker` 컴포넌트

```tsx
import { MapView, PoiDotMarker, FlexibleMarker } from '@titicaca/map'

function Page() {
  const mapRef = useRef<google.maps.Map>(null)

  return (
    <MapView {...props}>
      {coordinates.map((position, i) => (
        <>
          <PoiDotMarker
            {...props}
            bubbleContent="말풍선 텍스트"
            activeWithDot={false}
            onClick={() => {}}
          >
            {i + 1}
          </PoiDotMarker>

          <FlexibleMarker
            {...CircleMarkerProps}
            activeContent={<AnyThingComponent />}
            defaultContent={<AnyThingComponent />}
            onClick={() => {}}
          />
        </>
      ))}
    </MapView>
  )
}
```

### CircleMarker

CircleMarker 컴포넌트 입니다.

- 참고: https://tomchentw.github.io/react-google-maps/#marker

```tsx
import { white } from '@titicaca/color-palette'
import { MapView, CircleMarker } from '@titicaca/map'

const coordinates = [
  { lat: 33.24577929502035, lng: 126.57157193028415 },
  { lat: 33.24588206713943, lng: 126.57193023026494 },
  { lat: 33.246184827717805, lng: 126.57295235712667 },
  { lat: 33.246195938219586, lng: 126.57299124239687 },
  { lat: 33.24628759961703, lng: 126.5732967694218 },
  { lat: 33.2463792610586, lng: 126.57360507398386 },
  { lat: 33.24654869742276, lng: 126.57427445662532 },
]

function Page() {
  const mapRef = useRef<google.maps.Map>(null)
  const handleMapLoaded = useCallback((map: google.maps.Map) => {
    // do some after loaded google map
    mapRef.current = map
  }, [])

  return (
    <MapView
      options={mapOptions}
      onLoad={handleMapLoaded}
      googleMapLoadOptions={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      }}
    >
      {coordinates.map((position, i) => (
        <CircleMarker
          key={i}
          zIndex={i}
          position={position}
          active={i === activeId}
          onClick={() => {
            mapRef.current?.panTo(position)
          }}
        >
          {i + 1}
        </CircleMarker>
      ))}
    </MapView>
  )
}
```

### Polyline

Polyline 컴포넌트 입니다.

- 참고: https://tomchentw.github.io/react-google-maps/#polyline

```tsx
import { black } from '@titicaca/color-palette'
import { MapView, Polyline } from '@titicaca/map'

const path = [
  { lat: 33.24577929502035, lng: 126.57157193028415 },
  { lat: 33.24588206713943, lng: 126.57193023026494 },
  { lat: 33.246184827717805, lng: 126.57295235712667 },
  { lat: 33.246195938219586, lng: 126.57299124239687 },
  { lat: 33.24628759961703, lng: 126.5732967694218 },
  { lat: 33.2463792610586, lng: 126.57360507398386 },
  { lat: 33.24654869742276, lng: 126.57427445662532 },
]

function Page() {
  const handleMapLoaded = useCallback(() => {
    // do some after loaded google map
  }, [])

  return (
    <MapView
      options={mapOptions}
      onLoad={handleMapLoaded}
      googleMapLoadOptions={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      }}
    >
      <Polyline path={path} strokeColor={black} />
    </MapView>
  )
}
```

### Polygon

Polygon 컴포넌트입니다.

- 참고: https://tomchentw.github.io/react-google-maps/#polygon

```tsx
import { black } from '@titicaca/color-palette'
import { MapView, Polygon } from '@titicaca/map'

const paths = [
  { lat: 33.22410952604817, lng: 126.57855753182952 },
  { lat: 33.22632510895313, lng: 126.5581921360212 },
  { lat: 33.24427632056917, lng: 126.54479946762507 },
  { lat: 33.32931605560014, lng: 126.5751307781339 },
  { lat: 33.33836676375764, lng: 126.5880743229918 },
  { lat: 33.33960003282098, lng: 126.62690501730869 },
  { lat: 33.351528240502596, lng: 126.66360523380887 },
  { lat: 33.39431734973251, lng: 126.65773575252842 },
  { lat: 33.48559184287206, lng: 126.623294029759 },
  { lat: 33.536635235688316, lng: 126.62051663176813 },
  { lat: 33.54743393234668, lng: 126.63244987896417 },
  { lat: 33.55355806668074, lng: 126.67508533207692 },
  { lat: 33.57058400657347, lng: 126.69730465650271 },
  { lat: 33.578373379925985, lng: 126.72621952599624 },
  { lat: 33.57817067244863, lng: 126.79613151507387 },
  { lat: 33.57114345546995, lng: 126.81863369395971 },
  { lat: 33.55235876135656, lng: 126.82816138872364 },
  { lat: 33.53354675697467, lng: 126.81649431921194 },
  { lat: 33.52695909911929, lng: 126.78107836266871 },
  { lat: 33.53177663639768, lng: 126.72727588845426 },
  { lat: 33.51398048243647, lng: 126.70468586995909 },
]

function Page() {
  const handleMapLoaded = useCallback(() => {
    // do some after loaded google map
  }, [])

  return (
    <MapView
      options={mapOptions}
      onLoad={handleMapLoaded}
      googleMapLoadOptions={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      }}
    >
      <Polygon paths={paths} strokeColor={black} />
    </MapView>
  )
}
```

🧐 Polygon 컴포넌트는 `paths` 속성을 갖습니다. (not `path`)

## Trouble shooting

맵 컴포넌트 내에 기본적으로 구글맵 SDK 로딩 로직이 포함되어 있다보니 모든 스토리가 개별적으로
구글맵 SDK 를 개별적으로 호출하게 되어 아래와 같은 오류가 발생합니다.

추후 개선이 되어야 한다면 Context Provider 가 로딩을 1회만 담당하도록 하고
다수의 MapView 를 갖는 형태로 개선되면 좋을거 같습니다.

```sh
You have included the Google Maps JavaScript API multiple times on this page.
This may cause unexpected errors.
```
