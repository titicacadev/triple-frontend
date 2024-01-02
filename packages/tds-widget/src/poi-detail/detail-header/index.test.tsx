import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import '@titicaca/tds-ui'
import { render, screen } from '@testing-library/react'
import { ClientAppName, TestWrapper } from '@titicaca/triple-web'
import { defaultTheme } from '@titicaca/tds-theme'

import DetailHeader from './index'

const addUriHashMockFn = jest.fn()
const removeUriHashMockFn = jest.fn()

jest.mock('@titicaca/triple-web', () => ({
  ...jest.requireActual('@titicaca/triple-web'),
  useTrackEvent: jest.fn().mockImplementation(() => jest.fn()),
  useHashRouter: jest.fn().mockImplementation(() => ({
    addUriHash: addUriHashMockFn,
    removeUriHash: removeUriHashMockFn,
  })),
}))
jest.mock('@titicaca/tds-ui', () => ({
  ...jest.requireActual('@titicaca/tds-ui'),
  longClickable: (Component: FC<{ children?: ReactNode; onClick: unknown }>) =>
    function WrappedLongClickable({
      onLongClick,
      children,
    }: PropsWithChildren<{
      onLongClick?: unknown
    }>) {
      return (
        <Component
          onClick={onLongClick as MouseEventHandler<HTMLDivElement>}
          data-testid="mock-clickable-section"
        >
          {children}
        </Component>
      )
    },
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('when user is on app', () => {
  test('attaches long-click handler to the outermost section', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <DetailHeader
          names={{ ko: 'test', en: 'test', local: 'test' }}
          areaName="테스트 지역"
          scrapsCount={1}
          reviewsCount={0}
          reviewsRating={0}
          onReviewsRatingClick={jest.fn()}
          onCopy={jest.fn()}
        />
        ,
      </ThemeProvider>,
      {
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
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(addUriHashMockFn).toHaveBeenCalled()
  })
})

describe('when user is on web', () => {
  test('attaches long-click handler to the outermost section', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <DetailHeader
          names={{ ko: 'test', en: 'test', local: 'test' }}
          areaName="테스트 지역"
          scrapsCount={1}
          reviewsCount={0}
          reviewsRating={0}
          onReviewsRatingClick={jest.fn()}
          onCopy={jest.fn()}
        />
      </ThemeProvider>,
      {
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
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(addUriHashMockFn).not.toHaveBeenCalled()
  })
})
