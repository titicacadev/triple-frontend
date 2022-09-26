import { IncomingMessage } from 'http'

import { makeRequestParams } from './make-request-params'

describe('makeRequestParams', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('req 대신 cookie와 withApiUriBase를 사용합니다.', () => {
    process.env.API_URI_BASE = 'https://triple-dev.titicaca-corp.com'

    const deprecateOptions = makeRequestParams('/api/mock-url', {
      req: { headers: { cookie: 'mock-cookie-value' } } as IncomingMessage,
    })
    const newOptions = makeRequestParams('/api/mock-url', {
      withApiUriBase: true,
      cookie: 'mock-cookie-value',
    })

    expect(newOptions).toEqual(deprecateOptions)
  })

  test('req가 존재하면 API_URI_BASE가 환경 변수에 존재하는지 검사합니다.', () => {
    expect(() =>
      makeRequestParams('/api/mock-url', {
        req: { headers: { cookie: 'mock-cookie-value' } } as IncomingMessage,
      }),
    ).toThrowError()

    process.env.API_URI_BASE = 'https://triple-dev.titicaca-corp.com'

    expect(() =>
      makeRequestParams('/api/mock-url', {
        req: { headers: { cookie: 'mock-cookie-value' } } as IncomingMessage,
      }),
    ).not.toThrowError()
  })

  test('withApiUriBase가 true면 API_URI_BASE가 환경 변수에 존재하는지 검사합니다.', () => {
    expect(() =>
      makeRequestParams('/api/mock-url', {
        withApiUriBase: true,
      }),
    ).toThrowError()

    process.env.API_URI_BASE = 'https://triple-dev.titicaca-corp.com'

    expect(() =>
      makeRequestParams('/api/mock-url', {
        withApiUriBase: true,
      }),
    ).not.toThrowError()
  })

  test('req가 존재하면 요청 URL에 API_URI_BASE를 추가합니다.', () => {
    process.env.API_URI_BASE = 'https://triple-dev.titicaca-corp.com'

    expect(
      makeRequestParams('/api/mock-url', {
        req: { headers: {} } as IncomingMessage,
      })[0],
    ).toBe('https://triple-dev.titicaca-corp.com/api/mock-url')
  })

  test('withApiUriBase가 true이면 요청 URL에 API_URI_BASE를 추가합니다.', () => {
    process.env.API_URI_BASE = 'https://triple-dev.titicaca-corp.com'

    expect(
      makeRequestParams('/api/mock-url', { withApiUriBase: true })[0],
    ).toBe('https://triple-dev.titicaca-corp.com/api/mock-url')
  })
})
