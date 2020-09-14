# fetcher

Api Client 라이브러리

```ts
const { result } = await fetcher<CustomResponse>('/api/some/thing', {
  req,
  method: HTTPMethod.GET, // or HTTPMethod.PUT, HTTPMethod.POST
  body: { param1: 'value1' },
  headers: {
    'x-forwarded-for': '',
    'x-forwared-host': ''
  }
})

// with AbortController
const controller = new AbortController()
const signal = controller.siginal
const response = await fetcher('/api/some/thing', {
  req,
  method: HTTPMethod.GET,
  signal,
  }
})

setTimeout(() => {
  controller.abort()
}, 3000)
```

## Get

```ts
import fetcher, { get, post, put } from '.'

const { result, ok, error }= await get<UserResponse>('/api/users/me')
const { name } = result

____.getInitialProps = aync function ({ req }: NextPageContext) {
  const { result } = await get<UserResponse>('/api/users/me', { req })
  const { name } = result
}

post('/api/users/me', { req, body: { foo: 'bar' }})
put('/api/users/me', { req, body: { foo: 'bar' }})
```

## POST

## PUT

## DELETE

## with Next.js

## TODOs

- [ ] Add AbortController
