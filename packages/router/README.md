# `@titicaca/router`

페이지 라우팅 관련 컴포넌트와 훅을 모으는 패키지입니다.

## link

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
