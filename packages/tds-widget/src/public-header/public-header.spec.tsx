import { render } from '@testing-library/react'
import { ClientAppName, TestWrapper } from '@titicaca/triple-web'

import { PublicHeader } from './public-header'

it('renders nothing inside triple client', () => {
  const { container } = render(<PublicHeader />, {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.Android, version: '1.0.0' },
      },
    }),
  })

  expect(container.childNodes).toHaveLength(0)
})

it('renders header outside triple client', () => {
  const { container } = render(<PublicHeader />, {
    wrapper: TestWrapper({
      clientAppProvider: null,
    }),
  })

  expect(container.childNodes).toHaveLength(1)
})
