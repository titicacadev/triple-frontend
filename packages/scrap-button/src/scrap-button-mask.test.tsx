import React from 'react'
import { render } from '@testing-library/react'
import { ScrapsProvider } from '@titicaca/react-contexts'

import { OverlayScrapButton, OutlineScrapButton } from './scrap-button'
import { ScrapButtonMask } from './scrap-button-mask'

it('should not render child scrap button.', () => {
  const { container } = render(
    <ScrapButtonMask>
      <OverlayScrapButton
        resource={{ id: 'MOCK_RESOURCE_ID', type: 'MOCK_TYPE', scraped: false }}
        size={36}
      />
      <OutlineScrapButton
        resource={{ id: 'MOCK_RESOURCE_ID', type: 'MOCK_TYPE', scraped: false }}
        size={36}
      />
    </ScrapButtonMask>,
    { wrapper: ScrapsProvider },
  )

  expect(container).toBeEmptyDOMElement()
})
