import { renderHook } from '@testing-library/react-hooks'
import {
  useUserAgentContext,
  useSessionAvailability,
  useEnv,
} from '@titicaca/react-contexts'
import { checkIfRoutable } from '@titicaca/view-utilities'

import { useAppBridge } from '../common/app-bridge'
import { useOnClientRequired } from '../common/on-client-required'
import { useOnSessionRequired } from '../common/on-session-required'

import { useNavigate } from '.'

jest.mock('@titicaca/view-utilities', () => ({
  ...jest.requireActual('@titicaca/view-utilities'),
  checkIfRoutable: jest.fn(),
}))
jest.mock('@titicaca/react-contexts')
jest.mock('../common/app-bridge')
jest.mock('../common/on-client-required')
jest.mock('../common/on-session-required')

const webUrlBase = mockWebUrlBase()
const routablePath = mockRoutablePath()

describe('브라우저', () => {
  beforeEach(() => {
    mockUserAgentContext({ isPublic: true })
  })

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
        result: { current: navigate },
      } = renderHook(useNavigate, { initialProps: { changeLocationHref } })

      navigate(href)

      expect(changeLocationHref).toBeCalledWith(routablePath)
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
      const { onClientRequired } = prepareTest()
      const changeLocationHref = jest.fn()

      const {
        result: { current: navigate },
      } = renderHook(useNavigate, { initialProps: { changeLocationHref } })
      navigate(href)

      expect(changeLocationHref).not.toBeCalled()
      expect(onClientRequired).toBeCalled()
    })
  })

  test('inlink에 web_expand 파라미터가 없으면 routable하더라도 앱 설치 유도 모달을 표시합니다.', () => {
    const { onClientRequired } = prepareTest()
    const changeLocationHref = jest.fn()

    const {
      result: { current: navigate },
    } = renderHook(useNavigate, { initialProps: { changeLocationHref } })

    navigate(`/inlink?path=${encodeURIComponent(routablePath)}`)

    expect(changeLocationHref).not.toBeCalled()
    expect(onClientRequired).toBeCalled()
  })
})

describe('앱', () => {
  beforeEach(() => {
    mockUserAgentContext({ isPublic: false })
  })

  describe('세션이 없고 routable하지 않은 href를 가지고 있는 URL로 호출하면 로그인 유도 모달을 표시합니다.', () => {
    const href = '/i/am/not/routable/url'

    test.each([
      [href],
      [`${webUrlBase}${href}`],
      [`/inlink?path=${encodeURIComponent(href)}`],
      [`/outlink?url=${encodeURIComponent(`${webUrlBase}${href}`)}`],
    ])('href: %s', (href) => {
      const { onSessionRequired } = prepareTest({
        sessionAvailable: false,
      })
      const changeLocationHref = jest.fn()

      const {
        result: { current: navigate },
      } = renderHook(useNavigate, { initialProps: { changeLocationHref } })

      navigate(href)

      expect(changeLocationHref).not.toBeCalled()
      expect(onSessionRequired).toBeCalled()
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
      result: { current: navigate },
    } = renderHook(useNavigate, { initialProps: { changeLocationHref } })

    navigate(href)

    expect(openOutlink).toBeCalledWith(href, undefined)
  })

  test('상대 경로이면 네이티브 앱 URL로 간주하고 엽니다.', () => {
    const href = '/my-app/wonderful/path'
    const { openNativeLink } = prepareTest({
      sessionAvailable: true,
    })
    const changeLocationHref = jest.fn()

    const {
      result: { current: navigate },
    } = renderHook(useNavigate, { initialProps: { changeLocationHref } })

    navigate(href)

    expect(openNativeLink).toBeCalledWith(href)
  })
})

function mockUserAgentContext({ isPublic }: { isPublic: boolean }) {
  ;(
    useUserAgentContext as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
    >
  ).mockImplementation(() => ({ isPublic }))
}

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
  const onClientRequired = jest.fn()
  const onSessionRequired = jest.fn()
  const openInlink = jest.fn()
  const openOutlink = jest.fn()
  const openNativeLink = jest.fn()

  ;(
    useOnClientRequired as jest.MockedFunction<typeof useOnClientRequired>
  ).mockReturnValue(onClientRequired)
  ;(
    useOnSessionRequired as jest.MockedFunction<typeof useOnSessionRequired>
  ).mockReturnValue(onSessionRequired)
  ;(
    useSessionAvailability as jest.MockedFunction<typeof useSessionAvailability>
  ).mockImplementation(() => sessionAvailable)
  ;(
    useAppBridge as jest.MockedFunction<typeof useAppBridge>
  ).mockImplementation(() => ({ openInlink, openOutlink, openNativeLink }))

  return {
    onClientRequired,
    onSessionRequired,
    openInlink,
    openOutlink,
    openNativeLink,
  }
}
