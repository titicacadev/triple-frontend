- `ExtendedResourceListElement`에 `pricingNote` 추가

  _Eeyore_

- `Form` option 추가 및 style 변경

  ```
  1. onChange event 중첩 해결
  2. form field padding, margin option 제거
  3. confirmbox filltype option 추가
  ```

  _Olaf_

- `Pricing` 잘못된 base <--> sale 순서 바로잡음

  _Eeyore_

- `Form Field` margin, padding option 추가 및 error message absolute style 추가

  _Olaf_

- `Numeric Spinner` 추가

  _Olaf_

- `Form` 요소들 Change EvnetHandler 동작 방식 통일

  ```js
  onChange={(e) => onChange(e, e.target.value)}
  ```

  _Olaf_

- `Button`에서 `ButtonIcon`에 `size` props 추가

  _Torres_

- `PoiListElement`에서 `prices`와 `starRating` 처리 (호텔 관련 필드)

  _Royd_

- `Forms` 컴포넌트 추가

  ```
  1. Input
  2. Checkbox (ConfirmSelector)
  3. Selectbox (GenderSelector)
  4. Textarea
  ```

  _Olaf_

- `DatePicker` Style 변경

  ```
  1. selcted class size 변경 40px -> 32px
  2. 평일 주말 color 구분
  3. week header 를 top 고정이 아닌 달마다 보이도록 변경
  4. range picker 의 경우 nights (end - start) value 를 넘겨주도록 추가
  5. table border spacing 추가
  ```

  _Olaf_

- `Table` 컴포넌트 추가

  ```
  <Table type="horizontal"}
  <Table type="vertical"}
  ```

  _Olaf_

- `ActionSheet.Item` 에 `checked` 상태 추가

  _Eeyore_

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

  _Eeyore_

- `Tabs` 컴포넌트 추가

  _Eeyore_

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
