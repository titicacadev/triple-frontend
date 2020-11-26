# Env Context

각 서비스에서 사용하는 환경 변수를 TF 패키지에서 쉽게 사용할 수 있게 공급해주는 context입니다.

## 마이그레이션 하는 법

서비스 최상단 (`_app`)에 `EnvProvider`를 추가합니다.

```tsx
<EnvProvider
  appUrlScheme={process.env.NEXT_PUBLIC_APP_URL_SCHEME}
  webUrlBase={process.env.NEXT_PUBLIC_WEB_URL_BASE}
  authBasePath="/"
  facebookAppId={process.env.NEXT_PUBLIC_FB_APP_ID}
  defaultPageTitle={process.env.NEXT_PUBLIC_DEFAULT_PAGE_TITLE}
  defaultPageDescription={process.env.NEXT_PUBLIC_DEFAULT_PAGE_DESCRIPTION}
>
  {/* ... */}
  <Component />
  {/* ... */}
</EnvProvider>
```

TF 컴포넌트의 prop을 제거합니다.

```diff
<HistoryProvider
-  appUrlScheme={process.env.NEXT_PUBLIC_APP_URL_SCHEME}
-  webUrlBase={process.env.NEXT_PUBLIC_WEB_URL_BASE}
>
  {/* ... */}
</HistoryProvider>
```

```diff
<SessionContextProvider
-  authBasePath="/"
>
  {/* ... */}
</SessionContextProvider>
```
