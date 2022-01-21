import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { useGoogleMap } from '@react-google-maps/api'

import { MapView, WithGoogleMapProps } from './map-view'
import { FocusTracker } from './focus-tracker'

const MOCK_MAP_VIEW: WithGoogleMapProps = {
  coordinates: [
    [114.17816, 22.29867],
    [135.50260942822263, 34.6685201467736],
  ],
  googleMapLoadOptions: {
    googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
  },
}

jest.mock('@react-google-maps/api', () => ({
  useLoadScript: jest.fn().mockImplementation(() => ({
    isLoaded: true,
    loadError: undefined,
  })),
  useGoogleMap: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GoogleMap: () => <div data-testid="google-map" />,
}))

test('MapView의 로드 여부를 체크합니다.', () => {
  const { getByTestId } = render(<MapView {...MOCK_MAP_VIEW} />)

  expect(getByTestId('google-map')).toBeTruthy()
})

test('올바르게 focusGeolocation prop이 바뀌었는지 체크합니다.', () => {
  const panToMock = jest.fn()

  ;(
    useGoogleMap as unknown as jest.MockedFunction<
      () => Pick<google.maps.Map, 'panTo'>
    >
  ).mockReturnValue({ panTo: panToMock })

  const { getByTestId } = render(
    <MapView {...MOCK_MAP_VIEW}>
      <FocusTracker
        focusGeolocation={{
          type: 'Point',
          coordinates: MOCK_MAP_VIEW.coordinates[0],
        }}
      />
    </MapView>,
    {
      wrapper: () => (
        <div
          data-testid="marker"
          onClick={() => panToMock(MOCK_MAP_VIEW.coordinates[1])}
        />
      ),
    },
  )
  fireEvent.click(getByTestId('marker'))
  expect(panToMock).toBeCalledWith(MOCK_MAP_VIEW.coordinates[1])
})
