# `@titicaca/router`

페이지 라우팅 관련 컴포넌트와 훅을 모으는 패키지입니다.

## link

### 언제 사용하나요?

**TL; DR** 사용자가 클릭하면 다른 페이지를 표시하는 링크를 만들 때 이 컴포넌트를 사용할 수 있습니다.

그동안 트리플 웹 서비스는 javascript 함수를 이용해 페이지를 이동했습니다.
앱에서 새 창을 열려면 `<a target="_blank">`가 아니라 history-context에서 제공하는
`navigate`나 `openWindow` 등의 함수를 호출해야 하기 때문입니다.
이 방법을 사용하면서 형식을 잘 갖춘 a 태그를 만들지 않게 되었습니다.
`href`를 넣지 않아도 링크는 잘 작동하고,
심지어 a 태그가 아닌 div, span 등 모든 엘리먼트가 링크로 작동하게 됩니다.
하지만 이는 HTML 표준 방식이 아니기 때문에 크롤러나 스크린 리더 등에서 문제가 생길 수 있습니다.
그래서 기존에 사용하던 `navigate`나 `openWindow`와 같은 기능을 제공하면서
올바른 형식을 갖춘 a 태그를 생성해주는 컴포넌트를 구현하게 되었습니다.

next.js는 같은 next.js 앱 안에서 이동할 때
클라이언트 사이드에서 페이지 이동이 가능한 API를 제공합니다.
그 중 `Link` 컴포넌트는 이 컴포넌트의 작동 방식과 유사합니다.
하지만 앱 안에서 새 창으로 페이지를 열 때 분기가 필요하여
결국 `push`나 `replace` 함수를 사용하게 됩니다.
이 패키지의 `LocalLink` 컴포넌트는 next.js의 `Link` 컴포넌트처럼 작동하면서,
동시에 `target` prop을 통해 앱 내 새 창 열기도 지원하기 때문에 쉽게 사용할 수 있습니다.

a 태그의 일반적인 작동 방식을 최대한 살리면서
유사한 인터페이스로 트리플 앱 내 라우팅도 지원하는 컴포넌트를 구현하는 것이 목표입니다.

### `LocalLink`, `ExternalLink` 공통

| 이름          | 설명                                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`      | 페이지를 이동할 목표입니다. `current`, `new`, `browser` 세 가지를 사용할 수 있으며 각각 현재 창, 새 창(새 웹뷰), 기본 브라우저를 의미합니다.               |
| `relList`     | anchor 엘리먼트의 [링크 유형](https://developer.mozilla.org/ko/docs/Web/HTML/Link_types) 목록입니다. 중복되어도 알아서 중복을 제거하여 `rel`로 넣어줍니다. |
| `allowSource` | 링크가 작동하는 환경을 명시하는 prop입니다. `all`, `app`, `app-with-session`, 'none' 네 가지 타입을 가지며 prop을 넣지 않았을 때는 `all`입니다.            |
| `onClick`     | anchor를 클릭했을 때 작동합니다. 이벤트 로깅하는 데 사용할 수 있습니다. anchor가 routable할 때만 작동합니다.                                               |

### `LocalLink`

`href`: `basePath`를 생략한 path를 넣어줍니다.
`replace`: next/router의 `replace` 함수를 사용해 라우팅합니다. 현재창 target에서만 의미가 있습니다.

### `ExternalLink`

`href`: `basePath`를 포함한 path나 외부 URL을 넣어줍니다.
`title`: 앱 내에서 outlink로 연 윈도우의 제목을 지정합니다.

### `useHrefToProps`

inlink, outlink가 포함된 href를 받아서 Link 컴포넌트의 href, target, allowSource 세 가지 prop을 반환합니다.

```tsx
const convertHrefToProps = useHrefToProps()

<ExternalLink {...convertHrefToProps(target)} />
```

#### `href`

inlink, outlink는 각각 query에 들어있는 URL이나 path를 빼내고,
트리플 도메인의 절대 경로(`https://triple.guide/regions/....`)는 scheme과 host를 제거합니다.

#### `target`

현재 웹일 땐 `current`, 앱일 땐 `new`를 반환합니다.
단, outlink의 target query가 browser이면 `browser`를 반환합니다.

#### `allowSource`

| `checkIfRoutable` | inlink with `_web_expand` |       inlink       |       그 외        |
| ----------------: | :-----------------------: | :----------------: | :----------------: |
|              true |           `all`           |       `app`        |       `all`        |
|             false |    `app-with-session`     | `app-with-session` | `app-with-session` |
