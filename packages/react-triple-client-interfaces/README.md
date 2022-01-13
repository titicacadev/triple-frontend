# `@titicaca/react-client-interfaces`

[triple-web-to-native-interfaces](https://github.com/titicacadev/triple-web-to-native-interfaces/)
패키지에서 관리하고 있는 클라이언트 인터페이스를 React 컴포넌트에서 이용할 수
있도록 하고, 트리플 Android/iOS 네이티브 클라이언트 앱의 정보를 관리합니다.

## Usage

### `ClientContextProvider`

User-Agent 값을 파싱하여 페이지 렌더링에 사용한 네이티브 클라이언트 정보를 하위
컴포넌트에 제공합니다. 클라이언트 연동이 필요한 페이지엔 꼭 Mount해야 합니다.

```jsx
import { ClientContextProvider } from '@titicaca/react-client-interfaces'

function ThePageComponent() {
  return (
    <ClientContextProvider
      {...ClientContextProvider.getInitialProps(nextPageContext)}
    >
      <YourPageModule />
    </ClientContextProvider>
  )
}
```

### `useClientContext`

`ClientContextProvider`가 제공하는 클라이언트 정보를 Hook으로 노출합니다.

```jsx
function YourComponent() {
  const app = useClientContext()

  if (app) {
    /* 네이티브 클라이언트 앱 사용 중 */
    const { appName, appVersion } = app

    console.log(appName) // "Triple-iOS" 혹은 "Triple-Android"
    console.log(appVersion) // "5.11.0" 등 Semver 방식으로 표현한 앱 버전
  } else {
    /* 비-트리플 브라우저 사용 중 */
  }
}
```

### `useClientActions`

페이지 구현에 필요한 클라이언트 인터페이스를 Hook으로 노출합니다. 클라이언트 앱
버전에 따라 지원하는 인터페이스 종류가 달라질 수 있는데, 사용 중인 클라이언트에서
지원하지 않는 인터페이스는 `undefined`로 반환합니다.

```jsx
function YourComponent() {
  const { showToast } = useClientActions()

  if (showToast) {
    /* showToast 인터페이스를 갖춘 네이티브 클라이언트 앱 사용 중 */
    showToast('안녕하세요!')
  } else {
    /*
     * 비-트리플 브라우저이거나, showToast 인터페이스를 갖추지 않은
     * 버전의 네이티브 클라이언트 앱 사용 중
     */
  }
}
```
