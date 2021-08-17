import { makeRequestParams } from './make-request-params'

test('req 대신 cookie와 withApiUriBase를 사용합니다.', () => {
  process.env.API_URI_BASE = 'https://triple-dev.titicaca-corp.com'

  const deprecateOptions = makeRequestParams('/api/mock-url', {
    req: { headers: { cookie: 'mock-cookie-value' } } as any,
  })
  const newOptions = makeRequestParams('/api/mock-url', {
    withApiUriBase: true,
    cookie: 'mock-cookie-value',
  })

  expect(newOptions).toEqual(deprecateOptions)
})
