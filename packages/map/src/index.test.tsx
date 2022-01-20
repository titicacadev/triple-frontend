import React from 'react'
import { render } from '@testing-library/react'

import { MapView, WithGoogleMapProps } from './map-view'

const MOCK_MAP_VIEW: WithGoogleMapProps = {
  coordinates: [
    [114.17816, 22.29867],
    [135.50260942822263, 34.6685201467736],
  ],
  googleMapLoadOptions: {
    googleMapsApiKey: '',
  },
}

jest.mock('@react-google-maps/api', () => ({
  useLoadScript: jest.fn().mockImplementation(() => ({
    isLoaded: true,
    loadError: undefined,
  })),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GoogleMap: ({ children }: { children: React.ReactChildren }) => (
    <div data-testid="google-map">{children}</div>
  ),
}))

test('MapView의 로드 여부를 체크합니다.', () => {
  const { getByTestId } = render(
    <MapView {...MOCK_MAP_VIEW}>
      <div />
    </MapView>,
  )

  expect(getByTestId('google-map')).toBeTruthy()
})
