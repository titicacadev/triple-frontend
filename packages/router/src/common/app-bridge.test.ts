import { renderHook } from '@testing-library/react-hooks'
import { useEnv } from '@titicaca/react-contexts'

import { useAppBridge } from './app-bridge'

const MOCK_APP_SCHEME = 'test-triple'

jest.mock('@titicaca/react-contexts')
;((useEnv as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useEnv>, 'appUrlScheme'>
>).mockImplementation(() => ({ appUrlScheme: MOCK_APP_SCHEME }))

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
