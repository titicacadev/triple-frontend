import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import TripleEmailDocument, { EmailTripleDocumentElement } from '.'

type ExtendedEmailTripleDocumentElement =
  | EmailTripleDocumentElement
  | UndefinedDocument

interface UndefinedDocument {
  type: undefined
  value: undefined
}

describe('Triple Email Document', () => {
  test('children이 빈 배열이면 Email Document Element가 렌더링되지 않습니다.', () => {
    const mockedChildren: EmailTripleDocumentElement[] = []

    const { queryByRole } = render(
      <TripleEmailDocument>{mockedChildren}</TripleEmailDocument>,
    )

    const TrElement = queryByRole('tr')

    expect(TrElement).toEqual(null)
  })

  test('type이 정의되지 않은 Element는 렌더링되지 않습니다.', () => {
    const mockedChildren: ExtendedEmailTripleDocumentElement[] = [
      {
        type: undefined,
        value: undefined,
      },
    ]

    const { queryByRole } = render(
      <TripleEmailDocument>
        {mockedChildren as EmailTripleDocumentElement[]}
      </TripleEmailDocument>,
    )

    const TrElement = queryByRole('tr')

    expect(TrElement).toEqual(null)
  })

  test('Heading1 Element가 렌더링됩니다.', () => {
    const mockedChildren: EmailTripleDocumentElement[] = [
      {
        type: 'heading1',
        value: {
          headline: 'This is headline',
          text: 'This is heading',
        },
      },
    ]

    const { getByText } = render(
      <TripleEmailDocument>{mockedChildren}</TripleEmailDocument>,
    )

    const createdTextInHeadingComponent = getByText(/This is headline/i)

    expect(createdTextInHeadingComponent).toBeInTheDocument()
  })
})
