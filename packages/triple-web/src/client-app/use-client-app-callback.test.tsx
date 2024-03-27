import { renderHook } from '@testing-library/react'
import i18n from 'i18next'

import { TransitionType } from '../modal/constants'
import { TripleWeb } from '../providers'

import { useClientAppCallback } from './use-client-app-callback'
import { ClientAppName } from './types'

const mockFn = jest.fn()
const mockShow = jest.fn()

jest.mock('../modal/use-transition-modal', () => ({
  __esModule: true,
  ...jest.requireActual('../modal/use-transition-modal'),
  useTransitionModal: jest.fn().mockImplementation(() => ({
    show: mockShow,
  })),
}))

afterEach(() => {
  jest.clearAllMocks()
})

test('일반 브라우저에서 앱 전환 모달 표시 함수를 호출합니다.', () => {
  const { result } = renderHook(
    () => useClientAppCallback(TransitionType.General, mockFn),
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
            googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
            afOnelinkId: '',
            afOnelinkPid: '',
            afOnelinkSubdomain: '',
          }}
          i18nProvider={{ i18n, lang: 'ko' }}
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

  result.current()

  expect(mockShow).toHaveBeenCalledTimes(1)
})

test('앱에서 앱 전환 모달 표시 함수를 호출하지 않습니다.', () => {
  const { result } = renderHook(
    () => useClientAppCallback(TransitionType.General, mockFn),
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
            googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
            afOnelinkId: '',
            afOnelinkPid: '',
            afOnelinkSubdomain: '',
          }}
          i18nProvider={{ i18n, lang: 'ko' }}
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

  result.current()

  expect(mockShow).toHaveBeenCalledTimes(0)
})
