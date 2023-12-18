import type { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react'

import { ClientAppContext } from '../../contexts'
import { ClientAppName } from '../../types'

import { useFeatureFlag } from './use-feature-flag'

it('returns true if app version meets the version operator requirements', () => {
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

it('returns false if app version does not meet the version operator requirements', () => {
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

it('returns false if app name does not meet the requirements', () => {
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

it('returns false if app does not exist and is not avilable on public', () => {
  const { result } = renderHook(() =>
    useFeatureFlag({
      operator: 'gte',
      appName: 'Triple-Android',
      appVersion: '5.12.0',
      availableOnPublic: false,
    }),
  )

  expect(result.current).toBeFalsy()
})

it('returns true if app does not exist and is avilable on public', () => {
  const { result } = renderHook(() =>
    useFeatureFlag({
      operator: 'gte',
      appName: 'Triple-Android',
      appVersion: '5.12.0',
      availableOnPublic: true,
    }),
  )

  expect(result.current).toBeTruthy()
})
