# web-storage

[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)를 감싼 패키지.

## 목적

Web Storage API는 다양한 오류를 일으킬 수 있습니다.
하지만 이에 대한 대비는 없거나 완전하지 않았습니다.
Web Storage API에서 발생할 수 있는 오류를 명확히 정의하고 이를 처리하는 방법을 제공합니다.

## 제공하는 기능

### `WebStorage` 클래스

window의 `localStorage`, `sessionStorage` 대신 사용할 수 있는 클래스입니다.
파라미터로 storage의 종류를 받습니다. 기본값은 `localStorage`입니다.
Web Storage API와 거의 동일한 인터페이스를 제공합니다.
`length`를 속성으로 가지고 있고, `key`, `getItem`, `setItem`, `removeItem`, `clear` 메서드를 제공합니다.
단, 기존 storage와 달리 Index signature로 값에 접근하는 방식은 제공하지 않습니다.

```ts
const storage = new WebStorage()

const awesomeValue = storage.getItem('my-awesome-key') // O
storage.setItem('my-awesome-key', '42') // O

const awesomeValue = storage['my-awesome-key'] // X
storage['my-awesome-key'] = '42' // X
```

### `WebStorageErrorBoundary`

자식 컴포넌트 트리에서 Web Storage API 관련 오류가 발생하면 Alert를 표시하는 컴포넌트입니다. 다른 에러를 만났을 때는 그대로 throw 합니다.

`onConfirm` prop을 통해 Alert를 확인했을 때 행동을 정의해야 합니다.
