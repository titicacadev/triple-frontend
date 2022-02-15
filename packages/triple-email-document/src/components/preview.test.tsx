import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import EmailPreview from './preview'

test('EmailPreview를 렌더링합니다.', () => {
  const mockedPreviewValue = {
    phrase: 'Cheking Email',
  }

  const { getByText } = render(<EmailPreview value={mockedPreviewValue} />)

  const previewElement = getByText(mockedPreviewValue.phrase)

  expect(previewElement).toBeInTheDocument()
})
