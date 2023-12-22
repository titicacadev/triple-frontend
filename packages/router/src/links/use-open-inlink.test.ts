import { ClientAppName, useClientApp, useEnv } from '@titicaca/triple-web'
import { renderHook } from '@testing-library/react'

import { useOpenInlink } from './use-open-inlink'

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

test('인 앱 웹뷰에서는 inlink를 사용합니다.', () => {
  ;(useClientApp as jest.MockedFunction<typeof useClientApp>).mockReturnValue({
    device: { autoplay: 'always', networkType: 'unknown' },
    metadata: { name: ClientAppName.Android, version: '1.0.0' },
  })

  const { result } = renderHook(() => useOpenInlink())

  result.current('/test-path')

  // Assuming makeInlink is a function that formats the URL correctly
  expect(window.location.href).toBe(
    `triple-test:///inlink?path=${encodeURIComponent('/test-path')}`,
  )
})

test('인 앱 웹뷰가 아니면 그냥 path로 이동합니다.', () => {
  ;(useClientApp as jest.MockedFunction<typeof useClientApp>).mockReturnValue(
    null,
  )

  const { result } = renderHook(() => useOpenInlink())

  result.current('/test-path')

  expect(window.location.href).toBe('/test-path')
})
