import { renderHook } from '@testing-library/react'
import { useEnv } from '@titicaca/react-contexts'
import { checkIfRoutable } from '@titicaca/view-utilities'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { useHrefToProps } from './use-href-to-props'

jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/view-utilities', () => ({
  ...jest.requireActual('@titicaca/view-utilities'),
  checkIfRoutable: jest.fn(),
}))
jest.mock('@titicaca/react-triple-client-interfaces')

describe('href', () => {
  test('href에서 트리플 도메인을 제거합니다.', () => {
    const { webUrlBase } = prepareTest({ isPublic: true })

    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const path = '/my-path'
    const { href } = hrefToProps(`${webUrlBase}${path}`)

    expect(href).toEqual(path)
  })

  test('href에서 inlink를 제거합니다.', () => {
    prepareTest({ isPublic: true })

    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const path = '/my-path'
    const { href } = hrefToProps(`/inlink?path=${encodeURIComponent(path)}`)

    expect(href).toEqual(path)
  })

  test('href에서 outlink를 제거합니다.', () => {
    prepareTest({ isPublic: true })

    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const path = 'https://www.google.com/my-path'
    const { href } = hrefToProps(`/outlink?url=${encodeURIComponent(path)}`)

    expect(href).toEqual(path)
  })
})

describe('target', () => {
  test('일반 브라우저 환경에선 target을 "current"로 설정합니다.', () => {
    prepareTest({ isPublic: true })

    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const path = '/my-path'
    const { target } = hrefToProps(path)

    expect(target).toEqual('current')
  })

  test('앱에선 target을 "new"로 설정합니다.', () => {
    prepareTest({ isPublic: false })

    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const path = '/my-path'
    const { target } = hrefToProps(path)

    expect(target).toEqual('new')
  })

  test('outlink의 target이 "browser"이면 target을 "browser"로 설정합니다.', () => {
    const runTest = (isPublic: boolean) => {
      prepareTest({ isPublic })

      const {
        result: { current: hrefToProps },
      } = renderHook(useHrefToProps)

      const path = `/outlink?url=${encodeURIComponent(
        '/my-path',
      )}&target=browser`
      const { target } = hrefToProps(path)

      expect(target).toEqual('browser')
    }

    runTest(true)
    runTest(false)
  })
})

describe('allowSource', () => {
  const routablePath = 'ROUTABLE_PATH'

  beforeEach(() => {
    prepareTest({ isPublic: false })
    ;(
      checkIfRoutable as jest.MockedFunction<typeof checkIfRoutable>
    ).mockImplementation(({ href }) => {
      return href === routablePath
    })
  })

  test('routable한 링크는 allowSource를 "all"로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const { allowSource } = hrefToProps(routablePath)

    expect(allowSource).toEqual('all')
  })

  test('routable하지 않은 링크는 allowSource를 "app-with-session"으로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const { allowSource } = hrefToProps('not-routable')

    expect(allowSource).toEqual('app-with-session')
  })

  test('inlink는 path가 routable하면 allowSource를 "app"으로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const href = `/inlink?path=${encodeURIComponent(routablePath)}`
    const { allowSource } = hrefToProps(href)

    expect(allowSource).toEqual('app')
  })

  test('inlink의 _web_expand 파라미터가 있으면 routable하지 않아도 allowSource를 "all"로 설정합니다.', () => {
    prepareTest({ isPublic: false })

    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps)

    const href = `/inlink?path=${encodeURIComponent(
      '/my-wonderful-path',
    )}&_web_expand=true`
    const { allowSource } = hrefToProps(href)

    expect(allowSource).toEqual('all')
  })
})

function prepareTest({ isPublic }: { isPublic: boolean }) {
  const webUrlBase = 'https://triple.guide'

  ;(
    useTripleClientMetadata as unknown as jest.MockedFunction<
      () => ReturnType<typeof useTripleClientMetadata>
    >
  ).mockImplementation(() =>
    isPublic ? null : { appName: 'Triple-iOS', appVersion: '5.13.0' },
  )
  ;(
    useEnv as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useEnv>, 'webUrlBase'>
    >
  ).mockImplementation(() => ({ webUrlBase }))

  return { webUrlBase }
}
