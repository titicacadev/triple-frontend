import { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import i18n from 'i18next'
import {
  ClientAppName,
  EventTrackingProvider,
  TripleWeb,
} from '@titicaca/triple-web'

import { ScrapButtonMask } from './scrap-button-mask'
import { ComposedOverlayScrapButton as OverlayScrapButton } from './overlay-scrap-button'
import { ComposedOutlineScrapButton as OutlineScrapButton } from './outline-scrap-button'

describe('ScrapButtonMask 컴포넌트', () => {
  it('should not render child scrap button.', () => {
    const { container } = render(
      <ScrapButtonMask masked>
        <OverlayScrapButton
          resource={{
            id: 'MOCK_RESOURCE_ID',
            type: 'MOCK_TYPE',
            scraped: false,
          }}
          size={36}
        />
        <OutlineScrapButton
          resource={{
            id: 'MOCK_RESOURCE_ID',
            type: 'MOCK_TYPE',
            scraped: false,
          }}
          size={36}
        />
      </ScrapButtonMask>,
      {
        wrapper: TestWrapper,
      },
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('should render child scrap button with masked false', () => {
    render(
      <ScrapButtonMask masked={false}>
        <OverlayScrapButton
          resource={{
            id: 'MOCK_RESOURCE_ID',
            type: 'MOCK_TYPE',
            scraped: false,
          }}
          size={36}
          data-testid="scrap-button-1"
        />
        <OutlineScrapButton
          resource={{
            id: 'MOCK_RESOURCE_ID',
            type: 'MOCK_TYPE',
            scraped: false,
          }}
          size={36}
          data-testid="scrap-button-2"
        />
      </ScrapButtonMask>,
      {
        wrapper: TestWrapper,
      },
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})

function TestWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <TripleWeb
      clientAppProvider={{
        metadata: {
          name: ClientAppName.iOS,
          version: '6.5.0',
        },
        device: {
          autoplay: 'always',
          networkType: 'wifi',
        },
      }}
      envProvider={{
        appUrlScheme: 'dev-soto',
        webUrlBase: 'https://triple-dev.titicaca-corp.com',
        facebookAppId: '',
        defaultPageTitle: '',
        defaultPageDescription: '',
        googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
      }}
      sessionProvider={{
        user: null,
      }}
      i18nProvider={{
        i18n,
        lang: 'ko',
      }}
      userAgentProvider={{
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      }}
    >
      <EventTrackingProvider page={{ label: 'test', path: '/test' }} utm={{}}>
        {children}
      </EventTrackingProvider>
    </TripleWeb>
  )
}
