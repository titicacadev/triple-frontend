# HashRouterContext

hash를 사용하여 모달을 여닫을 수 있도록 필요한 값과 메서드를 제공하는 context입니다.
PC web, iOS, Android 환경에 따라 hash를 추가하는 방식을 다르게 설정할 수 있습니다.

## 비고

### PC Web, iOS 환경 기본동작

addUriHash, removeUriHash 메서드에 별도의 type을 전달하지 않는다면, 모달을 연 후 브라우저 뒤로가기 혹은 스와이프 제스쳐를 통해 뒤로가기가 발생했을 때 이전 페이지로 돌아갑니다.

### Android 환경 기본동작

addUriHash, removeUriHash 메서드에 별도의 type을 전달하지 않는다면, 모달을 연 후 브라우저 뒤로가기 혹은 물리 back key로 뒤로가기가 발생했을 때 모달만 닫힙니다.

### addUriHash와 removeUriHash의 사용

addUriHash와 removeUriHash에 전달하는 type 옵션을 동일하게 설정해야합니다.

## 사용법

### 1. provider 연결

- `@titicaca/react-contexts`의 `HashRouterProvider`를 사용하여 사용부의 페이지 컴포넌트를 감쌉니다.

```jsx
import { HashRouterProvider } from '@titicaca/react-contexts'

function ExamplePage({ children }) {
  return (
    <HashRouterProvider isAndroid={userAgent.os.name === 'Android'}>
      {children}
    </HashRouterProvider>
  )
}
```

### 2. useHashRouter 사용

- 열고자 하는 모달에 고유한 hash 지정합니다.
- 모달의 open 조건을 아래와 같이 지정

```jsx
import { useHashRouter } from '@titicaca/react-contexts'

function ExampleComponent() {
  const { uriHash } = useHashRouter()
  const open = uriHash === 'some.unique.hash'

  return <Popup open={open} />
}
```

- 모달이 열리는 로직(버튼 클릭 등) 내에 addUriHash를 추가합니다.(iOS, Android 환경에 따라 동작이 상이합니다.)

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

### 3. 사용 예시

```jsx
import { useHashRouter } from '@titicaca/react-contexts'

function ExampleComponent() {
  const POPUP_HASH = 'popup.hash'
  const { uriHash, addUriHash, removeUriHash } = useHashRouter()

  return (
    <div>
      <button onClick={() => addUriHash(POPUP_HASH)}>팝업 열기</button>
      <Popup open={uriHash === POPUP_HASH} onClose={() => removeUriHash()} />
    </div>
  )
}
```

## `HashRouterProvider`

### Props

- `isAndroid: boolean`: 안드로이드 환경인지 여부를 나타내는 값입니다.

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
