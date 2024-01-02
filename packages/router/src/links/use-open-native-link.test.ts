import {
  ClientAppName,
  useClientApp,
  useEnv,
  useTransitionModal,
} from '@titicaca/triple-web'
import { renderHook } from '@testing-library/react'

import { useOpenNativeLink } from './use-open-native-link'

jest.mock('@titicaca/triple-web')

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      href: '/',
    },
    writable: true,
  })
  ;(useEnv as jest.MockedFunction<typeof useEnv>).mockReturnValue({
    appUrlScheme: 'triple-test',
    afOnelinkId: '',
    afOnelinkPid: '',
    afOnelinkSubdomain: '',
    defaultPageDescription: '',
    defaultPageTitle: '',
    facebookAppId: '',
    webUrlBase: '',
  })
})

test('인 앱 웹뷰에서는 딥링크로 이동합니다.', () => {
  ;(useClientApp as jest.MockedFunction<typeof useClientApp>).mockReturnValue({
    device: { autoplay: 'always', networkType: 'unknown' },
    metadata: { name: ClientAppName.Android, version: '1.0.0' },
  })

  const { result } = renderHook(() => useOpenNativeLink())

  result.current('/test-path')

  // Assuming makeInlink is a function that formats the URL correctly
  expect(window.location.href).toBe('triple-test:///test-path')
})

test('인 앱 웹뷰가 아니면 TransitionModal을 엽니다.', () => {
  const mockShowTransitionModal = jest.fn()

  ;(useClientApp as jest.MockedFunction<typeof useClientApp>).mockReturnValue(
    null,
  )
  ;(
    useTransitionModal as jest.MockedFunction<typeof useTransitionModal>
  ).mockReturnValue({
    show: mockShowTransitionModal,
    close: jest.fn(),
  })

  const { result } = renderHook(() => useOpenNativeLink())

  result.current('/test-path')

  expect(mockShowTransitionModal).toHaveBeenCalled()
})
