# Triple Map

구글맵을 기반으로 하는 트리플 공통 맵 컴포넌트입니다.

## Usage

### MapView

기본 Map 컴포넌트입니다.

- 참고: https://tomchentw.github.io/react-google-maps/#googlemap

#### Props

```ts
{
  /** 맵을 그리기 위한 중앙좌표와 맵의 동서남북 경계범위의 좌표를 포함하는 옵션 */
  options: google.maps.MapOptions
  /** Map Container 에 인라인 스타일 적용이 필요한 경우 */
  mapContainerStyle: CSSProperties
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
  onLoad: (map: google.maps.Map) => void
  /**
   * bounds 는 계산된 순수 영역이고 padding 은 맵 내부에 애니메이션 핀이나 마커가 들어가면서
   * 가상의 추가 여백이 필요하여 보정하기 위한 여백값입니다.
   */
  padding?: number | { top, left, right, bottom }
  bounds?: google.maps.LatLngBoundsLiteral
}
```

```tsx
import MapView from '@titicaca/map'

function Page() {
  const [mapOptions] = useState({ center: { lat: 25.061425, lng: 121.380241 } })
  const bounds = {
    south: 25.0331,
    west: 121.234206,
    north: 25.08975,
    east: 121.526276,
  }
  const padding = { top: 10, left: 10, right: 10, bottom: 10 } // or 10

  const handleMapLoaded = useCallback((map: google.maps.Map) => {
    // do some after loaded google map
  }, [])

  return (
    <MapView
      options={mapOptions}
      onLoad={handleMapLoaded}
      googleMapLoadOptions={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      }}
      padding={padding}
      bounds={bounds}
    />
  )
}
```

### CircleMarker

CircleMarker 컴포넌트 입니다.

- 참고: https://tomchentw.github.io/react-google-maps/#marker

```tsx
import { white } from '@titicaca/color-palette'
import MapView, { CircleMarker } from '@titicaca/map'

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
import MapView, { Polyline } from '@titicaca/map'

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
import MapView, { Polygon } from '@titicaca/map'

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
