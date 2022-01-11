import type { IncomingMessage } from 'http'

import React from 'react'
import type { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { ClientContextProvider, useClientContext } from './client-context'

describe('useClientContext', () => {
  it('should return null when provider has received no app props', () => {
    const wrapper = ({
      children,
    }: PropsWithChildren<Record<string, never>>) => (
      <ClientContextProvider {...null}>{children}</ClientContextProvider>
    )

    const { result } = renderHook(() => useClientContext(), { wrapper })

    expect(result.current).toBe(null)
  })

  it('should return null when provider has not received proper app props', () => {
    const wrapper = ({
      children,
    }: PropsWithChildren<Record<string, never>>) => (
      <ClientContextProvider appName="Triple-iOS">
        {children}
      </ClientContextProvider>
    )

    const { result } = renderHook(() => useClientContext(), { wrapper })

    expect(result.current).toBe(null)
  })

  it('should return app spec when provider has received proper app props', () => {
    const wrapper = ({
      children,
    }: PropsWithChildren<Record<string, never>>) => (
      <ClientContextProvider appName="Triple-iOS" appVersion="5.11.0">
        {children}
      </ClientContextProvider>
    )

    const { result } = renderHook(() => useClientContext(), { wrapper })

    expect(result.current).toStrictEqual({
      appName: 'Triple-iOS',
      appVersion: '5.11.0',
    })
  })

  it('should not raise error when context provider is mounted before', () => {
    const wrapper = ({
      children,
    }: PropsWithChildren<Record<string, never>>) => (
      <ClientContextProvider {...null}>{children}</ClientContextProvider>
    )

    const { result } = renderHook(() => useClientContext(), { wrapper })

    expect(result.error).not.toBeTruthy()
  })

  it('should raise error when no context provider is mounted before', () => {
    const { result } = renderHook(() => useClientContext())

    expect(result.error).toBeTruthy()
  })
})

describe('ClientContextProvider.getInitialProps', () => {
  it('should extract app user agent from req', () => {
    const req = {
      headers: {
        userAgent:
          'Mozilla/5.0 (Linux; Android 10; SM-G965N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.70 Mobile Safari/537.36 Triple-Android/5.11.0',
      },
    } as unknown as IncomingMessage

    expect(
      ClientContextProvider.getInitialProps({ req }),
    ).resolves.toStrictEqual({
      appName: 'Triple-Android',
      appVersion: '5.11.0',
    })
  })

  it('should extract app user agent from window if available', () => {
    const userAgentSpy = jest.spyOn(global.window.navigator, 'userAgent', 'get')

    userAgentSpy.mockImplementation(
      () =>
        'Mozilla/5.0 (Linux; Android 10; SM-G965N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.70 Mobile Safari/537.36 Triple-Android/5.11.0',
    )

    expect(ClientContextProvider.getInitialProps({})).resolves.toStrictEqual({
      appName: 'Triple-Android',
      appVersion: '5.11.0',
    })

    userAgentSpy.mockRestore()
  })

  it('should fall back safely', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    windowSpy.mockImplementation(() => undefined)

    expect(ClientContextProvider.getInitialProps({})).resolves.toBeNull()

    windowSpy.mockRestore()
  })
})
