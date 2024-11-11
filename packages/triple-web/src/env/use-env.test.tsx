import { renderHook } from '@testing-library/react'

import { useEnv } from './use-env'
import { EnvContext } from './context'
import { EnvValue } from './types'

test('EnvContext가 정의된 경우 값을 반환해야 합니다.', () => {
  const mockValue: EnvValue = {
    appUrlScheme: 'triple-test',
    basePath: '/',
    afOnelinkId: '',
    afOnelinkPid: '',
    afOnelinkSubdomain: '',
    defaultPageDescription: '',
    defaultPageTitle: '',
    facebookAppId: '',
    webUrlBase: '',
  }

  const { result } = renderHook(() => useEnv(), {
    wrapper: ({ children }) => (
      <EnvContext.Provider value={mockValue}>{children}</EnvContext.Provider>
    ),
  })

  expect(result.current).toBe(mockValue)
})

test('EnvContext가 정의되지 않은 경우 오류를 발생시켜야 합니다.', () => {
  expect(() => {
    renderHook(() => useEnv())
  }).toThrow('EnvContext가 없습니다.')
})
