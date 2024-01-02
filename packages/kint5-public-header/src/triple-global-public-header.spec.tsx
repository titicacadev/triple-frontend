import { render } from '@testing-library/react'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { TripleGlobalPublicHeader } from './triple-global-public-header'

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

  const { container } = render(<TripleGlobalPublicHeader />)

  expect(container.childNodes).toHaveLength(0)
})

it('renders header outside triple client', () => {
  ;(
    useTripleClientMetadata as jest.MockedFunction<
      typeof useTripleClientMetadata
    >
  ).mockReturnValue(null)

  const { container } = render(<TripleGlobalPublicHeader />)

  expect(container.childNodes).toHaveLength(1)
})
