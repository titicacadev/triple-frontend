import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import TripleEmailDocument, { EmailTripleDocumentElement } from '.'

describe('Triple Email Document', () => {
  test('Email Document 컴포넌트가 렌더링되지 않습니다.', () => {
    const mockedChildren: EmailTripleDocumentElement[] = []

    const { queryByRole } = render(
      <TripleEmailDocument>{mockedChildren}</TripleEmailDocument>,
    )

    const TrElement = queryByRole('tr')

    expect(TrElement).toEqual(null)
  })

  test('Heading1 컴포넌트가 렌더링됩니다.', () => {
    const mockedChildren: EmailTripleDocumentElement[] = [
      {
        type: 'heading1',
        value: {
          headline: '보조 제목입니다.',
          text: '제목입니다.',
        },
      },
    ]

    const { getByText } = render(
      <TripleEmailDocument>{mockedChildren}</TripleEmailDocument>,
    )

    const createdTextInHeadingComponent = getByText(/보조 제목입니다./)

    expect(createdTextInHeadingComponent).toBeInTheDocument()
  })
})
