# fetcher

[fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)를 사용할 때
공통으로 필요한 기능을 제공하는 패키지입니다.

fetch API의 기본적인 기능을 모두 사용할 수 있고, 추가로 다음 기능을 제공합니다.

- [요청 헤더에 "X-Soto-Session" 추가](#x-soto-session-header)
- [요청 헤더에 "Content-Type" 추가](#content-type-header)
- [요청의 body를 stringification](#body-stringification)
- [요청 "credentials"를 `same-origin`으로 설정](#credentials)
- [HTTP 응답 에러 처리](#handle-http-errors)
- [특정 응답 코드일 때 요청 재시도](#retry)
- [응답 값 json 파싱](#parse-as-json)
- [(TypeScript) 응답 타입 지정](#response-type-casting)
- [HTTP 메서드별 함수](#methods)
- [액세스 토큰 갱신 기능](#token-refresh)
- [`getServerSideProps`에 fetchers를 제공하는 팩토리 함수](#ssr-fetchers)

## 요청 관련 기능

### <a name="x-soto-session-header">헤더에 "X-Soto-Session" 추가</a>

쿠키에 "x-soto-session" 값이 있으면 해당 값을 "X-Soto-Session" 헤더로 넣습니다.

> 액세스 토큰을 이용한 인증 방식을 사용하면서 "x-soto-session"을 쿠키로 대체했습니다.
> v3에서 없어질 기능입니다.

### <a name="content-type-header">헤더에 "Content-Type" 추가</a>

`body`가 존재하고 `useBodyAsRaw` 옵션이 꺼져있으면 "Content-Type"을 `application/json`으로 지정합니다.

### <a name="body-stringification">body stringification</a>

`JSON.stringify`를 통해 body 속성을 문자열로 변경합니다.
따라서 body 속성에는 JSON 객체를 직접 집어넣을 수 있습니다.

### <a name="credentials">"credentials"를 `same-origin`으로 설정</a>

## 응답 관련 기능

### <a name="handle-http-errors">HTTP 에러 처리</a>

응답 상태 코드가 300 이상일 때 에러를 발생시킵니다. `result` 속성을 비우고,
에러 객체를 `error`에 담아서 반환합니다.

응답의 문자열 형태 값을 에러 메시지에 담습니다.

### <a name="retry">재시도</a>

`retryable` 옵션이 켜져있을 때, GET 메서드의 응답이 502, 503, 504 중 하나라면
3번까지 다시 시도합니다.

### <a name="parse-as-json">응답 값 json 파싱</a>

응답 상태 코드가 200이고 응답 헤더의 "Content-Type"에 `json`이 명시되어있을 때
응답을 json으로 간주하고 파싱합니다. 파싱 과정에서 오류가 발생하면 undefined를 반환합니다.

### <a name="response-type-casting">(TypeScript) 응답 타입 지정</a>

함수 제너릭의 첫 번째 인자로 응답 타입을 지정할 수 있습니다.

```ts
const { result } = await fetcher<{ name: string; email: string }>('/api/...')
// result의 타입은 { name: string, email: string } | undefined
```

## 인터페이스 관련

### <a name="methods">HTTP 메서드별 함수</a>

GET, POST, PUT, DELETE 메서드별 함수를 따로 제공합니다. `get`, `post`, `put`, `del`

### <a name="token-refresh">액세스 토큰 갱신 기능</a>

`authGuardedFetchers` 객체로 묶여있는 함수를 사용하면 액세스 토큰 갱신 방법을 신경 쓸 필요가 없습니다.

응답 상태 코드가 401일 때 액세스 토큰을 갱신하고, 갱신에 실패했다면 로그인 핸들러를 호출하는 기능이 추가되어있습니다.

```ts
const response = await autGuardedFetchers.get<{ name: string; email: string }>(
  '/api/...',
)
// response는 HttpResponse<{ name: string, email: string }> | 'NEED_LOGIN'입니다.

if (response === 'NEED_LOGIN') {
  // 로그인 페이지로 이동
}
// response는 이제 기존 응답처럼 사용할 수 있습니다.
const { ok, result, error } = response
```

> 하위 호환을 위해 새로운 인터페이스로 추가했습니다. v3부터 기본 제공할 예정입니다.

### <a name="ssr-fetchers">`getServerSideProps`에 fetchers를 제공하는 팩토리 함수</a>

Next.js의 `getServerSideProps` 함수 안에 fetcher를 공급하는 팩토리 함수를 제공합니다.
API의 URL을 절대 경로로 만들어주는 기능과 액세스 토큰 갱신 기능을 내장합니다.

```ts
const getServerSideProps = addFetchersToGSSP(
  async function ({
    customContext: {
      fetchers: { get },
    },
  }): Promise<GetServerSidePropsResult<Props>> {
    const response = await get('/api/xxxx')
    // ...
  },
  { apiUriBase: process.env.API_URI_BASE },
)
```
