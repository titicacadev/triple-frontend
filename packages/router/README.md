# `@titicaca/router`

페이지 라우팅 관련 컴포넌트와 훅을 모으는 패키지입니다.

## link

### `LocalLink`, `ExternalLink` 공통

| 이름          | 설명                                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`      | 페이지를 이동할 목표입니다. `current`, `new`, `browser` 세 가지를 사용할 수 있으며 각각 현재 창, 새 창(새 웹뷰), 기본 브라우저를 의미합니다.               |
| `relList`     | anchor 엘리먼트의 [링크 유형](https://developer.mozilla.org/ko/docs/Web/HTML/Link_types) 목록입니다. 중복되어도 알아서 중복을 제거하여 `rel`로 넣어줍니다. |
| `allowSource` | 링크가 작동하는 환경을 명시하는 prop입니다. `all`, `app`, `app-with-session` 세 가지 상태를 가지며 prop을 넣지 않았을 때는 주어진 href만으로 판단합니다.   |
| `onClick`     | anchor를 클릭했을 때 작동합니다. 이벤트 로깅하는 데 사용할 수 있습니다. anchor가 routable할 때만 작동합니다.                                               |

### `LocalLink`

`href`: `basePath`를 생략한 path를 넣어줍니다.
`replace`: next/router의 `replace` 함수를 사용해 라우팅합니다. 현재창 target에서만 의미가 있습니다.

### `ExternalLink`

`href`: `basePath`를 포함한 path나 외부 URL을 넣어줍니다.
`title`: 앱 내에서 outlink로 연 윈도우의 제목을 지정합니다.

### `useHrefToProps`

inlink, outlink가 포함된 href를 받아서 Link 컴포넌트의 prop을 반환합니다.

```tsx
const convertHrefToProps = useHrefToProps()

<ExternalLink {...convertHrefToProps(target)} />
```

- 트리플 도메인의 절대 경로(`https://triple.guide/regions/....`)는 scheme과 host를 제거합니다. 그리고 현재 창에서 엽니다.
- 외부 URL은 그대로 반환하고 웹일 땐 현재창, 앱일 땐 새 창에서 엽니다.
- inlink url은 path query의 값을 반환하고, 웹일 땐 현재창, 앱일 땐 새 창에서 엽니다. 웹인데 `_web_expand` query가 없으면 URL을 열지 않습니다.
- outlink url은 url query의 값을 한 번 더 함수를 통과시킨 다음 반환하고, target: browser query가 있으면 브라우저로, 없으면 새 창으로 엽니다.
