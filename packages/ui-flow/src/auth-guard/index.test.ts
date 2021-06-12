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

it('일반 브라우저 환경이라면 fetcher로 /api/users/me를 호출합니다.', async () => {
  const oldGSSP = jest.fn()
  mockedGet.mockResolvedValueOnce({ result: { userId: 'MOCK_USER' } } as any)

  const newGSSP = authGuard(oldGSSP)
  const ctx = {
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      },
    },
  } as any

  await newGSSP(ctx)

  expect(mockedGet).toBeCalledWith('/api/users/me', expect.anything())
  expect(mockedGet).toBeCalledTimes(1)
})

it('/api/users/me가 회원 정보를 반환하면 customContext에 회원 정보를 추가하여 기존 getServerSideProps를 호출합니다.', async () => {
  const oldGSSP = jest.fn()
  const user = { userId: 'MOCK_USER' }
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
