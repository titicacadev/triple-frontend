## 0.4.7 (2019-07-02)

- `ScrapsProvider`에 초기 scraps 정보를 받는 `scraps` prop 추가.

  _Royd_

## 0.4.6 (2019-06-11)

- 이미지 조회 API 실패했을 때 unhandled exception 방지

  _Eeyore_

## 0.4.5 (2019-06-10)

- `ScrapsContext`에서 `useScrapsContext`로 제공하는 value에서 `scrapActions`로 묶여있던 함수들를 `scrapActions` 없이 펼쳐서 보내도록 수정

  _Royd_

## 0.4.4 (2019-06-07)

- url 쿼리스트링을 핸들링하는 라이브러리를 `query-string`에서 `qs`로 교체

  _Luffy_

## 0.4.2 (2019-05-24)

- `HistoryContext`에서 제공하는 `back` 함수를 `back()`으로 변경 (`useRouter` 옵션 제거)

  _Royd_

## 0.4.1 (2019-05-20)

- `HistoryContext`에서 제공하는 `uriHash` 기본값 버그 수정

  _Eeyore_

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
