import { render } from '@testing-library/react'
import { ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { PublicHeader } from './public-header'

test('renders nothing inside triple client', () => {
  const { container } = render(<PublicHeader />, {
    wrapper: createTestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.iOS, version: '6.5.0' },
      },
    }),
  })

  expect(container.childNodes).toHaveLength(0)
})

test('renders header outside triple client', () => {
  const { container } = render(<PublicHeader />, {
    wrapper: createTestWrapper(),
  })

  expect(container.childNodes).toHaveLength(1)
})
