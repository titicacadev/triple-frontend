import { renderHook } from '@testing-library/react'
import { useEnv } from '@titicaca/react-contexts'

import { useWebUrlBaseAdder } from './add-web-url-base'

const MOCK_URL_BASE = 'https://triple.guide'

jest.mock('@titicaca/react-contexts')
;(
  useEnv as unknown as jest.MockedFunction<
    () => Pick<ReturnType<typeof useEnv>, 'webUrlBase'>
  >
).mockImplementation(() => ({ webUrlBase: MOCK_URL_BASE }))

test('useEnv에서 webUrlBase를 가져와서 주어진 href에 붙입니다.', () => {
  const { result } = renderHook(useWebUrlBaseAdder)

  const addWebUrlBaseToHref = result.current
  const path = '/base'

  expect(addWebUrlBaseToHref(path)).toEqual(`${MOCK_URL_BASE}${path}`)
})

test('주어진 href가 /이면 그냥 baseURL을 반환합니다.', () => {
  const { result } = renderHook(useWebUrlBaseAdder)

  const addWebUrlBaseToHref = result.current
  const path = '/'

  expect(addWebUrlBaseToHref(path)).toEqual(MOCK_URL_BASE)
})
