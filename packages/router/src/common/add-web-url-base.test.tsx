import { renderHook } from '@testing-library/react'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { useWebUrlBaseAdder } from './add-web-url-base'

const MOCK_URL_BASE = 'https://triple.guide'

const wrapper = createTestWrapper({
  envProvider: {
    appUrlScheme: 'dev-soto',
    webUrlBase: MOCK_URL_BASE,
    basePath: '/',
    facebookAppId: '',
    defaultPageTitle: '',
    defaultPageDescription: '',
    afOnelinkId: '',
    afOnelinkPid: '',
    afOnelinkSubdomain: '',
  },
})

test('useEnv에서 webUrlBase를 가져와서 주어진 href에 붙입니다.', () => {
  const { result } = renderHook(useWebUrlBaseAdder, {
    wrapper,
  })

  const addWebUrlBaseToHref = result.current
  const path = '/base'

  expect(addWebUrlBaseToHref(path)).toBe(`${MOCK_URL_BASE}${path}`)
})

test('주어진 href가 /이면 그냥 baseURL을 반환합니다.', () => {
  const { result } = renderHook(useWebUrlBaseAdder, {
    wrapper,
  })

  const addWebUrlBaseToHref = result.current
  const path = '/'

  expect(addWebUrlBaseToHref(path)).toEqual(MOCK_URL_BASE)
})
