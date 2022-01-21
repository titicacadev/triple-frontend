import React from 'react'
import { fireEvent, render } from '@testing-library/react'

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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GoogleMap: () => <div data-testid="google-map" />,
}))

test('MapView의 로드 여부를 체크합니다.', () => {
  const { getByTestId } = render(<MapView {...MOCK_MAP_VIEW} />)

  expect(getByTestId('google-map')).toBeTruthy()
})

test('올바르게 focusGeolocation prop이 바뀌었는지 체크합니다.', () => {
  let coordinates: [number, number] = MOCK_MAP_VIEW.coordinates[0]
  const handleCoordinatesChange = jest.fn(() => {
    coordinates = MOCK_MAP_VIEW.coordinates[1]
  })

  const { getByTestId, rerender } = render(
    <MapView {...MOCK_MAP_VIEW}>
      <FocusTracker
        focusGeolocation={{
          type: 'Point',
          coordinates,
        }}
      />
    </MapView>,
    {
      wrapper: ({ children }) => (
        <div data-testid="marker" onClick={handleCoordinatesChange}>
          {children}
        </div>
      ),
    },
  )

  fireEvent.click(getByTestId('marker'))

  rerender(
    <MapView {...MOCK_MAP_VIEW}>
      <FocusTracker
        focusGeolocation={{
          type: 'Point',
          coordinates,
        }}
      />
    </MapView>,
  )
  expect(handleCoordinatesChange).toBeCalled()
})
