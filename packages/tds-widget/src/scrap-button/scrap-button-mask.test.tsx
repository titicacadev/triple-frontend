import { render, screen } from '@testing-library/react'
import { ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { ScrapsProvider } from '../scrap/provider'

import { ScrapButtonMask } from './scrap-button-mask'
import { ComposedOverlayScrapButton as OverlayScrapButton } from './overlay-scrap-button'
import { ComposedOutlineScrapButton as OutlineScrapButton } from './outline-scrap-button'

describe('ScrapButtonMask 컴포넌트', () => {
  it('should not render child scrap button.', () => {
    const { container } = render(
      <ScrapsProvider>
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
        </ScrapButtonMask>
      </ScrapsProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
        }),
      },
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('should render child scrap button with masked false', () => {
    render(
      <ScrapsProvider>
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
        </ScrapButtonMask>
      </ScrapsProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
        }),
      },
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
