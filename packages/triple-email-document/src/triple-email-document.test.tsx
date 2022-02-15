import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import TripleEmailDocument, { TripleEmailDocumentElement } from '.'

type ExtendedTripleEmailDocumentElement =
  | TripleEmailDocumentElement
  | UndefinedDocument

interface UndefinedDocument {
  type: undefined
  value: undefined
}

test('children이 빈 배열이면 Email Document Element가 렌더링되지 않습니다.', () => {
  const mockedChildren: TripleEmailDocumentElement[] = []

  const { queryByRole } = render(
    <TripleEmailDocument elements={mockedChildren} />,
  )

  const TrElement = queryByRole('tr')

  expect(TrElement).toEqual(null)
})

test('type이 정의되지 않은 Element는 렌더링되지 않습니다.', () => {
  const mockedChildren: ExtendedTripleEmailDocumentElement[] = [
    {
      type: undefined,
      value: undefined,
    },
  ]

  const { queryByRole } = render(
    <TripleEmailDocument
      elements={mockedChildren as TripleEmailDocumentElement[]}
    />,
  )

  const TrElement = queryByRole('tr')

  expect(TrElement).toEqual(null)
})

test('Heading1 Element가 렌더링됩니다.', () => {
  const mockedChildren: TripleEmailDocumentElement[] = [
    {
      type: 'heading1',
      value: {
        headline: 'This is headline',
        text: 'This is heading',
      },
    },
  ]

  const { getByText } = render(
    <TripleEmailDocument elements={mockedChildren} />,
  )

  const createdTextInHeadingComponent = getByText(/This is headline/i)

  expect(createdTextInHeadingComponent).toBeInTheDocument()
})
