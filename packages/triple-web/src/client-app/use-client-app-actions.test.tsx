import { renderHook } from '@testing-library/react'

import { ClientAppName } from './types'
import { useClientAppActions } from './use-client-app-actions'
import { ClientAppContext } from './context'

test('should return the function as-is if version requirement is not listed', () => {
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

  expect(result.current.showToast).not.toBeNull()
})

test('should not return the function if it does not match version requirement', () => {
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

  expect(result.current.subscribeTripUpdateEvent).toBeFalsy()
})

test('should return the function if it matches version requirement', () => {
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

  expect(result.current.subscribeTripUpdateEvent).not.toBeFalsy()
})

test('should not return the function if the page is not on triple client', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: ({ children }) => (
      <ClientAppContext.Provider value={null}>
        {children}
      </ClientAppContext.Provider>
    ),
  })

  expect(result.current.showToast).toBeFalsy()
})
