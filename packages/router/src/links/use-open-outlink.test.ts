import { ClientAppName, useClientApp, useEnv } from '@titicaca/triple-web'
import { renderHook } from '@testing-library/react'

import { useOpenOutlink } from './use-open-outlink'

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

test('인 앱 웹뷰에서는 outlink를 사용합니다.', () => {
  ;(useClientApp as jest.MockedFunction<typeof useClientApp>).mockReturnValue({
    device: { autoplay: 'always', networkType: 'unknown' },
    metadata: { name: ClientAppName.Android, version: '1.0.0' },
  })

  const { result } = renderHook(() => useOpenOutlink())

  result.current('/test-path')

  // Assuming makeInlink is a function that formats the URL correctly
  expect(window.location.href).toBe(
    `triple-test:///outlink?url=${encodeURIComponent('/test-path')}`,
  )
})

test('인 앱 웹뷰가 아니면 그냥 url로 이동합니다.', () => {
  ;(useClientApp as jest.MockedFunction<typeof useClientApp>).mockReturnValue(
    null,
  )

  const { result } = renderHook(() => useOpenOutlink())

  result.current('/test-path')

  expect(window.location.href).toBe('/test-path')
})
