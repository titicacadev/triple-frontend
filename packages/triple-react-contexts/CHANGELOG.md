## 0.4.0 (2019-05-16)

- `HistoryContext`에서 `useHistoryContext`로 제공하는 value를 `{ uriHash, actions: { push, replace, back, navigate } }`에서 `{ uriHash, push, replace, back, navigate }`으로 변경

  _Royd_

## 0.3.2 (2019-05-13)

- `HistoryContext`에서 제공하는 `replace` 함수를 `replace(hash: string, options: { useRouter: boolean })`으로 변경
- `HistoryContext`에서 제공하는 `push` 함수를 `push(hash: string, options: { useRouter: boolean })`으로 변경
- `HistoryContext`에서 제공하는 `back` 함수를 `back(options: { useRouter: boolean })`으로 변경

  _Royd_

## 0.3.1 (2019-05-13)

- `HistoryContext`에서 제공하는 `replace` 함수를 `replace(hash: string, useRouter: boolean)`으로 변경
- `HistoryContext`에서 제공하는 `push` 함수를 `push(hash: string, useRouter: boolean)`으로 변경
- `HistoryContext`에서 제공하는 `back` 함수를 `back(useRouter: boolean)`으로 변경

  _Royd_

## 0.3.0 (2019-05-03)

- `ImagesContext`에서 multiple resource 처리 로직 제거. (버전 0.2.0 롤백)

  - `ImagesContext`가 제공하는 `values`에 `resourceId`, `resourceType` 제거
  - `ImagesContext`가 제공하는 `fetch` 함수를 `fetch({ id: string, type: string }, cb: function)`에서 `fetch(cb: function)`으로 롤백.

  _Royd_

## 0.2.0 (2019-05-02)

- `ImagesContext`에서 multiple resource 처리.

  - `ImagesContext`가 제공하는 `values`에 `resourceId`, `resourceType` 추가
  - `ImagesContext`가 제공하는 `fetch` 함수를 `fetch(cb: function)`에서 `fetch({ id: string, type: string }, cb: function)`으로 변경

  _Royd_
