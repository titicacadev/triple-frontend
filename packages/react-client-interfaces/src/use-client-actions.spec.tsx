import React from 'react'
import type { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { ClientContextProvider } from './client-context'
import { useClientActions } from './use-client-actions'

it('should return the function as-is if version requirement is not listed', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <ClientContextProvider appName="Triple-iOS" appVersion="5.11.0">
      {children}
    </ClientContextProvider>
  )

  const { result } = renderHook(() => useClientActions(), { wrapper })

  expect(result.current.showToast).not.toBe(null)
})

it('should not return the function if it does not match version requirement', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <ClientContextProvider appName="Triple-iOS" appVersion="5.10.0">
      {children}
    </ClientContextProvider>
  )

  const { result } = renderHook(() => useClientActions(), { wrapper })

  expect(result.current.subscribeTripUpdateEvent).toBeFalsy()
})

it('should return the function if it matches version requirement', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <ClientContextProvider appName="Triple-iOS" appVersion="5.12.0">
      {children}
    </ClientContextProvider>
  )

  const { result } = renderHook(() => useClientActions(), { wrapper })

  expect(result.current.subscribeTripUpdateEvent).not.toBeFalsy()
})

it('should not return the function if the page is not on triple client', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <ClientContextProvider>{children}</ClientContextProvider>
  )

  const { result } = renderHook(() => useClientActions(), { wrapper })

  expect(result.current.showToast).toBeFalsy()
})
