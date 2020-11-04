import React from 'react'
import { render, screen } from '@testing-library/react'
import { ScrapsProvider } from '@titicaca/react-contexts'

import { OutlineScrapButton, OverlayScrapButton } from '.'

/**
 * 테스트 환경에서 리액트 에러 메시지를 표시하지 않습니다.
 * https://github.com/facebook/react/issues/11098#issuecomment-412682721
 */
function suppressErrorMessage(expectedErrorMessage: string) {
  function onError(event: ErrorEvent) {
    if (event.message === expectedErrorMessage) {
      // Note: this will swallow reports about unhandled errors!
      // Use with extreme caution.
      event.preventDefault()
    }
  }

  window.addEventListener('error', onError)

  return () => {
    window.removeEventListener('error', onError)
  }
}

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

  it('should render nothing without ScrapsProvider, and no error messages.', () => {
    const clear = suppressErrorMessage(
      // useScrapsContext 훅에서 발생하는 에러 메시지
      'ScrapsProvider를 찾을 수 없습니다.',
    )

    const { container: overlayContainer, unmount } = render(
      <OverlayScrapButton
        resource={{ id: 'MOCK_RESOURCE_ID', type: 'MOCK_TYPE', scraped: false }}
        size={36}
      />,
    )

    expect(overlayContainer).toBeEmptyDOMElement()

    unmount()

    const { container: outlineContainer } = render(
      <OutlineScrapButton
        resource={{ id: 'MOCK_RESOURCE_ID', type: 'MOCK_TYPE', scraped: false }}
        size={36}
      />,
    )
    expect(outlineContainer).toBeEmptyDOMElement()

    clear()
  })
})
