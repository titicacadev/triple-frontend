import { render, screen } from '@testing-library/react'

import { ELEMENTS } from '../index'

test('rawHTML을 렌더링합니다.', () => {
  const mockedTextValue = {
    rawHTML: '<a href="/regions/:regionId">rawHtml Inline link</a>',
  }

  const Text = ELEMENTS.text

  render(<Text value={mockedTextValue} />)

  const anchorElement = screen.getByText(/Inline link/i).outerHTML

  expect(anchorElement).toBe(mockedTextValue.rawHTML)
})

test('text를 렌더링합니다.', () => {
  const mockedTextValue = {
    text: 'Default Text',
  }

  const Text = ELEMENTS.text

  render(<Text value={mockedTextValue} />)

  const textElement = screen.getByText(/Default Text/i)

  expect(textElement).toBeInTheDocument()
})
