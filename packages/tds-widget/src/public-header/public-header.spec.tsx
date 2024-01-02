import { render } from '@testing-library/react'
import { ClientAppName, TestWrapper } from '@titicaca/triple-web'

import { PublicHeader } from './public-header'

test('renders nothing inside triple client', () => {
  const { container } = render(<PublicHeader />, {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.iOS, version: '6.5.0' },
      },
      userAgentProvider: {
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      },
    }),
  })

  expect(container.childNodes).toHaveLength(0)
})

test('renders header outside triple client', () => {
  const { container } = render(<PublicHeader />, {
    wrapper: TestWrapper({
      clientAppProvider: null,
      userAgentProvider: {
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        browser: {
          name: 'Chrome',
          version: '120.0.0.0',
          major: '120',
        },
        cpu: {
          architecture: 'arm64',
        },
        device: {
          type: undefined,
          model: 'Macintosh',
          vendor: 'Apple',
        },
        engine: {
          name: 'Blink',
          version: '120.0.0.0',
        },
        os: {
          name: 'macOS',
          version: '13.4.0',
        },
        isMobile: true,
      },
    }),
  })

  expect(container.childNodes).toHaveLength(1)
})
