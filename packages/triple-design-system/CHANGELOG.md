## 0.4.8 (2019-06-14)
- global color, size를 별도로 관리
- csstype 패키지 추가
- `Container`를 ts로 변환

  _jayg_

## 0.4.7 (2019-06-12)
- `AppBanner` 에 `maxWidth` props 추가

  _Torres_

- `PublicHeader`에 `minWidth` props 추가

  _Torres_

- `navbar`, `text` 를 ts로 변환

  _jayg_

## 0.4.6 (2019-06-12)
- typescript declaration 생성 및 빌드 과정에 포함
- `hr`를 ts로 변환

  _jayg_

## 0.4.5 (2019-06-11)
- typescript 지원을 위하여 webpack, babel 설정 변경

  _jayg_

## 0.4.4 (2019-06-04)

- `form-field` export 방식 변경

  _Olaf_

## 0.4.3 (2019-06-04)

- `form-field` hoc 를 외부로 내보내도록 변경

  _Olaf_

## 0.4.2 (2019-06-03)

- `ExtendedResourceListElement` text name 한 줄 말줄임에서 두 줄 말줄임으로 변경

  _Olaf_

## 0.4.1 (2019-05-27)

- `poi` Promotion tag condition 조건 변경

  _Olaf_

## 0.4.0 (2019-05-27)

- `Pricing` floated container 를 % 로 나두도록 조절

  _Olaf_

- `Button` padding large size 추가

  _Olaf_

- `Textarea` reset style 추가

  _Olaf_

- `Pricing` IphoneX 대응 css 추가

  _Olaf_

- `Icon` 에 margin, padding option 을 추가합니다.

  _Olaf_

- `input` 의 reset css 를 추가합니다.

  _Olaf_

- `poi element` 의 tag 를 노출 할 수 있도록 변경

  _Olaf_

- `block` 타입의 `links`의 margin-top 을 45px 에서 30px 로 변경

  _Royd_

- `Date Picker` border-collapse 추가

  _Olaf_

- `Poi List` tags props 와 default tags 추가

  _Olaf_

- `TripleDocument`내의 links 요소의 스타일에서 `padding` 대신에 `margin` 사용

  _Royd_

- `Global-style` 의 b, strong 에 bold 추가

  _Royd_

- `Form` message 부분 2 줄시 style 깨지는 문제 해결

  _Olaf_

- `Confirm Box` 의 centered option 시 padding 제거

  _Olaf_

- `RangeDatePicker` isBlocked function 에 memoize 적용

  _Olaf_

- `RangeDatePicker` onChange Event 이름 변경 및 두 날짜 모두 선택된 후 날짜 선택시 date 가 reset 되도록 변경

  _Olaf_

- global-style 에 font-family 적용 및 각 element 에서 font-family 스타일 제거

  _Royd_

- `Text.Title` line-height 값을 1.2 로 설정

  _Royd_

- `ExtendedResourceListElement`의 `pricingNote` 값을 '세금 포함'으로 변경

  _Eeyore_

- `TripleDocument` 의 `Images` 에서 `onLinkClick` 지원

  _Torres_

- `Note` 의 `margin` 값 조정

  _Torres_

- `Label`에 `margin` prop 추가

  _Royd_

- `ListingFilter` line-height 디폴트 값을 1.2 로 설정

  _Royd_

- `Container` min Height , max Height option 추가

  _Olaf_

- `ListingFilter` iOS 모바일에서 터치 스크롤 이슈 해결 [#465](https://github.com/titicacadev/triple-design-system/pull/465)

  _Royd_

## 0.3.1 (2019-04-24)

- `Modal` Alert Modal 추가

  _Olaf_

- `Text` line-height 디폴트 값을 1.2 로 설정

  _Royd_

- `Rating` 에 `onClick` 추가

  _Torres_

- `text` red color 추가

  _Olaf_

- global-style 에 `select` 태그를 위한 reset 스타일 추가

  _Royd_

- `ActionSheet` 최대 높이 수정

  _Eeyore_

- `Drawer` 요소 추가

  _Eeyore_

## 0.3.0 (2019-04-11)

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
