import { renderHook } from '@testing-library/react'

import { TestWrapper } from '../../test-utils'
import { ClientAppName } from '../../types'

import { useClientAppActions } from './use-client-app-actions'

it('should return the function as-is if version requirement is not listed', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.iOS, version: '5.11.0' },
      },
    }),
  })

  expect(result.current.showToast).not.toBeNull()
})

it('should not return the function if it does not match version requirement', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.iOS, version: '5.10.0' },
      },
    }),
  })

  expect(result.current.subscribeTripUpdateEvent).toBeFalsy()
})

it('should return the function if it matches version requirement', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.iOS, version: '5.12.0' },
      },
    }),
  })

  expect(result.current.subscribeTripUpdateEvent).not.toBeFalsy()
})

it('should not return the function if the page is not on triple client', () => {
  const { result } = renderHook(() => useClientAppActions(), {
    wrapper: TestWrapper({
      clientAppProvider: null,
    }),
  })

  expect(result.current.showToast).toBeFalsy()
})
