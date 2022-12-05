import { render } from '@testing-library/react'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { PublicHeader } from './public-header'

jest.mock('@titicaca/react-triple-client-interfaces')

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock('@titicaca/next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  getTranslation: () => (key: string) => key,
}))

it('renders nothing inside triple client', () => {
  ;(
    useTripleClientMetadata as jest.MockedFunction<
      typeof useTripleClientMetadata
    >
  ).mockReturnValue({
    appVersion: '5.11.0',
    appName: 'Triple-iOS',
  })

  const { container } = render(<PublicHeader />)

  expect(container.childNodes.length).toBe(0)
})

it('renders header outside triple client', () => {
  ;(
    useTripleClientMetadata as jest.MockedFunction<
      typeof useTripleClientMetadata
    >
  ).mockReturnValue(null)

  const { container } = render(<PublicHeader />)

  expect(container.childNodes.length).toBe(1)
})
