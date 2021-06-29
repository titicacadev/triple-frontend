import { get } from '@titicaca/fetcher'

import { authGuard } from './index'

jest.mock('@titicaca/fetcher')
const mockedGet = (get as jest.MockedFunction<
  typeof get
>).mockImplementation(() => Promise.resolve({} as any))

it('트리플 앱에서 요청한 request는 아무 역할을 하지 않습니다.', async () => {
  const oldGSSP = jest.fn()

  const newGSSP = authGuard(oldGSSP)
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
      },
    },
  } as any

  await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith(ctx)
})

it('/api/users/me가 회원 정보를 반환하면 customContext에 회원 정보를 추가하여 기존 getServerSideProps를 호출합니다.', async () => {
  const oldGSSP = jest.fn()
  const user = { uid: 'MOCK_USER' }
  mockedGet.mockResolvedValueOnce({ result: user } as any)

  const newGSSP = authGuard(oldGSSP)
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    customContext: { mock: 'mock' },
  } as any

  await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith({
    ...ctx,
    customContext: { ...ctx.customContext, user },
  })
})

it('/api/users/me가 401로 응답했다면, 로그인 페이지로 리디렉션하는 값을 반환합니다.', async () => {
  const oldGSSP = jest.fn()
  mockedGet.mockResolvedValueOnce({ status: 401 } as any)

  const newGSSP = authGuard(oldGSSP)
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  const result = await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(0)
  expect(result).toEqual({
    redirect: {
      destination: `/login?returnUrl=${encodeURIComponent('/test-url')}`,
      basePath: false,
      permanent: false,
    },
  })

  mockedGet.mockResolvedValueOnce({ status: 401 } as any)
  process.env.NEXT_PUBLIC_BASE_PATH = '/mock'
  const withEnvResult = await newGSSP(ctx)
  delete process.env.NEXT_PUBLIC_BASE_PATH

  expect(oldGSSP).toBeCalledTimes(0)
  expect(withEnvResult).toEqual({
    redirect: {
      destination: `/login?returnUrl=${encodeURIComponent('/mock/test-url')}`,
      basePath: false,
      permanent: false,
    },
  })
})

it('/api/users/me가 non-member로 응답했다면, 로그인 페이지로 리디렉션하는 값을 반환합니다.', async () => {
  const oldGSSP = jest.fn()
  mockedGet.mockResolvedValueOnce({
    result: { uid: '_PH_01000000000' },
  } as any)

  const newGSSP = authGuard(oldGSSP)
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  const result = await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(0)
  expect(result).toEqual({
    redirect: {
      destination: `/login?returnUrl=${encodeURIComponent('/test-url')}`,
      basePath: false,
      permanent: false,
    },
  })
})

it('/api/users/me가 non-member로 응답하나, allowNonMembers가 true라면 인증을 통과한 걸로 봅니다.', async () => {
  const oldGSSP = jest.fn()
  const user = { uid: '_PH_01000000000' }
  mockedGet.mockResolvedValueOnce({
    result: user,
  } as any)

  const newGSSP = authGuard(oldGSSP, { allowNonMembers: true })
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith({
    ...ctx,
    customContext: { ...ctx.customContext, user },
  })
})

it('/api/users/me가 401로 응답했다면, 로그인 페이지로 리디렉션하는 값을 반환합니다. 로그인 페이지의 Type을 명시할 수 있습니다.', async () => {
  const oldGSSP = jest.fn()
  mockedGet.mockResolvedValueOnce({ status: 401 } as any)

  const newGSSP = authGuard(oldGSSP, { authType: 'bookings' })
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  const result = await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(0)
  expect(result).toEqual({
    redirect: {
      destination: `/login?returnUrl=${encodeURIComponent(
        '/test-url',
      )}&type=bookings`,
      basePath: false,
      permanent: false,
    },
  })
})

it('/api/users/me가 401 이외의 에러로 응답했다면, 에러를 던집니다.', async () => {
  const oldGSSP = jest.fn()
  mockedGet.mockResolvedValueOnce({ status: 500 } as any)

  const newGSSP = authGuard(oldGSSP)
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    customContext: { mock: 'mock' },
  } as any

  await expect(newGSSP(ctx)).rejects.toThrowError()
})

it('resolveReturnUrl로 로그인 후 돌아갈 URL을 지정할 수 있습니다.', async () => {
  const oldGSSP = jest.fn()
  mockedGet.mockResolvedValueOnce({ status: 401 } as any)

  const newGSSP = authGuard(oldGSSP, {
    resolveReturnUrl: ({ query }) => {
      return `/foo/${query.foo}`
    },
  })

  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    query: { foo: '1' },
    resolvedUrl: '/air/foo',
    customContext: { mock: 'mock' },
  } as any

  const result = await newGSSP(ctx)

  expect(oldGSSP).toBeCalledTimes(0)
  expect(result).toEqual({
    redirect: {
      destination: `/login?returnUrl=${encodeURIComponent('/foo/1')}`,
      basePath: false,
      permanent: false,
    },
  })
})
