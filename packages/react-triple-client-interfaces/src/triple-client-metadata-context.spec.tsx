import type { IncomingMessage } from 'http'

import { renderHook } from '@testing-library/react'
import type { PropsWithChildren } from 'react'

import {
  TripleClientMetadataProvider,
  useTripleClientMetadata,
} from './triple-client-metadata-context'

describe('useTripleClientMetadata', () => {
  it('should return null when provider has received no app props', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TripleClientMetadataProvider>{children}</TripleClientMetadataProvider>
    )

    const { result } = renderHook(() => useTripleClientMetadata(), { wrapper })

    expect(result.current).toBeNull()
  })

  it('should return null when provider has not received proper app props', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TripleClientMetadataProvider appName="Triple-iOS">
        {children}
      </TripleClientMetadataProvider>
    )

    const { result } = renderHook(() => useTripleClientMetadata(), { wrapper })

    expect(result.current).toBeNull()
  })

  it('should return app spec when provider has received proper app props', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TripleClientMetadataProvider appName="Triple-iOS" appVersion="5.11.0">
        {children}
      </TripleClientMetadataProvider>
    )

    const { result } = renderHook(() => useTripleClientMetadata(), { wrapper })

    expect(result.current).toStrictEqual({
      appName: 'Triple-iOS',
      appVersion: '5.11.0',
    })
  })

  it('should not raise error when context provider is mounted before', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TripleClientMetadataProvider>{children}</TripleClientMetadataProvider>
    )

    expect(() =>
      renderHook(() => useTripleClientMetadata(), { wrapper }),
    ).not.toThrow()
  })

  it('should raise error when no context provider is mounted before', () => {
    expect(() => renderHook(() => useTripleClientMetadata())).toThrow()
  })
})

describe('TripleClientMetadataProvider.getInitialProps', () => {
  it('should extract app user agent from req', async () => {
    const req = {
      headers: {
        userAgent:
          'Mozilla/5.0 (Linux; Android 10; SM-G965N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.70 Mobile Safari/537.36 Triple-Android/5.11.0',
      },
    } as unknown as IncomingMessage

    await expect(
      TripleClientMetadataProvider.getInitialProps({ req }),
    ).resolves.toStrictEqual({
      appName: 'Triple-Android',
      appVersion: '5.11.0',
    })
  })

  it('should extract app user agent from window if available', async () => {
    const userAgentSpy = jest.spyOn(global.window.navigator, 'userAgent', 'get')

    userAgentSpy.mockImplementation(
      () =>
        'Mozilla/5.0 (Linux; Android 10; SM-G965N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.70 Mobile Safari/537.36 Triple-Android/5.11.0',
    )

    await expect(
      TripleClientMetadataProvider.getInitialProps({}),
    ).resolves.toStrictEqual({
      appName: 'Triple-Android',
      appVersion: '5.11.0',
    })

    userAgentSpy.mockRestore()
  })

  it('should fall back safely', async () => {
    const windowSpy = jest.spyOn(global, 'window', 'get')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    windowSpy.mockImplementation(() => undefined)

    await expect(
      TripleClientMetadataProvider.getInitialProps({}),
    ).resolves.toBeNull()

    windowSpy.mockRestore()
  })
})
