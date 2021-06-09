# `authGuard`

로그인 여부를 검사하는 Next.js의 `getServerSideProps` HOC입니다.

## 사용하기

```ts
// pages/xxx
export const getServerSideProps = authGuard(({ req, query, customContext }) => {
  // 서버사이드 코드...
})
```

```js
// next.config.js
module.exports = {
  // ...
  async rewrites() {
    return [
      // ...
      {
        source: '/login',
        destination: `${API_URI_BASE}/login`,
        basePath: false,
      },
    ],
  },
}
```

## 작동 방식

먼저 User Agent를 확인하여 트리플 앱에서 요청했는지 아닌지를 판단합니다.
만약 앱에서 요청했다면 아무 처리도 하지 않고 파라미터로 주어진 다음 함수를 호출합니다.

일반 브라우저에서 요청했다면 `/api/users/me` API를 요청하여 응답을 확인합니다.
사용자 정보가 잘 넘어온다면, `customContext.user`에 사용자 정보를 넣어 다음 함수를 호출합니다.

`/api/users/me` API가 401로 응답하면 로그인이 되어있지 않다고 판단하여 `/login` path로 리디렉션합니다.
`getServerSideProps`에 주어지는 `resolvedUrl` 파라미터와 `NEXT_PUBLIC_BASE_PATH`를 조합하여 현재 URL을 알아냅니다.
그리고 이 URL을 `returnUrl` search parameter로 첨부합니다.
host 없이 `/login` path로 리디렉션 시키기 때문에
`next.config.js`에 `/login` path에 대한 처리가 있어야 로컬 개발 환경에서 편합니다.

`/api/users/me`를 요청할 때 재시도 로직이 있어 일시적인 오류는 재시도합니다.
재시도에도 실패했거나 재시도하지 않는 에러 코드가 발생했다면 인증을 검사할 수 없다는 에러를 던집니다.
`getServerSideProps` 함수 안에서 에러가 났기 때문에 사용자는 에러 페이지를 보게 됩니다.
