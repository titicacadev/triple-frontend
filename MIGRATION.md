# 마이그레이션 가이드

## v4 to v5

### deprecated props 제거 및 사용 방법

아래에 정의되어있는 컴포넌트들의 `appUrlScheme`, `webUrlBase`, `fbAppId` props가 제거되었습니다.

props를 사용하고 있다면 제거해주세요.

- HistoryProvider (appUrlScheme, webUrlBase)
- CSFooter (appUrlScheme)
- Review (appUrlScheme)
- FacebookOpenGraphMeta (appUrlScheme, fbAppId)
- FacebookAppLinkMeta (appUrlScheme)
- AppleSmartBannerMeta (appUrlScheme)

해당 props가 필요하면 `EnvProvider`를 사용해주세요.

```tsx
<EnvProvider
  appUrlScheme={process.env.APP_URL_SCHEME}
  webUrlBase={process.env.WEB_URL_BASE}
  fbAppId={process.env.FB_APP_ID}
>
  <HistoryProvider {...props}>
    {children}
  </HisotryProvider>
</EnvProvider>
```

### Text.Html/Text.WithRef 삭제

core-elements 패키지에서 `Text.Html/Text.WithRef` 컴포넌트를 더이상 지원하지 않습니다.

`<Text.Html />` 컴포넌트를 사용하던 곳에서는 직접 styled(Text)를 만들어서 필요한 css를 선언해주세요.

```tsx
// v4
const TextHtml = styled(Text.Html)`
  font-size: 14px;
  ...
`

// v5
const TextHtml = styled(Text)`
  font-size : 14px;
  ...
`
```

`<Text.WithRef />` 컴포넌트는 `<Text />` 컴포넌트를 사용하세요.

```tsx
// v4
<Text.WithRef {...props}>
  {children}
</Text.WithRef>

// v5
<Text {...props}>
  {children}
</Text>
```

## v3 to v4

### floating-install-button 패키지 제거

대신 app-installation-cta 패키지의 `FloatingButtonCTA` 컴포넌트를 사용하세요.

### fetcher 응답 타입 변경

`error`, `result`, body 관련 속성이 없어졌습니다. `result` 대신 `parsedBody`를 사용하세요.
`parsedBody`는 ok 여부에 따라 타입이 분기되므로 ok를 확인해야 합니다.

```ts
const response = await fetcher<SuccessResponse, FailureResponse>('/api/foo')

if (response.ok === true) {
  // response.parsedBody는 SuccessResponse
} else {
  // response.parsedBody는 FailureResponse
}
```

오류를 내야할 때는 `response`의 `status` 속성을 이용해 에러 메시지를 만드세요.

```ts
if (response.ok === false) {
  const { status } = response

  throw new Error(`Fail to fetch foo: ${status}`)
}
```

### session-context 재작성

`SessionContextProvider`의 prop이 변경되었습니다. 일일히 넣어줄 필요 없이, `SessionContextProvider.getInitialProps`의 반환 값을 사용하면 됩니다.

```tsx
// in _app, getInitialProps.
const sessionContextProviderProps = await SessionContextProvider.getInitialProps(ctx)

return {
  sessionContextProviderProps
}

// in JSX area of _app

<SessionContextProvider {...sessionContextProviderProps}>
```

그리고 `useSessionContext`가 없어졌습니다. 로그인 여부가 필요하면 `useSessionAvailablity`를 사용하세요. 로그인, 로그아웃 함수가 필요하면 `useSessionControllers`를 사용하세요. 사용자 정보가 필요하면 `useUser`를 사용하세요.

## v2 to v3

### react-contexts: EnvProvider에 필수 props 필요

새 props가 추가되었습니다.

- afOnelinkId (required)
- afOnelinkPid (required)
- afOnelineSubdomain (required)

### public-header: props 변경 필요함

deprecated된 props을 제거합니다.

- href
- playStoreUrl
- appStoreUrl
- fixed
- minWidth
- mobileViewHeight
- borderless
- children

새 props가 추가되었습니다.

- category (optional)
- deeplinkPath (optional)
- disableAutoHide (optional)

### public-header: position: fixed 제거됨

`position: fixed` 스타일이 제거되어 기본적으로 페이지 상단에 고정되지 않습니다.
페이지 상단에 고정시키기 위해서는 `core-elements/StickyHeader`와 같이 사용할 수 있습니다.

```tsx
<StickyHeader>
  <PublicHeader>
</StickyHeader>
```
