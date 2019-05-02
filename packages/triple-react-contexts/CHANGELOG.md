## 0.2.0 (2019-05-02)

- `ImagesContext`에서 multiple resource 처리.
  - `ImagesContext`가 제공하는 `values`에 `resourceId`, `resourceType` 추가
  - `ImagesContext`가 제공하는 `fetch` 함수를 `fetch(cb: function)`에서 `fetch({ id: string, type: string }, cb: function)`으로 변경

  _Royd_
