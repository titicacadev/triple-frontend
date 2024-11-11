import { renderHook } from '@testing-library/react'

import { ClientAppName } from './types'
import { useClientAppActions } from './use-client-app-actions'
import { ClientAppContext } from './context'

test('최소 버전 목록에 등록되지 않은 경우 함수를 그대로 반환해야 합니다', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider
        value={{
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '6.5.0' },
        }}
      >
        {children}
      </ClientAppContext.Provider>
    ),
  })

  expect(result.current.showToast).toBeDefined()
})

test('최소 버전 목록에 일치하지 않는 경우 함수를 반환하지 않아야 합니다', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider
        value={{
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '5.10.0' },
        }}
      >
        {children}
      </ClientAppContext.Provider>
    ),
  })

  expect(result.current.subscribeTripUpdateEvent).toBeUndefined()
})

test('최소 버전 목록에 일치하는 경우 함수를 반환해야 합니다', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider
        value={{
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '5.12.0' },
        }}
      >
        {children}
      </ClientAppContext.Provider>
    ),
  })

  expect(result.current.subscribeTripUpdateEvent).toBeDefined()
})

test('페이지가 트리플 클라이언트에 없으면 함수를 반환하지 않아야 합니다', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider value={null}>
        {children}
      </ClientAppContext.Provider>
    ),
  })

  expect(result.current.showToast).toBeUndefined()
})
