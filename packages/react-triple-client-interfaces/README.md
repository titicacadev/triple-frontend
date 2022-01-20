# `@titicaca/react-triple-client-interfaces`

[triple-web-to-native-interfaces](https://github.com/titicacadev/triple-web-to-native-interfaces/)
패키지에서 관리하고 있는 클라이언트 인터페이스를 React 컴포넌트에서 이용할 수
있도록 하고, 트리플 Android/iOS 네이티브 클라이언트 앱의 정보를 관리합니다.

## Usage

### `TripleClientMetadataProvider`

User-Agent 값을 파싱하여 페이지 렌더링에 사용한 네이티브 클라이언트 정보를 하위
컴포넌트에 제공합니다. 클라이언트 연동이 필요한 페이지엔 꼭 Mount해야 합니다.

```jsx
import { TripleClientMetadataProvider } from '@titicaca/react-triple-client-interfaces'

class CustomNextjsApp() {
  static async getInitialProps(ctx) {
    const tripleClientMetadataProps = await TripleClientMetadataProvider.getInitialProps(ctx)

    return { tripleClientMetadataProps }
  }

  render() {
    <ClientContextProvider
      {...this.props.tripleClientMetadataProps}
    >
      <YourPageModule />
    </ClientContextProvider>
  }
}
```

### `useTripleClientMetadata`

`TripleClientMetadataProvider`가 제공하는 클라이언트 정보를 Hook으로 노출합니다.

```jsx
function YourComponent() {
  const app = useTripleClientMetadata()

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

### `useTripleClientActions`

페이지 구현에 필요한 클라이언트 인터페이스를 Hook으로 노출합니다. 클라이언트 앱
버전에 따라 지원하는 인터페이스 종류가 달라질 수 있는데, 사용 중인 클라이언트에서
지원하지 않는 인터페이스는 `undefined`로 반환합니다.

```jsx
function YourComponent() {
  const { showToast } = useTripleClientActions()

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

### `useTripleClientFeatureFlag`

특정 기능이나 뷰를 트리플 클라이언트 버전에 따라 노출하거나 숨겨야 할 때
이용할 수 있는 Hook 함수입니다.

```jsx
function YourComponent() {
  const isFeatureVisible = useTripleClientFeatureFlag({
    appName: 'Triple-iOS',
    appVersion: '5.10.0',
    operator: 'gt',
    availableOnPublic: true,
  })

  if (isFeatureVisible) {
    /* 기능을 지원하는 클라이언트 */
  } else {
    return null
  }
}
```
