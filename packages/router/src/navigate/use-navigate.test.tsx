import { renderHook } from '@testing-library/react'
import { useEnv, ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { useNavigate } from './use-navigate'

const transitionModalShowMockFn = jest.fn()
const loginModalShowMockFn = jest.fn()
const openOutlinkMockFn = jest.fn()
const openNativeLinkMockFn = jest.fn()

jest.mock('@titicaca/triple-web', () => ({
  ...jest.requireActual('@titicaca/triple-web'),
  useEnv: jest.fn().mockReturnValue({
    webUrlBase: 'https://triple.guide',
  }),
  useTransitionModal: jest
    .fn()
    .mockImplementation(() => ({ show: transitionModalShowMockFn })),
  useLoginCtaModal: jest.fn().mockImplementation(() => ({
    show: loginModalShowMockFn,
  })),
}))

jest.mock('../links', () => ({
  ...jest.requireActual('../links'),
  useOpenOutlink: jest.fn().mockImplementation(() => openOutlinkMockFn),
  useOpenNativeLink: jest.fn().mockImplementation(() => openNativeLinkMockFn),
}))

describe('브라우저', () => {
  describe('routable한 href를 가진 URL로 호출하면 현재 창에서 라우팅합니다.', () => {
    const { webUrlBase } = useEnv()
    const routablePath = '/login'

    test.each([
      [routablePath],
      [`${webUrlBase}${routablePath}`],
      [`/inlink?path=${encodeURIComponent(routablePath)}&_web_expand=true`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${routablePath}`)}`],
    ])('href: %s', (href) => {
      const changeLocationHref = jest.fn()

      const {
        result: {
          current: { navigate },
        },
      } = renderHook(useNavigate, {
        initialProps: { changeLocationHref },
        wrapper: createTestWrapper(),
      })

      navigate(href)

      expect(changeLocationHref).toHaveBeenCalledWith(routablePath)
    })
  })

  describe('routable하지 않은 href를 가진 URL로 호출하면 앱 설치 유도 모달을 표시합니다.', () => {
    const { webUrlBase } = useEnv()

    const notRoutablePath = '/i/am/not/routable'

    test.each([
      [notRoutablePath],
      [`${webUrlBase}${notRoutablePath}`],
      [`/inlink?path=${encodeURIComponent(notRoutablePath)}&_web_expand=true`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${notRoutablePath}`)}`],
    ])('href: %s', (href) => {
      const changeLocationHref = jest.fn()

      const {
        result: {
          current: { navigate },
        },
      } = renderHook(useNavigate, {
        initialProps: { changeLocationHref },
        wrapper: createTestWrapper(),
      })

      navigate(href)

      expect(changeLocationHref).not.toHaveBeenCalled()
      expect(transitionModalShowMockFn).toHaveBeenCalledTimes(1)

      transitionModalShowMockFn.mockRestore()
    })
  })

  test('inlink에 web_expand 파라미터가 없으면 routable하더라도 앱 설치 유도 모달을 표시합니다.', () => {
    const changeLocationHref = jest.fn()
    const {
      result: {
        current: { navigate },
      },
    } = renderHook(useNavigate, {
      initialProps: { changeLocationHref },
      wrapper: createTestWrapper(),
    })

    navigate(`/inlink?path=${encodeURIComponent('/login')}`)

    expect(changeLocationHref).not.toHaveBeenCalled()
    expect(transitionModalShowMockFn).toHaveBeenCalledTimes(1)

    transitionModalShowMockFn.mockRestore()
  })
})

describe('앱', () => {
  describe('세션이 없고 routable하지 않은 href를 가지고 있는 URL로 호출하면 로그인 유도 모달을 표시합니다.', () => {
    const { webUrlBase } = useEnv()
    const href = '/i/am/not/routable/url'

    test.each([
      [href],
      [`${webUrlBase}${href}`],
      [`/inlink?path=${encodeURIComponent(href)}`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${href}`)}`],
    ])('href: %s', (href) => {
      const changeLocationHref = jest.fn()

      const {
        result: {
          current: { navigate },
        },
      } = renderHook(useNavigate, {
        initialProps: { changeLocationHref },
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.Android, version: '6.5.0' },
          },
        }),
      })

      navigate(href)

      expect(changeLocationHref).not.toHaveBeenCalled()
      expect(loginModalShowMockFn).toHaveBeenCalledTimes(1)

      loginModalShowMockFn.mockRestore()
    })
  })

  test('절대 경로로 호출하면 outlink로 엽니다.', () => {
    const href = 'https://www.google.com'
    const changeLocationHref = jest.fn()

    const {
      result: {
        current: { navigate },
      },
    } = renderHook(useNavigate, {
      initialProps: { changeLocationHref },
      wrapper: createTestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
        sessionProvider: {
          user: {
            name: 'TripleTester',
            provider: 'TRIPLE',
            country: 'ko',
            lang: 'ko',
            unregister: null,
            photo: 'images.source',
            mileage: {
              badges: [{ icon: { imageUrl: '' } }],
              level: 1,
              point: 0,
            },
            uid: 'test',
          },
        },
      }),
    })

    navigate(href)

    expect(openOutlinkMockFn).toHaveBeenCalledWith(href, undefined)
  })

  test('상대 경로이면 네이티브 앱 URL로 간주하고 엽니다.', () => {
    const href = '/my-app/wonderful/path'
    const changeLocationHref = jest.fn()

    const {
      result: {
        current: { navigate },
      },
    } = renderHook(useNavigate, {
      initialProps: { changeLocationHref },
      wrapper: createTestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
        sessionProvider: {
          user: {
            name: 'TripleTester',
            provider: 'TRIPLE',
            country: 'ko',
            lang: 'ko',
            unregister: null,
            photo: 'images.source',
            mileage: {
              badges: [{ icon: { imageUrl: '' } }],
              level: 1,
              point: 0,
            },
            uid: 'test',
          },
        },
      }),
    })

    navigate(href)

    expect(openNativeLinkMockFn).toHaveBeenCalledWith(href)
  })
})
