# `@titicaca/router`

페이지 라우팅 관련 컴포넌트와 훅을 모으는 패키지입니다.

## link

`LocalLink`, `ExternalLink`, `useHrefToProps`를 제공합니다.
`LocalLink`와 `ExternalLink`는 a 태그를 감싸서 트리플 앱과 일반 브라우저 모두에서 작동하게 만드는 링크 컴포넌트입니다.
`useHrefToProps` 훅은 기존 inlink, outlink로 구성된 href를 ExternalLink 컴포넌트의 prop으로 변환하는 함수를 반환합니다.

### 빠른 시작

같은 프로젝트의 페이지로 이동할 때는 `LocalLink`를 사용합니다.

```tsx
<LocalLink target="new" href="/1">
  <a>상세 페이지로 이동하기</a>
</LocalLink>
```

기타 모든 URL로 이동할 때는 `ExternalLink`를 사용합니다.

```tsx
<ExternalLink target="current" href="/air/some-air-url">
  <a>항공 웹으로 이동하기</a>
</ExternalLink>
```

```tsx
<ExternalLink target="new" href="https://google.com">
  <a>구글링 해보세요</a>
</ExternalLink>
```

inlink나 outlink로 완성되어 있어 일일히 props를 설정하기 어려울 때 `useHrefToProps`훅을 사용합니다.

```tsx
const convertHrefToProps = useHrefToProps()

<ExternalLink {...convertHrefToProps(href)}>
```

[자세히 읽기](./src/link/README.md)

## 패키지의 목적

다른 페이지로 이동하는 방법은 다양하고, 페이지 이동을 막아야하는 조건도 많습니다.
수많은 코드들이 여러 곳에 쪼개진 채로 암묵적인 규칙으로 유지되고 있습니다.
예를 들어, 앱과 웹에서 새 창을 여는 방법은 다릅니다.
그리고 앱에서 제공하는 인터페이스를 사용하기 위해 새창으로 열어야만 하는 경우가 있습니다.
특정 페이지는 앱에서만 열려야 하고, 웹에서 열기를 시도하면 앱 설치 유도 모달을 띄워야 합니다.
그러면서 좋은 HTML 구조를 사용해야 검색 엔진에 최적화할 수 있습니다.

이러한 다양한 방법과 조건을 한 곳에 모아 각각의 조건과 세부적인 구현을 몰라도
사용할 수 있는 인터페이스를 제공하는 것이 이 패키지의 목적입니다.
