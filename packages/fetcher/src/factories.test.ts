import { IncomingMessage } from 'http'

import { ssrFetcherize } from './factories'

function makeTestSuite(testingFunction: typeof ssrFetcherize) {
  test('주어진 cookie를 호출에 이용합니다.', () => {
    const fetcher = jest.fn()

    const ssrFetcher = testingFunction(fetcher, {
      apiUriBase: 'https://triple-dev.titicaca-corp.com',
      cookie: 'THIS_IS_MOCK_COOKIE',
    })

    ssrFetcher('/api/mock-url')

    expect(fetcher).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ cookie: 'THIS_IS_MOCK_COOKIE' }),
    )
  })

  test('href에 주어진 apiUriBase를 붙입니다.', () => {
    const fetcher = jest.fn()

    const ssrFetcher = testingFunction(fetcher, {
      apiUriBase: 'https://triple-dev.titicaca-corp.com',
      cookie: 'THIS_IS_MOCK_COOKIE',
    })

    ssrFetcher('/api/mock-url')

    expect(fetcher).toBeCalledWith(
      'https://triple-dev.titicaca-corp.com/api/mock-url',
      expect.anything(),
    )
  })

  test('헤더에 "x-triple-from-ssr"을 추가합니다.', () => {
    const fetcher = jest.fn()

    const ssrFetcher = testingFunction(fetcher, {
      apiUriBase: 'https://triple-dev.titicaca-corp.com',
      cookie: 'THIS_IS_MOCK_COOKIE',
    })

    ssrFetcher('/api/mock-url')

    expect(fetcher).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-triple-from-ssr': 'true',
        }),
      }),
    )
  })

  test('fetcher에 req를 전달하지 않습니다.', () => {
    const fetcher = jest.fn()

    const ssrFetcher = testingFunction(fetcher, {
      apiUriBase: 'https://triple-dev.titicaca-corp.com',
      cookie: 'THIS_IS_MOCK_COOKIE',
    })

    ssrFetcher('/api/mock-url', {
      req: { headers: { cookie: 'my-own-cookie' } } as IncomingMessage,
    })
    expect(fetcher).toBeCalledWith(
      expect.any(String),
      expect.not.objectContaining({ req: expect.anything() }),
    )
  })

  test('withApiUribase를 무조건 비활성화합니다.', () => {
    const fetcher = jest.fn()

    const ssrFetcher = testingFunction(fetcher, {
      apiUriBase: 'https://triple-dev.titicaca-corp.com',
      cookie: 'THIS_IS_MOCK_COOKIE',
    })

    ssrFetcher('/api/mock-url')
    expect(fetcher).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ withApiUriBase: false }),
    )
    ssrFetcher('/api/mock-url', { withApiUriBase: true })
    expect(fetcher).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ withApiUriBase: false }),
    )
  })

  test('생성한 fetcher의 파라미터로 cookie 값을 덮어쓸 수 있습니다.', () => {
    const fetcher = jest.fn()

    const ssrFetcher = testingFunction(fetcher, {
      apiUriBase: 'https://triple-dev.titicaca-corp.com',
      cookie: 'THIS_IS_MOCK_COOKIE',
    })

    ssrFetcher('/api/mock-url', { cookie: 'I_WANT_OVERRIDE_MY_COOKIE' })

    expect(fetcher).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ cookie: 'I_WANT_OVERRIDE_MY_COOKIE' }),
    )
  })
}

describe('ssrFetcherize', () => {
  makeTestSuite(ssrFetcherize)
})

describe('중복해서 적용해도 같은 결과를 반환합니다.', () => {
  const testingFunction: typeof ssrFetcherize = (fetcher, options) =>
    ssrFetcherize(ssrFetcherize(fetcher, options), options)

  makeTestSuite(testingFunction)
})
