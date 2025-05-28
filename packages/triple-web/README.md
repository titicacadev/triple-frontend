# EventTrackingContext

ga, fa, facebookPixel, tiktokPixel 이벤트를 로깅할 수 있는 메서드를 제공하는 context입니다.

## 주의사항

page_view 이벤트의 경우, fa에서 자동으로 page_view 이벤트를 기록하지 않도록 설정해야 합니다. 각 레포에서 firebase의 앱을 초기화할 때, firebase analytics 인스턴스도 초기화해야 page_view 이벤트가 중복으로 로깅되지 않습니다.

```
// firebase app 초기화 설정

import { initializeFirebaseApp } from 'firebase/app'
import { initializeAnalytics } from 'firebase/analytics'

function initializeFirebase() {
  const firebaseApp = initializeApp(config)

  // page_view 이벤트 중복 로깅을 위해 다음과 같이 analytics를 초기화합니다.
  initializeAnalytics(firebaseApp, {
    config: {
      send_page_view: false,
    },
  })
}
```

# HashRouterContext

hash를 사용하여 모달을 여닫을 수 있도록 필요한 값과 메서드를 제공하는 context입니다.
PC web, iOS, Android 환경에 따라 hash를 추가하는 방식을 다르게 설정할 수 있습니다.

## 알아두기

### PC Web, iOS 환경 기본동작

addUriHash, removeUriHash 메서드에 별도의 type을 전달하지 않는다면, 모달을 연 후 브라우저 뒤로가기 혹은 스와이프 제스쳐를 통해 뒤로가기가 발생했을 때 이전 페이지로 돌아갑니다.

### Android 환경 기본동작

addUriHash, removeUriHash 메서드에 별도의 type을 전달하지 않는다면, 모달을 연 후 브라우저 뒤로가기 혹은 물리 back key로 뒤로가기가 발생했을 때 모달만 닫힙니다.

## 사용방법

### useHashRouter 사용

- 열고자 하는 모달에 고유한 hash 지정합니다.
- 모달의 open 조건을 아래와 같이 지정

```jsx
function ExampleComponent() {
  const { uriHash, hasUriHash } = useHashRouter()
  const open = uriHash.includes('some.unique.hash')
  // 또는
  const open = hasUriHash('some.unique.hash')

  return <Popup open={open} />
}
```

- 모달이 열리는 로직(버튼 클릭 등) 내에 addUriHash를 추가합니다(iOS, Android 환경에 따라 동작이 상이합니다).

```jsx
<button onClick={() => addUriHash('some.unique.hash')}>팝업 보기</button>
```

- 이 때, 기기환경에 의존하지 않고 강제로 push 혹은 replace를 사용하길 원한다면 type을 지정합니다.

```jsx
/** iOS 환경에서도 Android 처럼 동작 */
<button onClick={() => addUriHash('some.unique.hash', 'push')} />

/** Android 환경에서도 iOS 처럼동작 */
<button onClick={() => addUriHash('some.unique.hash', 'replace')} />
```

- 모달을 닫는 부분에 removeUriHash를 추가합니다. 이 때, 모달을 열 때 사용한 addUriHash와 짝이 되는 type을 적용해야 합니다.

```jsx
/** Popup을 열 때 addUriHash의 type으로 'push'를 전달한 경우 */
<Popup onClose={() => removeUriHash('pop')}>

/** Popup을 열 때 addUriHash의 type으로 'replace'를 전달한 경우 */
<Popup onClose={() => removeUriHash('replace')}>

/** Popup을 열 때 addUriHash의 type으로 아무것도 전달하지 않은 경우 */
<Popup onClose={() => removeUriHash()}>
```

- addUriHash와 removeUriHash에 전달하는 type 옵션을 동일하게 설정해야합니다.

### 사용 예시

`uriHash`는 `&`로 엮인 해시값을 리턴합니다.

ex) `hash.first&hash.second&hash.third`

`hasUriHash`를 통해 특정 값이 해시에 존재하는지 확인합니다.

ex) `hasUriHash('hash.second')`

```jsx
function ExampleComponent() {
  const POPUP_HASH = 'popup.hash'
  const { hasUriHash, addUriHash, removeUriHash } = useHashRouter()

  return (
    <div>
      <button onClick={() => addUriHash(POPUP_HASH)}>팝업 열기</button>
      <Popup open={hasUriHash(POPUP_HASH)} onClose={() => removeUriHash()} />
    </div>
  )
}
```

## `useHashRouter()`

### Return values

- `uriHash: string` : 현재 Hash를 반환합니다. `addUriHash`, `removeUriHash`에 의해 trigger 됩니다.
- `addUriHash: (hash: string, type?: 'push' | 'replace' = isAndroid ? 'push' : 'replace') => void` : Hash를 추가합니다.
  - `hash`: 추가할 Hash
  - `type?`
    - `push` : `window.history.pushState`를 사용하여 Hash를 추가합니다.
    - `replace` : `window.history.replaceState`를 사용하여 Hash를 추가합니다.
- `removeUriHash: (type?: 'pop' | 'replace' = isAndroid ? 'pop' : 'replace') => void` : Hash를 제거합니다. (TODO: Hash가 없다면 동작하지 않습니다.)
  - `type?`
    - `pop` : `window.history.back`을 사용하여 Hash를 제거합니다.
    - `replace` : `window.history.replaceState`를 사용하여 Hash를 제거합니다.
- `hasUriHash: (hash:string) => boolean` : Hash값이 현재 Hash에 있는지 확인합니다.
  - `hash`: 값의 존재를 확인할 Hash
