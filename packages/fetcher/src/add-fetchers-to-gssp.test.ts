import { GetServerSidePropsResult } from 'next'

import { addFetchersToGSSP } from './add-fetchers-to-gssp'
import { get, post } from './methods'
import 'isomorphic-fetch'

jest.mock('./methods')
const mockedGet = get as jest.MockedFunction<typeof get>
const mockedPost = post as jest.MockedFunction<typeof post>

const baseContext: any = {
  req: { headers: { cookie: '' } },
  res: { setHeader: () => {} },
}
const customAPIURIBase = 'https://my-base-path.co.kr'

beforeEach(() => {
  mockedGet.mockClear()
  mockedPost.mockClear()
})

test('apiUriBase 파라미터를 요청의 base href로 사용합니다.', async () => {
  mockedGet.mockImplementation(() => {
    const { headers, ok, status, url } = new Response('', { status: 200 })

    return Promise.resolve({ headers, ok, status, url, parsedBody: '' })
  })

  const gssp = addFetchersToGSSP(
    async ({
      customContext: {
        fetchers: { get },
      },
    }) => {
      const response = await get('/api/a')
      return { props: { response } }
    },
    { apiUriBase: customAPIURIBase },
  )

  await gssp(baseContext)
  expect(mockedGet).toBeCalledWith(
    expect.stringContaining(customAPIURIBase),
    expect.any(Object),
  )
})

test('토큰을 갱신했을 때 context.res의 setHeader를 이용해 쿠키 갱신 헤더를 추가합니다.', async () => {
  const validCookie = 'VALID_COOKIE'
  mockedGet.mockImplementation(() => {
    const { headers, ok, status, url } = new Response('', { status: 401 })

    return Promise.resolve({ headers, ok, status, url, parsedBody: '' })
  })
  mockedPost.mockImplementation(
    () =>
      ({
        ok: true,
        headers: {
          get(key: string) {
            if (key === 'set-cookie') {
              return validCookie
            }
            return ''
          },
        },
      } as any),
  )

  const setHeader = jest.fn()

  const gssp = addFetchersToGSSP(
    async ({
      customContext: {
        fetchers: { get },
      },
    }) => {
      const response = await get('/api/a')
      return { props: { response } }
    },
    { apiUriBase: customAPIURIBase },
  )

  await gssp({ ...baseContext, res: { setHeader } })

  expect(setHeader).toBeCalledWith('set-cookie', validCookie)
})

test('API 요청을 여러 번 해도 refresh는 한 번만 호출합니다.', async () => {
  const validCookie = 'VALID_COOKIE'
  mockedGet.mockImplementation(async (_, { cookie } = {}) => {
    const { headers, ok, status, url } =
      cookie === validCookie
        ? new Response('', { status: 200 })
        : new Response('', { status: 401 })

    return { headers, ok, status, url, parsedBody: '' }
  })

  mockedPost.mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      headers: {
        get() {
          return validCookie
        },
      },
    } as any)
  })

  const setHeader = jest.fn()

  const gssp = addFetchersToGSSP(
    async ({
      customContext: {
        fetchers: { get },
      },
    }): Promise<GetServerSidePropsResult<{}>> => {
      await Promise.all([get('/api/a'), get('/api/b'), get('/api/c')])
      await get('/api/d')
      return { props: {} }
    },
    { apiUriBase: 'https://triple-dev.titicaca-corp.com' },
  )

  await gssp({ ...baseContext, res: { setHeader } } as any)

  expect(mockedPost).toBeCalledTimes(1)
})

test('API를 여러 번 호출하더라도 유효한 쿠키 하나만 사용합니다.', async () => {
  const validCookie = 'VALID_COOKIE'
  mockedGet.mockImplementation(async (_, { cookie } = {}) => {
    const { headers, ok, status, url } =
      cookie === `${validCookie}-1`
        ? new Response('', { status: 200 })
        : new Response('', { status: 401 })

    return { headers, ok, status, url, parsedBody: '' }
  })

  let refreshCount = 0
  mockedPost.mockImplementation(() => {
    refreshCount += 1
    const cookie = `${validCookie}-${refreshCount}`
    return Promise.resolve({
      ok: true,
      headers: {
        get() {
          return cookie
        },
      },
    } as any)
  })

  const setHeader = jest.fn()

  const gssp = addFetchersToGSSP(
    async ({
      customContext: {
        fetchers: { get },
      },
    }): Promise<GetServerSidePropsResult<{}>> => {
      const [a, b, c] = await Promise.all([
        get('/api/a'),
        get('/api/b'),
        get('/api/c'),
      ])
      const d = await get('/api/d')
      return { props: { responses: [a, b, c, d] } }
    },
    { apiUriBase: 'https://triple-dev.titicaca-corp.com' },
  )

  const gsspResponse = await gssp({ ...baseContext, res: { setHeader } } as any)

  expect(gsspResponse).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        responses: [
          expect.objectContaining({ ok: true }),
          expect.objectContaining({ ok: true }),
          expect.objectContaining({ ok: true }),
          expect.objectContaining({ ok: true }),
        ],
      }),
    }),
  )
  expect(setHeader).toBeCalledWith('set-cookie', `${validCookie}-1`)
})

test('토큰을 갱신하면 갱신한 쿠키 값으로 다음 API를 요청합니다.', async () => {
  const validCookie = 'VALID_COOKIE'
  const dAPIRecorder = jest.fn()

  mockedGet.mockImplementation(async (href, { cookie } = {}) => {
    if (href.includes('/api/d')) {
      dAPIRecorder(cookie)
    }

    const { headers, ok, status, url } =
      cookie === validCookie
        ? new Response('', { status: 200 })
        : new Response('', { status: 401 })

    return {
      headers,
      ok,
      status,
      url,
      parsedBody: '',
    }
  })
  mockedPost.mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      headers: {
        get() {
          return validCookie
        },
      },
    } as any)
  })

  const gssp = addFetchersToGSSP(
    async ({
      customContext: {
        fetchers: { get },
      },
    }): Promise<GetServerSidePropsResult<{}>> => {
      const [a, b, c] = await Promise.all([
        get('/api/a'),
        get('/api/b'),
        get('/api/c'),
      ])
      const d = await get('/api/d')
      return { props: { responses: [a, b, c, d] } }
    },
    { apiUriBase: 'https://triple-dev.titicaca-corp.com' },
  )
  await gssp(baseContext)

  expect(dAPIRecorder).toBeCalledTimes(1)
  expect(dAPIRecorder).toBeCalledWith(validCookie)
})
