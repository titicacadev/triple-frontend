import { renderHook } from '@testing-library/react'
import {
  useSessionAvailability,
  useEnv,
  useTransitionModal,
  useLoginCtaModal,
  TestWrapper,
  ClientAppName,
} from '@titicaca/triple-web'
import { checkIfRoutable } from '@titicaca/view-utilities'

import { useNavigate } from './use-navigate'

jest.mock('@titicaca/view-utilities', () => ({
  ...jest.requireActual('@titicaca/view-utilities'),
  checkIfRoutable: jest.fn(),
}))
jest.mock('@titicaca/react-triple-client-interfaces')

const webUrlBase = mockWebUrlBase()
const routablePath = mockRoutablePath()

describe('브라우저', () => {
  describe('routable한 href를 가진 URL로 호출하면 현재 창에서 라우팅합니다.', () => {
    test.each([
      [routablePath],
      [`${webUrlBase}${routablePath}`],
      [`/inlink?path=${encodeURIComponent(routablePath)}&_web_expand=true`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${routablePath}`)}`],
    ])('href: %s', (href) => {
      prepareTest()
      const changeLocationHref = jest.fn()

      const {
        result: {
          current: { navigate },
        },
      } = renderHook(useNavigate, {
        initialProps: { changeLocationHref },
        wrapper: TestWrapper({
          clientAppProvider: null,
        }),
      })

      navigate(href)

      expect(changeLocationHref).toHaveBeenCalledWith(routablePath)
    })
  })

  describe('routable하지 않은 href를 가진 URL로 호출하면 앱 설치 유도 모달을 표시합니다.', () => {
    const href = '/i/am/not/routable'

    test.each([
      [href],
      [`${webUrlBase}${href}`],
      [`/inlink?path=${encodeURIComponent(href)}&_web_expand=true`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${href}`)}`],
    ])('href: %s', (href) => {
      const { showTransitionModal } = prepareTest()
      const changeLocationHref = jest.fn()

      const {
        result: {
          current: { navigate },
        },
      } = renderHook(useNavigate, {
        initialProps: { changeLocationHref },
        wrapper: TestWrapper({
          clientAppProvider: null,
        }),
      })
      navigate(href)

      expect(changeLocationHref).not.toHaveBeenCalled()
      expect(showTransitionModal).toHaveBeenCalled()
    })
  })

  test('inlink에 web_expand 파라미터가 없으면 routable하더라도 앱 설치 유도 모달을 표시합니다.', () => {
    const { showTransitionModal } = prepareTest()
    const changeLocationHref = jest.fn()

    const {
      result: {
        current: { navigate },
      },
    } = renderHook(useNavigate, {
      initialProps: { changeLocationHref },
      wrapper: TestWrapper({
        clientAppProvider: null,
      }),
    })

    navigate(`/inlink?path=${encodeURIComponent(routablePath)}`)

    expect(changeLocationHref).not.toHaveBeenCalled()
    expect(showTransitionModal).toHaveBeenCalled()
  })
})

describe('앱', () => {
  describe('세션이 없고 routable하지 않은 href를 가지고 있는 URL로 호출하면 로그인 유도 모달을 표시합니다.', () => {
    const href = '/i/am/not/routable/url'

    test.each([
      [href],
      [`${webUrlBase}${href}`],
      [`/inlink?path=${encodeURIComponent(href)}`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${href}`)}`],
    ])('href: %s', (href) => {
      const { showLoginCtaModal } = prepareTest({
        sessionAvailable: false,
      })
      const changeLocationHref = jest.fn()

      const {
        result: {
          current: { navigate },
        },
      } = renderHook(useNavigate, {
        initialProps: { changeLocationHref },
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.Android, version: '1.0.0' },
          },
        }),
      })

      navigate(href)

      expect(changeLocationHref).not.toHaveBeenCalled()
      expect(showLoginCtaModal).toHaveBeenCalled()
    })
  })

  test('절대 경로로 호출하면 outlink로 엽니다.', () => {
    const href = 'https://www.google.com'
    mockRoutablePath(href)
    const { openOutlink } = prepareTest({
      sessionAvailable: false,
    })
    const changeLocationHref = jest.fn()

    const {
      result: {
        current: { navigate },
      },
    } = renderHook(useNavigate, {
      initialProps: { changeLocationHref },
      wrapper: TestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
      }),
    })

    navigate(href)

    expect(openOutlink).toHaveBeenCalledWith(href, undefined)
  })

  test('상대 경로이면 네이티브 앱 URL로 간주하고 엽니다.', () => {
    const href = '/my-app/wonderful/path'
    const { openNativeLink } = prepareTest({
      sessionAvailable: true,
    })
    const changeLocationHref = jest.fn()

    const {
      result: {
        current: { navigate },
      },
    } = renderHook(useNavigate, {
      initialProps: { changeLocationHref },
      wrapper: TestWrapper({
        clientAppProvider: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.Android, version: '1.0.0' },
        },
      }),
    })

    navigate(href)

    expect(openNativeLink).toHaveBeenCalledWith(href)
  })
})

function mockWebUrlBase() {
  const webUrlBase = 'https://triple.guide'
  ;(
    useEnv as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useEnv>, 'webUrlBase'>
    >
  ).mockImplementation(() => ({ webUrlBase }))
  return webUrlBase
}

function mockRoutablePath(routablePath = '/this/is/routable/path') {
  ;(
    checkIfRoutable as jest.MockedFunction<typeof checkIfRoutable>
  ).mockImplementation(({ href }) => {
    return href === routablePath
  })
  return routablePath
}

function prepareTest({
  sessionAvailable = false,
}: { sessionAvailable?: boolean } = {}) {
  const showTransitionModal = jest.fn()
  const showLoginCtaModal = jest.fn()
  const openInlink = jest.fn()
  const openOutlink = jest.fn()
  const openNativeLink = jest.fn()

  ;(
    useTransitionModal as jest.MockedFunction<typeof useTransitionModal>
  ).mockImplementation(() => ({ show: showTransitionModal, close: () => {} }))
  ;(
    useLoginCtaModal as jest.MockedFunction<typeof useLoginCtaModal>
  ).mockImplementation(() => ({ show: showLoginCtaModal, close: () => {} }))
  ;(
    useSessionAvailability as jest.MockedFunction<typeof useSessionAvailability>
  ).mockImplementation(() => sessionAvailable)

  return {
    showTransitionModal,
    showLoginCtaModal,
    openInlink,
    openOutlink,
    openNativeLink,
  }
}
