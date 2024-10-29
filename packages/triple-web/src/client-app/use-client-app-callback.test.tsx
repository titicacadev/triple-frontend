import { renderHook } from '@testing-library/react'

import { HashRouterProvider } from '../hash-router/context'
import { ModalProvider } from '../modal/context'
import { UserAgentContext } from '../user-agent/context'

import { useClientAppCallback } from './use-client-app-callback'
import { ClientAppName } from './types'
import { ClientAppContext } from './context'

const mockFn = jest.fn()
const mockShow = jest.fn()

jest.mock('../modal/use-app-install-cta-modal', () => ({
  __esModule: true,
  ...jest.requireActual('../modal/use-app-install-cta-modal'),
  useAppInstallCtaModal: jest.fn().mockImplementation(() => ({
    show: mockShow,
  })),
}))

afterEach(() => {
  jest.clearAllMocks()
})

test('일반 브라우저에서 앱 전환 모달 표시 함수를 호출합니다.', () => {
  const { result } = renderHook(() => useClientAppCallback(mockFn), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider value={null}>
        <UserAgentContext.Provider
          value={{
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            browser: { name: 'Chrome', version: '120.0.0.0', major: '120' },
            cpu: { architecture: 'arm64' },
            device: { type: undefined, model: 'Macintosh', vendor: 'Apple' },
            engine: { name: 'Blink', version: '120.0.0.0' },
            os: { name: 'macOS', version: '13.4.0' },
            isMobile: true,
          }}
        >
          <HashRouterProvider>
            <ModalProvider>{children}</ModalProvider>
          </HashRouterProvider>
        </UserAgentContext.Provider>
      </ClientAppContext.Provider>
    ),
  })

  result.current()

  expect(mockShow).toHaveBeenCalledTimes(1)
})

test('앱에서 앱 전환 모달 표시 함수를 호출하지 않습니다.', () => {
  const { result } = renderHook(() => useClientAppCallback(mockFn), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider
        value={{
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '6.5.0' },
        }}
      >
        <UserAgentContext.Provider
          value={{
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            browser: { name: 'Chrome', version: '120.0.0.0', major: '120' },
            cpu: { architecture: 'arm64' },
            device: { type: undefined, model: 'Macintosh', vendor: 'Apple' },
            engine: { name: 'Blink', version: '120.0.0.0' },
            os: { name: 'macOS', version: '13.4.0' },
            isMobile: true,
          }}
        >
          <HashRouterProvider>
            <ModalProvider>{children}</ModalProvider>
          </HashRouterProvider>
        </UserAgentContext.Provider>
      </ClientAppContext.Provider>
    ),
  })

  result.current()

  expect(mockShow).toHaveBeenCalledTimes(0)
})
