# fetcher

Next.js 기반 트리플 웹 앱에서 사용하는 `fetch` 를 랩핑한 SSR/CSR 에서 동시에 사용할 수 있는
API Client 라이브러리입니다.

🚨**이 라이브러리는 현재 `process.env.API_URI_BASE` 환경변수에 의존하여 동작합니다.** 🚨

- https://titicaca.slack.com/archives/CEEPB4TDY/p1600049528091600

## 기본 사용법

```ts
import { fetcher, HTTPMethod } from '@titicaca/fetcher'

type CustomResponse = {
  // ...
}

const { result } = await fetcher<CustomResponse>('/api/some/thing', {
  req, // SSR 시점에는 req 객체를 넘겨줌니다
  method: HTTPMethod.GET, // or HTTPMethod.PUT, HTTPMethod.POST
  body: { param1: 'value1' },
  headers: {
    'x-forwarded-for': '',
    'x-forwarded-host': '',
  },
})
```

위와 같이 `fetcher` 함수를 직접 사용할 수도 있지만 대부분의 경우에는 아래와 같이 활용하기를
권장합니다.

## Get

```ts
import { get } from '@titicaca/fetcher'

async function() {
  const { result, ok, error } = await get<UserResponse>('/api/users/me')
  const { name } = result
}

___.getInitialProps = async function({ req }: NextPageContext) {
  const { result: users, ok, error } =  await get<UserResponse>('/api/users/me')

  return { users }
}

export const getServerSideProps: GetServerSideProps<UserPageProps> = async ({
  req,
}) => {
  const { result } = await get<UserResponse>('/api/users/me', { req })

  if (!result) {
    throw new Error('Fail to fetch User')
  }

  return {
    props: {
      user: result,
    },
  }
}
```

## POST

```ts
import { post } from '@titicaca/fetcher'

async function() {
  const { result, ok, error } = await post<UserResponse>('/api/users/me', {
    req,  // if ssr
  })
}
```

## PUT

```ts
import { put } from '@titicaca/fetcher'

async function() {
  const { result, ok, error } = await put<UserResponse>('/api/users/me')
}
```

## DELETE

```ts
import { del } from '@titicaca/fetcher'

async function() {
  const { result, ok, error } = await del<UserResponse>('/api/users/me')
}
```

## with Post Body

```ts
import { post } from '@titicaca/fetcher'

async function() {
  const { result, ok, error } = await post<UserResponse>('/api/users/me', {
    req,  // if ssr
    body: {
      param1: '',
      param2: [ ... ], // array
      param3: { ... }, // nested object
    }
  })
}
```

## with Custom Header

```ts
import { post } from '@titicaca/fetcher'

async function() {
  const { result, ok, error } = await post<UserResponse>('/api/users/me', {
    req,  // if ssr
    headers: { // custom header
      'x-forwarded-host': ''
    }
  })
}
```

## with AbortController

```ts
const controller = new AbortController()
const signal = controller.siginal
const response = await get('/api/some/thing', {
  req,
  method: HTTPMethod.GET,
  signal,
})

setTimeout(() => {
  controller.abort()
}, 3000)
```

## TODOs

- [ ] Add camelize util function
