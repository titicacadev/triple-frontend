# `@titicaca/triple-fallback-action`

HTML 페이지는 로드했으나 Javascript 파일을 로드하지 못했을 때 페이지를 벗어나는 기능을 제공합니다.

## 작동 원리

특정 클래스의 엘리먼트를 클릭했을 때 페이지를 닫거나 뒤로 가기하는 스크립트가 있습니다.
이 스크립트를 서버에서 페이지를 만들 때 HTML 문서에 인라인 시킵니다.
따라서, JS 애셋을 로드하지 못했더라도 특정 클래스의 엘리먼트를 클릭하면 페이지를 닫거나 뒤로 갈 수 있습니다.
이 특정 클래스는 뒤로 가기 버튼이나, 화면 전체를 덮는 요소에 추가합니다.

## 적용 방법

`pages/_document.tsx`에 다음 코드를 추가하세요.

<!-- prettier-ignore-start -->
```tsx
import { TripleFallbackActionScript } from '@titicaca/triple-fallback-action'

// class MyDocument extends Document {
  // public render() {
    // return (
      // <body>
        // ...
        <TripleFallbackActionScript />
      // </body>
    // )
  // }
// }
```
<!-- prettier-ignore-end -->

`pages/_app.tsx`에 다음 코드를 추가하세요.

<!-- prettier-ignore-start -->
```ts
import { useTripleFallbackActionRemover } from '@titicaca/triple-fallback-action'

// function MyApp() {
  // ...

  useTripleFallbackActionRemover()

  // ...
// }
```
<!-- prettier-ignore-end -->

`MyApp`이 클래스 컴포넌트라면 컴포넌트를 추가하세요.

<!-- prettier-ignore-start -->
```tsx
import { TripleFallbackActionRemover } from '@titicaca/triple-fallback-action'

// class MyApp extends App {
  // public render() {
    // return (
      // ...
      <TripleFallbackActionRemover />
    // )
  // }
// }
```
<!-- prettier-ignore-end -->
