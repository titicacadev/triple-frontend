import { render, screen } from '@testing-library/react'

import EmailPreview from './preview'

test('EmailPreview를 렌더링합니다.', () => {
  const mockedPreviewValue = {
    phrase: 'Cheking Email',
  }

  render(<EmailPreview value={mockedPreviewValue} />)

  const previewElement = screen.getByText(mockedPreviewValue.phrase)

  expect(previewElement).toBeInTheDocument()
})
