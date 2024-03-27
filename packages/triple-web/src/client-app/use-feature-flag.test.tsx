import type { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react'

import { useFeatureFlag } from './use-feature-flag'
import { ClientAppContext } from './context'
import { ClientAppName } from './types'

test('returns true if app version meets the version operator requirements', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider
      value={{
        metadata: { name: ClientAppName.iOS, version: '5.11.0' },
        device: { autoplay: 'always', networkType: 'unknown' },
      }}
    >
      {children}
    </ClientAppContext.Provider>
  )

  const { result } = renderHook(
    () =>
      useFeatureFlag({
        operator: 'gte',
        appVersion: '5.11.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeTruthy()
})

test('returns false if app version does not meet the version operator requirements', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider
      value={{
        metadata: { name: ClientAppName.iOS, version: '5.11.0' },
        device: { autoplay: 'always', networkType: 'unknown' },
      }}
    >
      {children}
    </ClientAppContext.Provider>
  )

  const { result } = renderHook(
    () =>
      useFeatureFlag({
        operator: 'gte',
        appVersion: '5.12.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeFalsy()
})

test('returns false if app name does not meet the requirements', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider
      value={{
        metadata: { name: ClientAppName.iOS, version: '5.11.0' },
        device: { autoplay: 'always', networkType: 'unknown' },
      }}
    >
      {children}
    </ClientAppContext.Provider>
  )

  const { result } = renderHook(
    () =>
      useFeatureFlag({
        operator: 'gte',
        appName: 'Triple-Android',
        appVersion: '5.12.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeFalsy()
})

test('returns false if app does not exist and is not available on public', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider value={null}>
      {children}
    </ClientAppContext.Provider>
  )

  const { result } = renderHook(
    () =>
      useFeatureFlag({
        operator: 'gte',
        appName: 'Triple-Android',
        appVersion: '5.12.0',
        availableOnPublic: false,
      }),
    { wrapper },
  )

  expect(result.current).toBeFalsy()
})

test('returns true if app does not exist and is available on public', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider value={null}>
      {children}
    </ClientAppContext.Provider>
  )

  const { result } = renderHook(
    () =>
      useFeatureFlag({
        operator: 'gte',
        appName: 'Triple-Android',
        appVersion: '5.12.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeTruthy()
})
