import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ScrapsProvider } from '@titicaca/react-contexts'

import { OverlayScrapButton, OutlineScrapButton } from './scrap-button'
import { ScrapButtonMask } from './scrap-button-mask'

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
      { wrapper: ScrapsProvider },
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('should render child scrap button with masked false', () => {
    const { getAllByRole } = render(
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
      { wrapper: ScrapsProvider },
    )

    expect(getAllByRole('button')).toHaveLength(2)
  })
})
