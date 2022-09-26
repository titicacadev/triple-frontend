import { renderHook } from '@testing-library/react-hooks'
import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'

import { useTripleClientNavigate } from './use-triple-client-navigate'

const MOCK_APP_SCHEME = 'test-triple'

jest.mock('@titicaca/react-contexts')
;(
  useEnv as unknown as jest.MockedFunction<
    () => Pick<ReturnType<typeof useEnv>, 'appUrlScheme'>
  >
).mockImplementation(() => ({ appUrlScheme: MOCK_APP_SCHEME }))

beforeEach(() => {
  mockUserAgentContext(true)
})

describe('openInlink', () => {
  test('주어진 href를 inlink로 엽니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openInlink },
      },
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

    const href = '/my-path/to-wonderland'

    openInlink(href)

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///inlink?path=${encodeURIComponent(href)}`,
    )
  })

  describe('lnbTarget 옵션을 사용하면 타겟 URL에 LNB를 표시하는 쿼리를 추가합니다.', () => {
    test.each([
      [{ type: 'trip', id: 'MOCK_ID' }, '_triple_lnb_trip_id=MOCK_ID'],
      [{ type: 'zone', id: 'MOCK_ID' }, '_triple_lnb_zone_id=MOCK_ID'],
      [{ type: 'region', id: 'MOCK_ID' }, '_triple_lnb_region_id=MOCK_ID'],
    ] as const)('%p', (lnbTarget, containingQuery) => {
      const changeLocation = jest.fn()
      const {
        result: {
          current: { openInlink },
        },
      } = renderHook(useTripleClientNavigate, {
        initialProps: { changeLocation },
      })

      const href = '/my-path/to-wonderland'

      openInlink(href, { lnbTarget })

      expect(changeLocation).toBeCalledWith(
        `${MOCK_APP_SCHEME}:///inlink?path=${encodeURIComponent(
          `${href}?${containingQuery}`,
        )}`,
      )
    })
  })

  test('noNavbar 옵션을 사용하면 타겟 URL에 _triple_no_navbar 쿼리를 추가합니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openInlink },
      },
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

    const href = '/my-path/to-wonderland'

    openInlink(href, { noNavbar: true })

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///inlink?path=${encodeURIComponent(
        `${href}?_triple_no_navbar=true`,
      )}`,
    )
  })

  test('swipeToClose 옵션을 사용하면 타겟 URL에 _triple_swipe_to_close 쿼리를 추가합니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openInlink },
      },
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

    const href = '/my-path/to-wonderland'

    openInlink(href, { swipeToClose: true })

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///inlink?path=${encodeURIComponent(
        `${href}?_triple_swipe_to_close=true`,
      )}`,
    )
  })

  test('shouldPreset 옵션을 사용하면 타겟 URL에 _triple_should_present 쿼리를 추가합니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openInlink },
      },
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

    const href = '/my-path/to-wonderland'

    openInlink(href, { shouldPresent: true })

    expect(changeLocation).toBeCalledWith(
      `${MOCK_APP_SCHEME}:///inlink?path=${encodeURIComponent(
        `${href}?_triple_should_present=true`,
      )}`,
    )
  })

  test('앱 전용 옵션을 사용할 때 기존 쿼리를 보존합니다.', () => {
    const changeLocation = jest.fn()
    const {
      result: {
        current: { openInlink },
      },
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

    const href =
      '/my-path/to-wonderland?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

    openInlink(href, { noNavbar: true })

    expect(changeLocation).toBeCalledWith(
      expect.stringContaining(
        encodeURIComponent('regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'),
      ),
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
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

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
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

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
    } = renderHook(useTripleClientNavigate, {
      initialProps: { changeLocation },
    })

    openNativeLink(href)

    expect(changeLocation).toBeCalledWith(`${MOCK_APP_SCHEME}://${href}`)
  })
})

function mockUserAgentContext(isPublic = true) {
  ;(
    useUserAgentContext as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
    >
  ).mockReturnValue({
    isPublic,
  })
}
