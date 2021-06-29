import { get } from '@titicaca/fetcher'

import { authGuard } from './index'

jest.mock('@titicaca/fetcher')
const mockedGet = (get as jest.MockedFunction<
  typeof get
>).mockImplementation(() => Promise.resolve({} as any))

afterEach(() => {
  mockedGet.mockClear()
})

it('/api/users/me가 회원 정보를 반환하면 customContext에 회원 정보를 추가하여 기존 getServerSideProps를 호출합니다.', async () => {
  const user = { uid: 'MOCK_USER' }
  mockedGet.mockResolvedValue({ result: user } as any)

  const oldGSSP = jest.fn()
  const newGSSP = authGuard(oldGSSP)

  const browserContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
  } as any

  await newGSSP(browserContext)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith({
    ...browserContext,
    customContext: { user },
  })

  oldGSSP.mockClear()

  const appContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
      },
    },
  } as any

  await newGSSP(appContext)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith({
    ...appContext,
    customContext: { user },
  })
})

it('/api/users/me가 non-member로 응답하나, allowNonMembers가 true라면 인증을 통과한 걸로 봅니다.', async () => {
  const user = { uid: '_PH_01000000000' }
  mockedGet.mockResolvedValue({
    result: user,
  } as any)

  const oldGSSP = jest.fn()
  const newGSSP = authGuard(oldGSSP, { allowNonMembers: true })

  const browserContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  await newGSSP(browserContext)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith({
    ...browserContext,
    customContext: { ...browserContext.customContext, user },
  })

  oldGSSP.mockClear()

  const appContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  await newGSSP(appContext)

  expect(oldGSSP).toBeCalledTimes(1)
  expect(oldGSSP).toBeCalledWith({
    ...appContext,
    customContext: { ...appContext.customContext, user },
  })
})

it('/api/users/me가 401 이외의 에러로 응답했다면, 에러를 던집니다.', async () => {
  mockedGet.mockResolvedValue({ status: 500 } as any)

  const oldGSSP = jest.fn()
  const newGSSP = authGuard(oldGSSP)

  const browserContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  await expect(newGSSP(browserContext)).rejects.toThrowError()

  oldGSSP.mockClear()

  const appContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
      },
    },
    resolvedUrl: '/test-url',
    customContext: { mock: 'mock' },
  } as any

  await expect(newGSSP(appContext)).rejects.toThrowError()
})

it('resolveReturnUrl 함수로 로그인 후 돌아갈 URL을 만들 수 있습니다.', async () => {
  mockedGet.mockResolvedValue({ status: 401 } as any)

  const oldGSSP = jest.fn()
  const newGSSP = authGuard(oldGSSP, {
    resolveReturnUrl: ({ query }) => `/foo/${query.foo}`,
  })

  const browserContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
    customContext: { mock: 'mock' },
    query: { foo: '1' },
    resolvedUrl: '/air/foo',
  } as any

  const browserResult = await newGSSP(browserContext)

  expect(oldGSSP).toBeCalledTimes(0)
  expect(browserResult).toEqual({
    redirect: {
      destination: `/login?returnUrl=${encodeURIComponent('/foo/1')}`,
      basePath: false,
      permanent: false,
    },
  })

  oldGSSP.mockClear()

  const appContext = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
      },
    },
    customContext: { mock: 'mock' },
    query: { foo: '1' },
    resolvedUrl: '/air/foo',
  } as any

  const appResult = await newGSSP(appContext)

  expect(oldGSSP).toBeCalledTimes(0)
  expect(appResult).toEqual({
    redirect: {
      destination: `/landing/refresh?returnUrl=${encodeURIComponent(
        '/foo/1?refreshed=true',
      )}`,
      basePath: false,
      permanent: false,
    },
  })
})

describe('일반 브라우저에서 로그인이 필요하면 로그인 페이지로 리디렉션하는 값을 반환합니다.', () => {
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

  it('/api/users/me가 401로 응답', async () => {
    mockedGet.mockResolvedValue({ status: 401 } as any)

    const oldGSSP = jest.fn()
    const newGSSP = authGuard(oldGSSP)

    const result = await newGSSP(ctx)

    expect(oldGSSP).toBeCalledTimes(0)
    expect(result).toEqual({
      redirect: {
        destination: `/login?returnUrl=${encodeURIComponent('/test-url')}`,
        basePath: false,
        permanent: false,
      },
    })

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

  it('/api/users/me가 non-member로 응답', async () => {
    mockedGet.mockResolvedValueOnce({
      result: { uid: '_PH_01000000000' },
    } as any)

    const oldGSSP = jest.fn()
    const newGSSP = authGuard(oldGSSP)

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

  it('authType을 이용해 로그인 페이지의 Type을 명시할 수 있습니다.', async () => {
    mockedGet.mockResolvedValueOnce({ status: 401 } as any)

    const oldGSSP = jest.fn()
    const newGSSP = authGuard(oldGSSP, { authType: 'bookings' })

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
})

describe('트리플 앱에서 로그인이 필요하면 토큰 새로고침을 시도하고, 로그인 뷰로 이동합니다.', () => {
  it('/api/users/me가 401로 응답하면 토큰 새로고침을 시도합니다.', async () => {
    mockedGet.mockResolvedValueOnce({ status: 401 } as any)

    const oldGSSP = jest.fn()
    const newGSSP = authGuard(oldGSSP)

    const appContext = {
      req: {
        headers: {
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
        },
      },
      resolvedUrl: '/test-url?_triple_no_navbar',
    } as any

    const result = await newGSSP(appContext)

    expect(oldGSSP).toBeCalledTimes(0)
    expect(result).toEqual({
      redirect: {
        destination: `/landing/refresh?returnUrl=${encodeURIComponent(
          '/test-url?_triple_no_navbar&refreshed=true',
        )}`,
        basePath: false,
        permanent: false,
      },
    })
  })

  it('토큰 새로고침 이후 /api/users/me가 다시 401로 응답하면 로그인 뷰로 이동합니다.', async () => {
    mockedGet.mockResolvedValueOnce({ status: 401 } as any)

    const oldGSSP = jest.fn()
    const newGSSP = authGuard(oldGSSP)

    const appContext = {
      req: {
        headers: {
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/5.4.0',
        },
      },
      resolvedUrl: '/test-url?refreshed=true',
    } as any

    process.env.NEXT_PUBLIC_APP_SCHEME = 'dev-soto'
    const result = await newGSSP(appContext)
    delete process.env.NEXT_PUBLIC_APP_SCHEME

    expect(oldGSSP).toBeCalledTimes(0)
    expect(result).toEqual({
      redirect: {
        destination: `dev-soto:///login?returnUrl=${encodeURIComponent(
          '/test-url?refreshed=true&attemptedLogin=true',
        )}`,
        basePath: false,
        permanent: false,
      },
    })
  })
})
