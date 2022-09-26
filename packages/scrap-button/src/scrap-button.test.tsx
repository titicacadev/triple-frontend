import { render, screen } from '@testing-library/react'
import { ScrapsProvider } from '@titicaca/react-contexts'

import { OutlineScrapButton, OverlayScrapButton } from './scrap-button'

describe('ScrapButton', () => {
  it('should render successfully.', () => {
    const { unmount } = render(
      <OverlayScrapButton
        resource={{ id: 'MOCK_RESOURCE_ID', type: 'MOCK_TYPE', scraped: false }}
        size={36}
      />,
      { wrapper: ScrapsProvider },
    )

    expect(screen.getByRole('button')).not.toBeFalsy()

    unmount()

    render(
      <OutlineScrapButton
        resource={{ id: 'MOCK_RESOURCE_ID', type: 'MOCK_TYPE', scraped: false }}
        size={36}
      />,
      { wrapper: ScrapsProvider },
    )
    expect(screen.getByRole('button')).not.toBeFalsy()
  })
})
