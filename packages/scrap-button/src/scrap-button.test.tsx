import { render, screen } from '@testing-library/react'
import { ScrapsProvider, EventTrackingProvider } from '@titicaca/react-contexts'

import { OutlineScrapButton, OverlayScrapButton } from './scrap-button'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { myProp: '' },
  }),
}))

describe('ScrapButton', () => {
  it('should render successfully.', () => {
    const { unmount } = render(
      <OverlayScrapButton
        resource={{
          id: 'MOCK_RESOURCE_ID',
          type: 'MOCK_TYPE',
          scraped: false,
        }}
        size={36}
      />,
      {
        wrapper: ({ children }) => (
          <EventTrackingProvider page={{ label: '기본 label', path: '/' }}>
            <ScrapsProvider>{children}</ScrapsProvider>
          </EventTrackingProvider>
        ),
      },
    )

    expect(screen.getByRole('button')).not.toBeFalsy()

    unmount()

    render(
      <OutlineScrapButton
        resource={{
          id: 'MOCK_RESOURCE_ID',
          type: 'MOCK_TYPE',
          scraped: false,
        }}
        size={36}
      />,
      {
        wrapper: ({ children }) => (
          <EventTrackingProvider page={{ label: '기본 label', path: '/' }}>
            <ScrapsProvider>{children}</ScrapsProvider>
          </EventTrackingProvider>
        ),
      },
    )
    expect(screen.getByRole('button')).not.toBeFalsy()
  })
})
