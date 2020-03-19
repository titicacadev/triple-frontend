## 1.11.0 (2020-03-19)

- `poi-list-element` 하위호환을 위해 prices 를 추가 (#577)
- `react-contexts` useIsomorphicNavigation 을 제공 (#576)
- `image` story 추가 (#573)
- `core-element` ImageSource 타입 정의 개선 (#572)
- `poi-list-element` priceLabelOverride 추가 (#571)
- `footer`1:1 문의 버튼 표시 여부 제어 가능하도록 props 추가 (#570)
- ScrapButtom prop 타입 간단하게 수정하고, list element의 prop에 제네릭 사용 (#569)
  - `triple-document`, `scrap-button`, `poi-list-element`, `product-list-element`
- `pricing` 사용자 메세지 추가 (#565)
- `footer` 신규 Footer를 추가합니다. (#562)

## 1.10.1 (2020-03-13)

- `navbar` Navbar icon에 햄버거 추가 (#563)
- `poi-list-elements` label 위치 변경에 따른 스크랩 버튼 포지션 수정 (#561)
- `core-elements` gapless-block형태일 때 이미지 컨테이너 공백을 제거합니다 (#560)
- `common` Optional chaining과 Nullish coalescing을 사용할 수 있게 설정 (#559)

## 1.10.0 (2020-03-12)

- `style-box` 타입을 수정합니다 (#557)
- `review` writeReview interface를 변경합니다 (#555)
- `core-elements` ButtonGroup 컴포넌트에 buttonCount prop을 추가합니다 (#554)
- `triple-document` Image, Video에 display 타입으로 margin이 없는 block 형태를 추가합니다 (#553)
- `resource-list-element` label 위치를 변경합니다 (#551)
- `common` lint-staged를 업데이트 합니다 (#549)
- `core-elements` Image, Video 컴포넌트의 프레임 타입에 original 추가 및 분기 처리 (#547)

## 1.9.1 (2020-03-09)

- `format-number` revert code (#545)

## 1.9.0 (2020-03-05)

- `style-box` 스타일 박스 요소를 추가합니다 (#529, #538)
- `common` 9:5 frame size 를 추가합니다. (#522)
- `core-elements` 새로운 라디오 디자인 구현 (#527)
- `core-elements` Video 컴포넌트에 poster prop을 추가하고, playsInline 속성을 지정합니다. (#515)
- `core-elements` List 컴포넌트에 dividerWeight prop을 추가합니다. (#514 #518)
  - verticalGap 과 divider 의 내부 구현방식을 개선합니다.
- `booking-completion` ✨ optional 이벤트 추가 (#537)
- `booking-completion` 🏷 메인으로 가기 label 변경. (#528)
- `poi-carousel-element` PoiCarouselElement 의 imageFrame 을 조절할 수 있도록 추가합니다. (#516)
- `react-contexts` myReviews optional 처리 (#540)
- `review` 수정/삭제 시트 열 때 생기는 오류를 수정합니다. (#521)

- `dev` lint 에 어긋나는 부분을 수정합니다 (#542)
- `dev` 💪eslint-config-triple의 버전을 1.0.0 으로 올립니다. (#533)
- `dev` CI, CD 결과 Slack 노티파이를 개선합니다 (#523, #524, #534)
- `dev` dev 환경 URL을 참조하는 asset path를 수정합니다. (#517)
- `dev` 스토리북을 타입스크립트 환경으로 변경합니다. (#519)

## 1.8.0 (2020-02-25)

- `common` lint-staged 출력을 제거합니다. (#500)
- `core-elements` 미디어 비율을 추가하고, 비율 값을 key로 가지는 frame 옵션을 추가합니다. (#512)
- `core-elements` CarouselSizes를 추가하고, 그 값에 따른 크기를 정의합니다. (#508)
- `core-elements` Video 컨트롤을 추가합니다. (#503)
- `core-elements` Container에 display, scroll 관련 prop을 추가합니다. (#501)
- `booking-completion` 도시 메인으로 가는 버튼을 추가합니다. (#506)
- `footer` 항공 문의 메시지를 추가합니다 (#499)
- `poi-list-element` PoiCarouselElement가 부가 정보를 노출 할 수 있도록 prop을 추가합니다. (#509)
- `poi-list-element` PoiCarouselElement가 커스텀 텍스트를 사용할 수 있도록 prop을 추가합니다. (#498)
- `poi-list-element` 스크랩 관련 prop이 없으면 스크랩 버튼을 비활성화하는 조건을 추가합니다. (#495)
- `review` 리뷰 컴포넌트 더보기의 노출 조건을 변경합니다. (#510)
- `triple-document` Video를 지원합니다. (#361)
- `triple-frontend-docs` 스토리를 패키지별로 분류합니다. (#505)

## 1.7.1 (2020-02-20)

- `core-elements` SearchNavBar 컴포넌트에서 누락된 `onKeyUp` props를 추가합니다. #492
- `search` onDelete 핸들러에 방금 삭제한 키워드를 전달합니다. #494 #490
- `search` controlledKeyword 의 update 조건 개선 (빈문자열 허용) #496

## 1.7.0 (2020-02-17)

- `core-elements` Navbar 의 background-color 지정시의 css 오류를 수정합니다. #481
- `core-elements`, `Search` 에서 SearchNavbar Input 에 inputRef prop 을 추가합니다. #485 #482
- `pricing` pricingUnit prop 을 추가합니다. #486
- bootstrap 후에는 package-lock.json 이 생성되지 않도록 합니다. #480

## 1.6.2 (2020-02-12)

- `modals` children type 변경 (string -> ReactNode) #478

## 1.6.1 (2020-02-12)

- `search` onBackClick props 추가 #476
- `search` keyword prop 입력 후 텍스 변경 불가능 오류 수정 #475
- `booking-completion` 스타일 수정 #474

## 1.6.0 (2020-02-10)

- `slider` 패키지 추가 #469 #464
- `booking-completion` 제목을 옵셔널하게 받을 수 있도록 수정 #466
- `booking-completion` docs에 패키지 추가 #463
- `date-picker` 오늘 + 주말 + 비활성화된 날짜를 회색으로 표시 #467

## 1.5.0 (2020-02-06)

- `search` 안드로이드 환경에서 팝업에 있을 경우 상단 navbar가 고정되지 않는 문제 수정 #454
- `core-elements` 잘못된 color type 수정 #455
- `pricing` FixedPricing 컴포넌트 내부 버튼 비활성화 기능 추가 #457
- `common` tsconfig 공통옵션 추출 #458
- `booking-completion` 예약완료 패키지 추가 #439
- `core-elements` drawer-button 패키지 추가 #445
- `triple-document` triple-document에 tsc strict 옵션 설정 #442
- `popup` popup에 -webkit-scrollbar 속성 추가 #446

## 1.4.2 (2020-02-03)

- `poi-list-elements` areas 타입을 수정합니다

## 1.4.1 (2020-02-03)

- `poi-list-elements` categories 타입을 수정합니다

## 1.4.0 (2020-01-30)

- `list` hr1 의 구분선 색상을 변경할 수 있도록 prop을 추가합니다

## 1.3.8 (2020-01-29)

- color palette 추가 (#429)
- `accordon`의 `Content`와 `Floded` 리턴 방식 변경 (#432)
- `input` `textarea` props 수정 (#433)
- `styleLint` 추가 (#434)

## 1.3.7 (2020-01-22)

- `intersection-observer` safe prop 추가
- `react-contexts` 패키지에 tsc strict 옵션 설정
- `*-list-element` 패키지들에 ts strict 옵션 설정
- `resource-list-element` 이미지와 가격 간격을 좁힙니다
- `review` 잘못 할당한 ga event 를 수정합니다.
- `popup` open일 경우 scroll를 reset시켜줍니다.
- `core-elements` feat: 규격화 폰트사이즈 적용
- `core-elements` tab 글자를 bold 처리 합니다
- `theme` 테마를 제공합니다
- `navbar` backgroundColor prop를 추가합니다.
- `pricing` fixed label 의 기본 색상을 변경합니다

## 1.3.6 (2020-01-16)

- `input` 잘못된 type 을 수정합니다. (#415)
- `pricing` rich 의 custom label 스타일을 수정합니다. (#414)
- `margin, padding mixins` 0 의 경우도 받아들일 수 있도록 변경합니다` (#413)

## 1.3.5 (2020-01-15)

## 1.3.4 (2020-01-15)

- dev 스크립트 실행시 변경된 파일이 속한 패키지만 다시 빌드하는 스크립트 작성 (#390)
- modals 패키지에 ts strict 옵션을 추가합니다 (#393)
- react-hooks 패키지에 ts strict 옵션을 추가합니다 (#398)
- image-carousel 패키지에 ts strict 옵션을 추가합니다 (#404)
- search 패키지에 ts strict 옵션을 추가합니다 (#403)
- public-header 패키지에 strict 옵션을 추가합니다 (#405)
- search 컴포넌트를 controlled input처럼 사용할 수 있는 옵션을 추가합니다 (#383)
- pricing 의 label, description 의 타입을 확장합니다 (#407)
- core-ements/numeric-spinner 에 className props 이 확장되도록 설정합니다. (#394)
- action-sheet 에 className props 이 확장되도록 설정합니다. (#396)
- ExtendedResourceListElement 에서 pricing 의 description 을 활용 할 수 있도록 추가합니다 (#410)

## 1.3.3 (2020-01-08)

- git hook에서 lint-staged 가 제대로 수행되지 않는 버그를 수정
- git hook에서 prettier 삭제
- `core-elements`
  - scrap-button 패키지 제거
  - Button 컴포넌트에 as prop 추가
  - margin, padding 스타일을 지정하는 mixin 추가 (#381)
  - core-elements 패키지에 ts strict 설정을 추가합니다 (#377)
- `pricing` pricing 패키지에 ts strict 설정을 추가합니다 (#386)

## 1.3.2 (2020-01-02)

- `Popup`의 navbar를 생략할 수 있는 `noNavbar` props 제공
- `ad-banners` 배너 목록 조회, 노출/클릭 이벤트 핸들러를 prop으로 넣을 수 있는 기능 추가 (#353)

## 1.3.1 (2019-12-27)

- `Alert` confirmText type 변경, 불필요한 prop 제거

## 1.3.0 (2019-12-23)

- `form` type 재정의
- `styled-components` V4 로 version up

## 1.2.9 (2019-12-18)

- `listing-filter` FilterEntryBase에 disabled prop 추가
- `core-elements` SearchNavbar에서 InputMask 사용하지 않도록 처리, prop 형식 변경

## 1.2.8 (2019-12-12)

- `Image Context` fetch 시 넘겨주는 callback 에 대한 예외처리 추가

## 1.2.7 (2019-12-11)

- `popup` 네비바 버튼의 아이콘을 선택하는 icon prop 추가

## 1.2.6 (2019-12-10)

- `Tooltip` 컬러 추가

## 1.2.5 (2019-12-10)

- `Tooltip` onClick event 추가

## 1.2.4 (2019-12-10)

- `ExtendedResourceListElement` baseprice 에 관계없이 pricingNote 을 노출 할 수 있도록 변경

## 1.2.3 (2019-12-10)

- `pricing` baseprice, pricingNote 에 따라 스타일 수정
- `ExtendedResourceListElement` baseprice 에 따른 pricingNote 노출 조건 추가

## 1.2.2 (2019-12-10)

- `review` 컴포넌트에 ga/fa 지표 관련 코드 추가

## 1.2.1 (2019-12-06)

- `image-carousel`과 `ad-banners` 에서 의존하고 있는 `@egjs/flicking`, `@egjs/react-flicking` 의 버전을 고정합니다.
  - `@egjs/flicking@3.4.0`
  - `@egjs/reac-flicking@3.1.0`

## 1.2.0 (2019-12-05)

- `Pricing` 호텔의 할인률이 0 보다 아래인 경우 할인률을 노출하지 않습니다.
- GitHub Actions로 CI 작업을 전환합니다.
- app-installation-cta: 인벤토리 조회 기능을 포함한 BannerCTA 컴포넌트 구현합니다.
- `Navbar` 목록 아이콘을 추가합니다.
- tooltip 스타일을 세부 조정할 수 있는 prop을 추가합니다.
- storybook 버젼을 v5.2 로 올립니다.
- history-context push, router, back 등의 hash routing 함수가 Promise를 반환합니다.
- review placeholderText prop을 추가합니다.
- dev Canary release 테스팅: 누락된 tsconfig.json 파일을 추가합니다.
- `core-elements` 의 carousel/CarouselBase 에 `overflow-y: hidden` 속성을 추가합니다.
- author-intro 의 line-height 지정 버그를 수정합니다.

## 1.1.0 (2019-11-28)

- `cloudbuild.release.yaml`에 timeout을 추가합니다.
- Pricing component 의 스타일을 수정합니다.
- 리뷰의 앱링크를 업데이트 합니다.
- `initialHashStrategy` 에 따라 초기 uriHash 를 사용 방법을 결정합니다.
- floating-install-button의 노출 여부와 형태와 관련한 조건을 변경합니다.
- transition-modal의 view type string 메시지를 변경합니다.
- `UserAgentContext`에서 mobile 여부를 제공합니다.

## 1.0.0 (2019-11-21)

- `triple-document` 패키지에서 텍스트 요소(`Paragraph`, `H1`, `H2`, ...)를
  인터페이스로 노출합니다.
- `MyReviewsProvider`의 props 중 `type`을 `resourceType`으로 변경합니다.
- `ReviewLikesContext`가 노출하는 인터페이스를 다음과 같이 변경합니다:
  ```
  interface ReviewLikesContextProps {
    deriveCurrentStateAndCount: (currentState: {
      reviewId: any
      liked: boolean
      likesCount: number
    }) => { liked: boolean; likesCount: number }
    updateLikedStatus: (newLikes: { [reviewId: string]: boolean }) => void
  }
  ```
- `ReviewLikesContext`의 위치를 `@titicaca/review` 패키지로 옮깁니다.
