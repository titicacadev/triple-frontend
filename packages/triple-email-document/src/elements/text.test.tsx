import React from 'react'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

test('rawHTML을 렌더링합니다.', () => {
  const mockedTextValue = {
    rawHTML: '<a href="/regions/:regionId">Inline link</a>',
  }

  const Text = ELEMENTS.text

  const { getByText } = render(<Text value={mockedTextValue} />)

  const anchorElement = getByText(/Inline link/i).outerHTML

  expect(anchorElement).toBe(mockedTextValue.rawHTML)
})
