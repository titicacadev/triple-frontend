import type { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { TripleClientMetadataProvider } from './triple-client-metadata-context'
import { useTripleClientFeatureFlag } from './use-triple-client-feature-flag'

it('returns true if app version meets the version operator requirements', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <TripleClientMetadataProvider appName="Triple-iOS" appVersion="5.11.0">
      {children}
    </TripleClientMetadataProvider>
  )

  const { result } = renderHook(
    () =>
      useTripleClientFeatureFlag({
        operator: 'gte',
        appVersion: '5.11.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeTruthy()
})

it('returns false if app version does not meet the version operator requirements', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <TripleClientMetadataProvider appName="Triple-iOS" appVersion="5.11.0">
      {children}
    </TripleClientMetadataProvider>
  )

  const { result } = renderHook(
    () =>
      useTripleClientFeatureFlag({
        operator: 'gte',
        appVersion: '5.12.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeFalsy()
})

it('returns false if app name does not meet the requirements', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <TripleClientMetadataProvider appName="Triple-iOS" appVersion="5.11.0">
      {children}
    </TripleClientMetadataProvider>
  )

  const { result } = renderHook(
    () =>
      useTripleClientFeatureFlag({
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
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <TripleClientMetadataProvider>{children}</TripleClientMetadataProvider>
  )

  const { result } = renderHook(
    () =>
      useTripleClientFeatureFlag({
        operator: 'gte',
        appName: 'Triple-Android',
        appVersion: '5.12.0',
        availableOnPublic: false,
      }),
    { wrapper },
  )

  expect(result.current).toBeFalsy()
})

it('returns true if app does not exist and is avilable on public', () => {
  const wrapper = ({ children }: PropsWithChildren<Record<string, never>>) => (
    <TripleClientMetadataProvider>{children}</TripleClientMetadataProvider>
  )

  const { result } = renderHook(
    () =>
      useTripleClientFeatureFlag({
        operator: 'gte',
        appName: 'Triple-Android',
        appVersion: '5.12.0',
        availableOnPublic: true,
      }),
    { wrapper },
  )

  expect(result.current).toBeTruthy()
})
