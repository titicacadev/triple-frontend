# 마이그레이션 가이드

## ~v11 to v12

### ui renewal

- 컴포넌트의 접근성, 스타일 관련 코드가 개편되었습니다.
- [TF renewal-ui(v12.0.0) 업그레이드 가이드](https://titicaca.atlassian.net/wiki/spaces/dev/pages/3232759922/TF+renewal-ui+v12.0.0)

## v10 to v11

### i18n

- TF에 국제화를 도입합니다.
- [국제화(i18n) 적용 가이드](https://titicaca.atlassian.net/wiki/spaces/dev/pages/3241280391/i18n)

## v9 to v10

### react-contexts

- firebase를 v9로 업그레이드하여 dependency 및 일부 로직의 수정이 필요합니다.
- [firebase v9 업그레이드 문서](https://titicaca.atlassian.net/wiki/spaces/dev/pages/3202777132/TF+firebase+v9)를 참고해주시기 바랍니다.

## v8 to v9

### review 패키지 react-query 적용

- react-query의 적용으로 `QueryProvider` 마운트가 필요하게 됐습니다.
- review 패키지가 필요할 경우 해당 프로젝트에 'react-query'를 install 해주고 아래와 같이 추가해주세요.

```
// app.tsx

import { QueryProvider } from 'react-query'

// react-query 옵션 링크
// https://react-query-v2.tanstack.com/reference/useQuery#_top
// 아래 defaultOptions을 제외하고는 필요에 따라 option이 달라져 해당 옵션만 추가합니다.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    },
  },
})

<QueryProvider client={queryClient}>
  <Component {...pageProps} />
</QueryProvider>

```

## v7 to v8

### triple-email-document

- `EmailFooter`가 제거되었습니다.

  뉴스레터 / 이메일에서 사용하는 푸터 디자인이 개별로 정의되었기에. 패키지에서 관리하지 않습니다.

## v6 to v7

### `@titicaca/react-triple-client-interfaces` 사용

- TF 패키지 내부의 웹-앱 동작 분기가 `react-triple-client-interfaces`에 의존하게 되었습니다.
  - `TripleClientMetadataProvider` 마운트가 필요합니다.

### 네이밍이 변경된 패키지

#### app-installation-cta

- AppInstallationCTA -> AppInstallationCta
- ArticleCardCTA -> ArticleCardCta
- BannerCTA -> BannerCta
- ChatbotCTA -> ChatbotCta
- FloatingButtonCTA -> FloatingButtonCta

#### poi-list-elements

- POICardElement -> PoiCardElement
- POIListElementBaseProps -> PoiListElementBaseProps

#### type-definitions

- PointGeoJSON -> PointGeoJson
- ListingPOI -> ListingPoi

#### poi-detail

- onCTAClick -> onCtaClick
- setArticleCardCTA -> setArticleCardCta

## v5 to v6

### map 구조 변경 및 기존 컴포넌트 오타 수정

중간에 `cirlce` 오타를 `circle`로 올바르게 수정
`HotelCirlceMarker` => `HotelCirlceMarker`
`AttractionCirlceMarker` => `AttractionCircleMarker`
`RestaurantCirlceMarker` => `RestaurantCircleMarker`

아래의 자세한 내용들은 map 패키지 리드미를 참고해주세요. (https://github.com/titicacadev/triple-frontend/blob/main/packages/map/README.md)

마커

- 말풍선 모양의 마커 => `PoiDotMarker` 사용
- CircleMarker 중 active 및 default를 구분하는 마커 => `FlexibleMarker` 사용

옵션

- `MapView` 컴포넌트에 `coordinates` props이 추가되어 maptoptions을 적용하는 방법이 2가지로 변경되었습니다.

1. Map에 대한 options을 직접주입
2. `coordinates`를 통한 options 주입

- 이미지 사용 시 inline svg 이미지를 사용합니다.

- 지도 상의 focus를 움직이기 위한 `FocusTracker`가 추가되었습니다.

### fetcher 패키지의 일부 인터페이스 이름 변경

`addFetchersToGSSP`는 `addFetchersToGssp`가 되었습니다.
`HTTPMethods`는 `HttpMethods`가 되었고, 멤버 이름도 PascalCase가 되었습니다. 예를 들어 `HttpMethods.Get` 형태로 사용합니다.

### react-contexts 인터페이스의 네이밍 변경

다음과 같은 네이밍 변경이 있었습니다.

- useURIHash -> useUriHash
- HistoryProvider의 prop 이름 변경: loginCTAModalHash -> loginCtaModalHash
- HashStrategy의 멤버 네이밍 변경
- GAParams -> GoogleAnalyticsParams
- FAParams -> FirebaseAnalyticsParams
- withUTMContext -> withUtmContext
- WithUTMContextBaseProps -> WithUtmContextBaseProps
- useUTMContext -> useUtmContext
- UTMProvider -> UtmProvider
- extractUTMContextFromQuery -> extractUtmContextFromQuery

### `useHistoryContext`

제거했습니다. `uriHash`는 `useURIHash`로 참조할 수 있고, 나머지 함수는 `useHistoryFunctions`로 참조할 수 있습니다.
자세한 내용은 [#928](https://github.com/titicacadev/triple-frontend/pull/928)을 확인하세요.

### user-verification 패키지의 의존성 추가

- `TripleClientMetadataProvider`가 Mount된 페이지에서만 사용할 수 있습니다.

### `LocalLink`, `ExternalLink`가 a 태그를 직접 렌더링

이제 `LocalLink`와 `ExternalLink`의 자식 엘리먼트로 a 태그를 넣어줄 필요가 없습니다.
a 태그를 직접 렌더링합니다.

a 태그에 스타일링이 필요하다면 styled-components로 확장하세요.

```ts
const StyledLocalLink = styled(LocalLink)`
  /* 확장할 스타일을 넣으세요 */
`
```

`LocalLink`와 `ExternalLink`가 a 태그나 button 태그를 렌더링하면서 둘 사이의 스타일을 일정하게 유지할 필요가 있었습니다.
그래서 a 태그에 `display: inline-block` 속성을 추가했습니다.
스타일이 어긋나지 않는지 확인해주세요.

### ad-banners의 `ListDirection`의 멤버 네이밍 변경

`ListDirection.VERTICAL`을 `ListDirection.Vertical`로 변경했습니다.
`ListDirection.HORIZONTAL`을 `ListDirection.Horizontal`로 변경했습니다.

### modals 패키지 인터페이스의 네이밍 변경

다음과 같은 네이밍 변경이 있었습니다.

- useLoginCTAModal -> useLoginCtaModal
- withLoginCTAModal -> withLoginCtaModal
- LoginCTAModalProvider -> LoginCtaModalProvider

### `@titicaca/react-triple-client-interfaces` 사용

트리플 네이티브 클라이언트를 이용하거나 클라이언트 종류에 따른 동작 분기가 필요한 경우
`@titicaca/react-triple-client-interfaces` 패키지가 제공하는 기능을 사용해야 합니다.
이 패키지 동작에 필요한 `TripleClientMetadataProvider`를 마운트해주세요.

자세한 설명은 [패키지 README](https://github.com/titicacadev/triple-frontend/tree/main/packages/react-triple-client-interfaces)를
참고 바랍니다.

## v4 to v5

### deprecated props 제거 및 사용 방법

아래에 정의되어있는 컴포넌트들의 `appUrlScheme`, `webUrlBase`, `fbAppId` props를 지원하지 않습니다.

props를 사용하고 있다면 제거하세요.

- HistoryProvider (appUrlScheme, webUrlBase)
- CSFooter (appUrlScheme)
- Review (appUrlScheme)
- FacebookOpenGraphMeta (appUrlScheme, fbAppId)
- FacebookAppLinkMeta (appUrlScheme)
- AppleSmartBannerMeta (appUrlScheme)

해당 props가 필요하면 `EnvProvider`를 사용하세요.

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

`<Text.Html />` 컴포넌트를 사용하던 곳에서는 직접 styled(Text)를 만들어서 필요한 css를 선언하세요.

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

## v1 to v2

https://github.com/titicacadev/triple-frontend/issues/1008
