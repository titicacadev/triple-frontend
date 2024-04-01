import { defaultTheme } from '@titicaca/tds-theme'
import { ThemeProvider } from 'styled-components'
import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import '@titicaca/tds-ui'
import { render, screen } from '@testing-library/react'
import { ClientAppName, TripleWeb } from '@titicaca/triple-web'
import i18next from 'i18next'

import { PoiDetailHeaderV2 } from './index'

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

jest.mock('@titicaca/triple-web')
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
  it('attaches long-click handler to the outermost section', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PoiDetailHeaderV2
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
        wrapper: ({ children }) => (
          <TripleWeb
            clientAppProvider={{
              device: { autoplay: 'always', networkType: 'unknown' },
              metadata: { name: ClientAppName.iOS, version: '6.5.0' },
            }}
            envProvider={{
              appUrlScheme: 'dev-soto',
              webUrlBase: 'https://triple-dev.titicaca-corp.com',
              basePath: '/',
              facebookAppId: '',
              defaultPageTitle: '',
              defaultPageDescription: '',
              afOnelinkId: '',
              afOnelinkPid: '',
              afOnelinkSubdomain: '',
            }}
            i18nProvider={{ i18n: i18next, lang: 'ko' }}
            sessionProvider={{ user: null }}
            userAgentProvider={{
              ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
              browser: { name: 'WebKit', version: '605.1.15', major: '605' },
              engine: { name: 'WebKit', version: '605.1.15' },
              os: { name: 'iOS', version: '13.3.1' },
              device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
              cpu: { architecture: undefined },
              isMobile: true,
            }}
          >
            {children}
          </TripleWeb>
        ),
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(addUriHashMockFn).toHaveBeenCalled()
  })
})

describe('when user is on web', () => {
  it('attaches long-click handler to the outermost section', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PoiDetailHeaderV2
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
        wrapper: ({ children }) => (
          <TripleWeb
            clientAppProvider={null}
            envProvider={{
              appUrlScheme: 'dev-soto',
              webUrlBase: 'https://triple-dev.titicaca-corp.com',
              basePath: '/',
              facebookAppId: '',
              defaultPageTitle: '',
              defaultPageDescription: '',
              afOnelinkId: '',
              afOnelinkPid: '',
              afOnelinkSubdomain: '',
            }}
            i18nProvider={{ i18n: i18next, lang: 'ko' }}
            sessionProvider={{ user: null }}
            userAgentProvider={{
              ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              browser: { name: 'Chrome', version: '120.0.0.0', major: '120' },
              cpu: { architecture: 'arm64' },
              device: { type: undefined, model: 'Macintosh', vendor: 'Apple' },
              engine: { name: 'Blink', version: '120.0.0.0' },
              os: { name: 'macOS', version: '13.4.0' },
              isMobile: true,
            }}
          >
            {children}
          </TripleWeb>
        ),
      },
    )

    screen.getByTestId('mock-clickable-section').click()

    expect(addUriHashMockFn).not.toHaveBeenCalled()
  })
})
