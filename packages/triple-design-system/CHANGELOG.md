## 0.2.8 (2019-04-03)

- `ListingFilter` 컴포넌트 개편

  ```
  <ListingFilter.PrimaryFilterEntry>
    5.17-5.20, 3명
  </ListingFilter.PrimaryFilterEntry>
  <ListingFilter.ExpandingFilterEntry>
    침대타입
  </ListingFilter.ExpandingFilterEntry>
  <ListingFilter.FilterEntry>
    무료취소
  </ListingFilter.FilterEntry>
  <ListingFilter.FilterEntry withIcon active>
    음식점
  </ListingFilter.FilterEntry>
  ```

- `Tabs` 컴포넌트 추가

- `Section` 컴포넌트에 default prop 추가

  ```
    minWidth = 320,
    maxWidth = 760,
    padding = { left: 30, right: 30 },
  ```

  _Royd_

- basic 타입의 `Button` 간소화

  `borderRadius`, `fontSize` prop 삭제

  `inverted`, `compact` prop 지원

  ```
  <button basic compact inverted color="blue">버튼</Button>
  ```

  _Royd_

- `TripleDocument` Image 목록 컴포넌트에서 캡션 유무에 따른 마진 분기

  _Eeyore_

- `Text` 컴포넌트에 number 타입의 `size` prop 지원

  _Royd_

- `Text` 컴포넌트의 `size` prop 에서 `"larger"` 삭제

  _Royd_

- `Spinner` 추가

  _Olaf_

- promo 타입의 `Label` 컴포넌트 추가

  ```
  <Label promo emphasized size="medium" color="purple">최대 24%</Label>
  <Label promo size="small" color="red">지정일 사용</Label>
  ```

  _Royd_

- 스토리보드에 jsx 애드온 추가

  _Olaf_

- `TripleDocument` 본문 컴포넌트의 alpha 값 `0.8`에서 `0.9`로 수정

  _Torres_

- `TripleDocument` Image 목록 컴포넌트에 `"block"` display 지원

  _Torres_
