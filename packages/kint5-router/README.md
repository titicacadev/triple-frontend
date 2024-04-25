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

inlink나 outlink로 완성되어 있어 일일이 props를 설정하기 어려울 때 `useHrefToProps`훅을 사용합니다.

```tsx
const convertHrefToProps = useHrefToProps()

<ExternalLink {...convertHrefToProps(href)}>
```

[자세히 읽기](./src/link/README.md)

## 패키지의 목적

**TL; DR** 앱, 웹 상관 없이 링크를 추가할 때 사용할 수 있는 컴포넌트를 만들고 싶었습니다.

트리플 웹 서비스의 많은 부분에서 javascript 함수를 이용해 페이지를 이동합니다.
앱에서 새 창을 열려면 `<a target="_blank">`가 아니라 history-context에서 제공하는
`navigate`나 `openWindow` 등의 함수를 호출해야 하기 때문입니다.

이 방법을 사용하면서 형식을 잘 갖춘 a 태그를 만들지 않게 되었습니다.
`href`를 넣지 않아도 링크는 잘 작동하고,
심지어 a 태그가 아닌 div, span 등 모든 엘리먼트가 링크로 작동하게 됩니다.
하지만 이는 HTML 표준 방식이 아니기 때문에 크롤러나 스크린 리더 등에서 문제가 생길 수 있습니다.

그래서 기존에 사용하던 `navigate`나 `openWindow`와 같은 기능을 제공하면서
올바른 형식을 갖춘 a 태그를 생성해주는 컴포넌트를 구현하고 싶었습니다.

한편, next.js는 같은 next.js 앱 안에서 이동할 때
클라이언트 사이드에서 페이지 이동이 가능한 API를 제공합니다.
그 중 `Link` 컴포넌트는 이 컴포넌트의 작동 방식과 유사합니다.
하지만 앱 안에서 새 창으로 페이지를 열 때 분기가 필요하여
결국 `push`나 `replace` 함수를 사용하게 됩니다.
이 패키지의 `LocalLink` 컴포넌트는 next.js의 `Link` 컴포넌트처럼 작동하면서,
동시에 `target` prop을 통해 앱 내 새 창 열기도 지원하기 때문에 쉽게 사용할 수 있습니다.

a 태그의 일반적인 작동 방식을 최대한 살리면서
유사한 인터페이스로 트리플 앱 내 라우팅도 지원하는 컴포넌트를 구현하는 것이 목표입니다.
