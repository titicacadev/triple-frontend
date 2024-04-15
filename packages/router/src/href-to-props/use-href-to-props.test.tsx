import { renderHook } from '@testing-library/react'
import { ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'
import { checkIfRoutable } from '@titicaca/view-utilities'

import { useHrefToProps } from './use-href-to-props'

jest.mock('@titicaca/view-utilities', () => ({
  ...jest.requireActual('@titicaca/view-utilities'),
  checkIfRoutable: jest.fn(),
}))

function createWrapper({ isPublic }: { isPublic: boolean }) {
  return createTestWrapper({
    clientAppProvider: isPublic
      ? null
      : {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '5.13.0' },
        },
  })
}

describe('href', () => {
  test('href에서 트리플 도메인을 제거합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: true }),
    })

    const webUrlBase = 'https://triple-dev.titicaca-corp.com'
    const path = '/my-path'
    const { href } = hrefToProps(`${webUrlBase}${path}`)

    expect(href).toEqual(path)
  })

  test('href에서 inlink를 제거합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: true }),
    })

    const path = '/my-path'
    const { href } = hrefToProps(`/inlink?path=${encodeURIComponent(path)}`)

    expect(href).toEqual(path)
  })

  test('href에서 outlink를 제거합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: true }),
    })

    const path = 'https://www.google.com/my-path'
    const { href } = hrefToProps(`/outlink?url=${encodeURIComponent(path)}`)

    expect(href).toEqual(path)
  })
})

describe('target', () => {
  test('일반 브라우저 환경에선 target을 "current"로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: true }),
    })

    const path = '/my-path'
    const { target } = hrefToProps(path)

    expect(target).toBe('current')
  })

  test('앱에선 target을 "new"로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: false }),
    })

    const path = '/my-path'
    const { target } = hrefToProps(path)

    expect(target).toBe('new')
  })

  test('outlink의 target이 "browser"이면 target을 "browser"로 설정합니다.', () => {
    const runTest = (isPublic: boolean) => {
      const {
        result: { current: hrefToProps },
      } = renderHook(useHrefToProps, {
        wrapper: createWrapper({ isPublic }),
      })

      const path = `/outlink?url=${encodeURIComponent(
        '/my-path',
      )}&target=browser`
      const { target } = hrefToProps(path)

      expect(target).toBe('browser')
    }

    runTest(true)
    runTest(false)
  })
})

describe('allowSource', () => {
  const routablePath = 'ROUTABLE_PATH'

  beforeEach(() => {
    ;(
      checkIfRoutable as jest.MockedFunction<typeof checkIfRoutable>
    ).mockImplementation(({ href }) => {
      return href === routablePath
    })
  })

  test('routable한 링크는 allowSource를 "all"로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: false }),
    })

    const { allowSource } = hrefToProps(routablePath)

    expect(allowSource).toBe('all')
  })

  test('routable하지 않은 링크는 allowSource를 "app-with-session"으로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: false }),
    })

    const { allowSource } = hrefToProps('not-routable')

    expect(allowSource).toBe('app-with-session')
  })

  test('inlink는 path가 routable하면 allowSource를 "app"으로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: false }),
    })

    const href = `/inlink?path=${encodeURIComponent(routablePath)}`
    const { allowSource } = hrefToProps(href)

    expect(allowSource).toBe('app')
  })

  test('inlink의 _web_expand 파라미터가 있으면 routable하지 않아도 allowSource를 "all"로 설정합니다.', () => {
    const {
      result: { current: hrefToProps },
    } = renderHook(useHrefToProps, {
      wrapper: createWrapper({ isPublic: false }),
    })

    const href = `/inlink?path=${encodeURIComponent(
      '/my-wonderful-path',
    )}&_web_expand=true`
    const { allowSource } = hrefToProps(href)

    expect(allowSource).toBe('all')
  })
})
