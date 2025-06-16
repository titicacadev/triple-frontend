export function getGeometry(coordinates: [number, number][]) {
  const longitude = { west: 180, east: -180 }
  const latitude = { south: 90, north: -90 }
  const coordinatesLength = coordinates.length

  coordinates.forEach(([lng, lat]) => {
    longitude.west = Math.min(longitude.west, lng)
    longitude.east = Math.max(longitude.east, lng)
    latitude.south = Math.min(latitude.south, lat)
    latitude.north = Math.max(latitude.north, lat)
  })

  const { south, north } = latitude
  const { west, east } = longitude

  return {
    center: {
      lat: (north + south) / 2,
      lng: (west + east) / 2,
    } as google.maps.LatLngLiteral,
    bounds:
      coordinatesLength !== 1
        ? ({
            south,
            west,
            north,
            east,
          } as google.maps.LatLngBoundsLiteral)
        : null,
  }
}

export function literalToString(
  latLngOrBounds:
    | google.maps.LatLngLiteral
    | google.maps.LatLngBoundsLiteral
    | null,
) {
  if (!latLngOrBounds) {
    return ''
  } else if ('south' in latLngOrBounds) {
    const { south, west, north, east } =
      latLngOrBounds as google.maps.LatLngBoundsLiteral

    return `((${south}, ${west}), (${north}, ${east}))`
  } else if ('lat' in latLngOrBounds) {
    const { lat, lng } = latLngOrBounds as google.maps.LatLngLiteral

    return `(${lat}, ${lng})`
  }
}

export function getShiftLatLng(
  map: google.maps.Map,
  latLng: google.maps.LatLng,
  offset: google.maps.Point | { x: number; y: number },
) {
  const projection = map.getProjection() as google.maps.Projection

  if (!projection) {
    return latLng
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const zoom = map.getZoom()!
  const scale = Math.pow(2, zoom)
  const { x, y } = offset
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const centerPoint = projection.fromLatLngToPoint(latLng)!
  const offsetPoint = new google.maps.Point(x / scale || 0, y / scale || 0)

  centerPoint.x += offsetPoint.x
  centerPoint.y += offsetPoint.y

  return projection.fromPointToLatLng(centerPoint)
}
