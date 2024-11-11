import { renderHook } from '@testing-library/react'

import { useClientApp } from './use-client-app'
import { ClientAppContext } from './context'
import { ClientAppName, ClientAppValue } from './types'

test('Context가 정의된 경우 값을 반환해야 합니다.', () => {
  const mockValue: ClientAppValue = {
    device: { autoplay: 'always', networkType: 'cellular' },
    metadata: { name: ClientAppName.iOS, version: '6.5.0' },
  }

  const { result } = renderHook(() => useClientApp(), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider value={mockValue}>
        {children}
      </ClientAppContext.Provider>
    ),
  })

  expect(result.current).toBe(mockValue)
})

test('Context가 정의되지 않은 경우 오류를 발생시켜야 합니다.', () => {
  expect(() => {
    renderHook(() => useClientApp())
  }).toThrow()
})
