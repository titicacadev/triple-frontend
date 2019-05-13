## 0.3.1 (2019-05-13)

- `HistoryContext`에서 제공하는 함수 `replace`, `push`, `back`에 browser history를 조작할 수 있게 하는 파라미터 추가.

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
