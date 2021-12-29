import { renderHook } from '@testing-library/react-hooks'
import { useEnv } from '@titicaca/react-contexts'

import { useAppBridge } from './app-bridge'

const MOCK_APP_SCHEME = 'test-triple'

jest.mock('@titicaca/react-contexts')
;(
  useEnv as unknown as jest.MockedFunction<
    () => Pick<ReturnType<typeof useEnv>, 'appUrlScheme'>
  >
).mockImplementation(() => ({ appUrlScheme: MOCK_APP_SCHEME }))

describe('openInlink', () => {
  test('주어진 href를 inlink로 엽니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openInlink },
      },
    } = renderHook(useAppBridge, { initialProps: { changeLocation } })

    const href = '/my-path/to-wonderland'

    openInlink(href)

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///inlink?path=${encodeURIComponent(href)}`,
    )
  })
})

describe('openOutlink', () => {
  test('주어진 href를 outlink로 엽니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openOutlink },
      },
    } = renderHook(useAppBridge, { initialProps: { changeLocation } })

    const href = '/my-path/to-wonderland'

    openOutlink(href)

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///outlink?url=${encodeURIComponent(href)}`,
    )
  })

  test('target과 title을 파라미터로 전달할 수 있습니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openOutlink },
      },
    } = renderHook(useAppBridge, { initialProps: { changeLocation } })

    const href = '/my-path/to-wonderland'
    const target = 'browser'
    const title = '최고의 앱!'

    openOutlink(href, { target, title })

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///outlink?url=${encodeURIComponent(
        href,
      )}&target=${target}&title=${encodeURIComponent(title)}`,
    )
  })
})

describe('openNativeLink', () => {
  test('주어진 상대 경로에 앱 스킴을 붙여서 라우팅합니다.', () => {
    const changeLocation = jest.fn()
    const href = '/this/is/native/url'
    const {
      result: {
        current: { openNativeLink },
      },
    } = renderHook(useAppBridge, { initialProps: { changeLocation } })

    openNativeLink(href)

    expect(changeLocation).toBeCalledWith(`${MOCK_APP_SCHEME}://${href}`)
  })

  describe('절대 경로를 넣으면 오류를 냅니다.', () => {
    test.each([['https://www.google.com', 'triple.guide/hotels']])(
      '%p',
      (href: string) => {
        const changeLocation = jest.fn()
        const {
          result: {
            current: { openNativeLink },
          },
        } = renderHook(useAppBridge, { initialProps: { changeLocation } })

        expect(() => openNativeLink(href)).toThrowError()
      },
    )
  })
})
