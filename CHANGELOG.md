# 1.33.0 (2020-08-26)

### common

- UI 요소의 등장, 퇴장 애니메이션을 정비하고; 퇴장 상태에서 UI를 가립니다. (#932)

### publich-header

- `mobileViewHeight`, `borderless` 속성 추가합니다. (#931)

### react-contexts

- history-context를 둘로 나눕니다. (#930)

### poi-list-elements

- poi-card-element에 priceLabelOverride를 추가합니다. (#925)

# 1.32.0 (2020-08-20)

### triple-document

- gapless-block의 경우 컨테이너의 상하단 마진을 삭제합니다. (#918)

### review

- 유저 포인트가 있을 때에만 UI를 노출합니다. (#919)

### standard-action-handler

- 타이핑을 개선합니다. (#922)

### content-sharing

- Asset 이미지를 HTTPS 프로토콜로 fetch합니다. (#920)

# 1.31.0 (2020-08-13)

### core-elements

- navbar를 확장에 유연하도록 변경합니다 (#911)

### standard-action-handler

- 신규 패키지를 추가합니다 (#910)

# 1.30.2 (2020-08-11)

### common

- csstype 3으로 업그레이드 (#913, #914)

### app-installation-cta

- 앱설치 배너 제목을 입력할 수 있는 기능 추가 (#915)

# 1.30.1 (2020-08-03)

### core-elements

- label 색상에 orange 를 추가합니다. (#906)

# 1.30.0 (2020-07-30)

### common

- release-docs 를 GHA workflow 로 옮깁니다. (#888)
- release-docs workflow 에서 Dockerfile 오타 수정 (#889)
- release-docs Standalone build/release 를 가능하게 합니다. (#894)
- release-docs 이미지 빌드시 NPM_TOKEN 변수를 대문자로 넘깁니다. (#890)
- release-docs Github Package Registry 에도 이미지를 push 해둡니다. (#903)
- i18n/lib/provider를 resolve 하지 못하는 문제 수정 (#893)

### triple-document

- TripleElementData interface를 export합니다 (#892)
- display="block" 형식의 links element가 level을 가지도록 합니다. (#896)

### core-elements

- 롤링 스피너 무한히 반복될 수 있도록 수정 (#895)

### modals

- useTransitionModal에 memo 적용 (#897)

### pricing

- fixed pricing 에 max-width prop 을 추가합니다 (#902)

# 1.29.0 (2020-07-22)

### core-elements

- pointing Tabs에 스크롤 prop을 추가합니다. (#873)

### hub-form

- CTA 버튼의 배경색을 변경합니다. (#855)

### react-contexts

- asyncBack과 historyContext의 back 타입을 조정합니다 (#879)

### common

- eslint rule을 타입스크립트로 변경합니다. (#878)

# 1.28.1 (2020-07-16)

### app-installation-cta

- Chatbot CTA 가 inventory item 이 없을때 콘텐츠가 비어있는 상태로 뜨는 문제를 수정합니다. (#877)

# 1.28.0 (2020-07-15)

### app-installation-cta

- 각 CTA 에서 모두 지표 트래킹을 가능하게합니다. (#872)

### core-elements

- Radio컴포넌트의 텍스트 `text-align` 을 left로 고정합니다. (#871)

# 1.27.1 (2020-07-09)

### hub-form

- HubForm의 box-shadow 스타일을 커스터마이징할 수 있도록 합니다. (#866)

### core-elements

- feature: skeleton ui 를 추가합니다. (#835)
- Radio 컴포넌트에 multiline, textAlign, outline props를 추가합니다. (#863)
- rolling-spinner 에 FALLBACK_ACTION_CLASS_NAME class 를 추가합니다. (#864)
- skeleton ui 를 추가합니다. (#865)

### i18n

- Locale asset의 로딩을 방지합니다. (#858)

### poi-detail

- hr 구분선을 제거 할 수 있는 prop 을 추가합니다. (#859)

### app-installation-cta

- 챗봇 스타일 CTA 를 추가합니다. (#857)

### ETC

- useScrollToAnchorHook 설명 문서를 추가합니다. (#861)
- docs 파일이 prettier로 포매팅할 수 있도록 수정 및 md, yaml도 prettier로 검사 (#867)
- test 패키지 및 관련 코드 제거 (#848)

# 1.26.0 (2020-07-01)

### color-palette

- `blue60`을 추가합니다. (#838)

### listing-filter

- underline filter entry를 추가합니다. (#845)
- line-height를 px단위로 고정합니다. (#841)

### core-elements

- rolling-spinner 컴포넌트를 추가합니다. (#823)
- Spinner에 fallback class를 추가합니다. (#837)
- Navbar의 TitleContainer 영역을 확장합니다. (#839)

### date-picker

- RangePicker에서 오늘 날짜가 속한 달을 가장 처음 표시하도록 수정합니다. (#842)

### hub-form

- 패키지를 추가합니다. (#840)

### slider

- min, max값을 step의 배수로 보정하는 기능을 추가합니다. (#844)

### poi-list-elements

- 가격 노출 여부를 결정하는 prop을 추가합니다. (#828)

# 1.25.0 (2020-06-24)

### common

- clean 태스크에서 .tsbulidinfo 파일을 삭제합니다. (#812)

### app-installation-cta

- 이미지 배너의 앱설치 버튼 레이블 변경 (#825, #826)

### core-elements

- Carousel 의 Item 에 IntersectionObserver 를 내장시킵니다. (#822)
- Container 에서 width, height 의 unit, bg color 를 지원하는 prop 을 추가합니다. (#824)

### date-picker

- react-date-picker 의 style override 코드 리펙토링 (#625, #804)

### user-verification

- 휴대전화번호 점유인증 테스트 과정에서 발견한 수정 사항들을 반영합니다. (#829)
  - 워딩과 일부 디자인 요소의 svg를 수정합니다.
  - Verification context의 기본값을 지정합니다.
  - VerificationRequest에서 forceVerification을 false로 변경할 수 있도록 합니다.

# 1.24.0 (2020-06-18)

### common

- root, docs, tests의 패키지 업데이트 (#797)
- CHANGELOG 1.22.0 배포 날짜를 수정합니다 (#789)
- Declarations 빌드 시 incremental flag 사용 (#726)

### core-elements

- Navbar.Item 의 icon 에 따라 기본 className 을 추가 (#805)
- FlexBox 를 추가합니다. (#790)

### user-verification

- 패키지를 추가했습니다. (#786)
- react-contexts를 devDeps, peerDeps 로 이동했습니다. (#815)

### reviews

- regionId를 옵셔녈하게 변경 (#813)

### form

- checkbox, radio 에 label 을 추가합니다 (#803)

### type-definitions

- ListingHotel.source.priceInfo optional 처리 (#796)

### docs

- eslint-mdx 플러그인을 추가합니다. (#814)
- storybook 파일 형식을 최신 방식으로 변경합니다. (#798)

# 1.23.0 (2020-06-04)

- `react-contexts` device context에 state 추가 #787device context에 state 추가 (#787)
- `common` Config: lint 설정을 개선합니다. (#783)

# 1.22.0 (2020-06-02)

- `react-contexts` ImageContext에서 hotel 타입의 경우에는 poi 타입으로 변경하지 않습니다. (#775)
- `search` enter 시 input blur 처리하도록 액션을 추가합니다. (#776)
- `core-elements`, `action-sheet` Navbar 컴포넌트와 ActionSheet.Item 컴포넌트에 message, support 아이콘을 추가합니다. (#771)
- `poi-detail` Actions 컴포넌트에 margin, padding타입을 추가합니다. (#773)
- `common`
  - Navbar, Footer, AppBanner, PublicHeader의 tag를 시멘틱한 tag로 수정합니다. (#778)
  - typescript(3.9,x), styled-component(5.x)를 최신버전으로 올립니다. (#780)

# 1.21.0 (2020-05-21)

- `core-elements` Text 요소에서 textAlign props 를 제공합니다. (#346) (#765)
- `resource-poi-element` partnerName을 추가합니다. (#766)
- `triple-document` 에서 embedded 컴포넌트를 별도의 파일로 분리합니다. (#759)
- `common`
  - cd worlflow 에서 tagging 시 v prefix 가 누락되는 버그를 수정합니다. (#768)
  - canary publish 시 전달이 누락된 GITHUB_TOKEN 을 추가합니다. (#764)
  - cd workflow 내 notifier 전달 파라미터 오타 수정 (#761)

# 1.20.0 (2020-05-14)

- `triple-document`
  - `imageSourceComponent`를 optional 처리합니다. (#754)
  - 임베딩에서 텍스트, 이미지 순서로 표시하는 경우를 대응합니다. (#753)
- `common`
  - npx @titicaca/gha-tools 로 notify 와 pr 정보를 처리합니다. (#757)
  - Canary Version 을 추론하여 notifier 에 알려줍니다. (#752)
- `docs` jsx 애드온을 제거합니다. (#755)
- `review` 이미지가 있을 때와 없을 때 리뷰 최대 라인을 분기 처리합니다. (#758)
- `type-definitions` ListingHotel 의 TRIPLECLUB뱃지 타입을 string 으로 변경합니다. (#750)
- `core-elements` Select에서 disabled 를 받습니다. (#748)

# 1.19.1 (2020-05-11)

- `view-utilies` type-definition 모듈 의존성 devDep -> dev 으로 변경합니다.

# 1.19.0 (2020-05-07)

- `color-palette` (#717)
  - 개별 color 를 export 하고, ColorSet export 방식을 변경합니다.
  - getColor 에서 ColorSet 이 아닌 color 입력시 폴백을 제공합니다.
- `core-elements` Text 의 strokeThrough color 또는 alpha 가 잘못표시되는 문제를 수정합니다.(#717)
- `view-utilities` PointGeo 간 직선거리를 구하는 함수를 공통함수로 분리합니다. (#742)
- `poi-detail` RecommendedArticles 컴포넌트를 추가합니다. (#722)
- `poi-list-element` notes prop 을 추가하여 note 값을 제어합니다. (#741)
- `color`
  - emerald 색상을 변경합니다. (#740)
  - getColor 의 alpha 소수점을 2 자리까지 허용합니다. (#721)
  - 개별 color 를 export 합니다. (#717)
- `triple-document` T&A slot element의 구현을 content-web과 맞춥니다. (#736)
- `react-hook`
  - 자주 사용되는 hook 을 TF 로 이동합니다. (#718)
  - use-scroll-lock 을 추가합니다. (#699)
- `direction-finder` 국내 전화번호이면 국제전화 요금 안내를 보여주지 않을 수 있도록 합니다. (#735)
- `nearby-pois` 더 많은 장소 보기 버튼 바로 위에 보이는 구분선을 제거해야 합니다. (#734)
- `poi-card-lement` POICardElement를 추가합니다. (#725)
- `poi-carousel-element` PoiCarouselElement의 타입 제약 조건 완화. (#709)
- `type-definitions` originalPrice 에 대한 타입이 누락되어있어 추가합니다. (#731)
- `common`
  - Storybook webpack에 watchOptions를 추가합니다. (#727)
  - File watch handler에 debounce를 적용합니다. (#724)
  - qs.parse의 리턴 타입 달라진 버전 대응 (#728)
- `review` 리뷰 하단 UI가 깨지는 케이스를 수정합니다. (#719)

# 1.18.0 (2020-04-27)

- `color-palette` ColorSet 의 값이 `rgba()` 로 감싸지게 만들고, getColor 에서 `rgba()` 를 제거하여 반환하도록 합니다. (#685)
- `colre-elements` Card 컴포넌트를 추가합니다. (#681)
- `review` 디자인을 개선합니다. (#694)
- `poi-detail` 패키지를 추가합니다. (#691)
- `social-reviews` 목록이 비어있을 때 섹션을 감춥니다. (#697)
- `core-elements` Image 컴포넌트를 분리합니다. (#695)
- `core-elements` / `poi-list-elements` / `resource-list-element` 광고 라벨을 추가합니다. (#696)
- `type-definitions` POI의 image 속성을 optional로 처리합니다. (#702)
- `docs` Form 패키지 디펜던시를 추가합니다. (#703)
- `nearby-pois` 맛집 hasMore 정보가 제대로 반영되지 않던 문제를 수정합니다. (#705)
- `location-properties` isPublic일 때 long click을 막습니다. (#704)
- `review` writeReview시 photoFirst 인자를 추가합니다. (#707)
- `review` sorting option 레이블을 수정합니다. (#706)

# 1.17.2 (2020-04-22)

- `core-elements` tabs 와 select에 적용한 color 값 오류를 수정합니다. (#686)

# 1.17.1 (2020-04-20)

- `resource-list-element` (#677)
  - maxCommentLines props 을 추가하여 POI 설명 노출 라인 수 제어
  - basePriceUnit 을 추가합니다
- `scrap-button` 2배 아이콘을 3 배 아이콘으로 변경합니다 (#677)

# 1.17.0 (2020-04-20)

- `core-elements` List 하위 li에 적용되는 스타일은 direct children에만 영향이 있도록 합니다 (#673)
- StaticIntersectionObserver를 사용합니다 (#672)
- `social-reviews` Divider를 바로잡습니다 (#670)
- `resource-list-element` POI, 상품 리스트 엘리먼트를 li 외의 태그로 렌더링 가능하게 합니다 (#669)
- `color-palette` 체크리스트 v2에서 사용되는 컬러셋을 추가합니다 (#668)

# 1.16.1 (2020-04-17)

- `core-elements` List divider의 default style을 수정합니다 (#662)
- `common` PR canary release 시 올바른 커밋을 fetch합니다 (#663)
- `pricing` 잘못된 색상을 수정합니다 (#664)
- `modal`, `popup`, `action-sheet` user-select를 none으로 변경합니다 (#666)

# 1.16.0 (2020-04-16)

- `common` context HOC 타이핑 개선 (#649)
- `core-elements` 2배 이미지들을 3배 이미지로 변경합니다 (#657)
- `core-elements` small size label 의 r 값을 2로 변경합니다 (#654)
- `action-sheet` action sheet dimmed의 z-index 를 10으로 유지합니다 (#655)
- `search-navbar` input 의 스타일을 수정하여 꿈틀거림을 방지합니다 (#647)
- `directions-finder` 전화하기 클릭시 navigate 대신 window href 를 이용하도록 변경 (#645)
- `react-context` withUserAgent 함수 타이핑 개선 (#643)
- `react-context` history context 타이핑 개선 (#658)
- `search-web` input ref 를 내부에 추가합니다. 삭제시 focus 될 수 있도록 합니다 (#652)
- `pricing, poi, resource-list-element` isSoldOut Props 을 추가하여 판매완료 케이스를 대응합니다 (#650)

# 1.15.0 (2020-04-10)

- `location-properties` 패키지에 `onCopy` 핸들러 추가 (#641)

# 1.14.0 (2020-04-09)

- `StaticIntersectionObserver` 추가 (#627)
- `direction-finder` 전화번호가 없는 경우 전화하기 버튼 숨김 (#636)
- `search-navbar` 입력된 값에 따라 검색 버튼의 동작 변경 (#639)
- `color-palette` 패키지 추가 (#638)
- `search` 검색 버튼 추가 (#637)
- `context` ImagesContext에 type definitions 이용 (#633)

## 1.13.1 (2020-04-03)

- `dev` bootstrap할 때 ci 해제 (#628)
- `dev` Checkout시 branch name을 사용합니다. (#629)
- `date-picker` 토, 일요일이 선택 날짜 범위에 있을 때 정렬이 어긋나는 문제 수정 (#626)

## 1.13.0 (2020-04-02)

- `resource-list-element`, `poi-list-elements` 호텔 목록에서 distance 표시할 수 있도록 인터페이스 추가 및 수정 (#621)
- `type-definitions` 공용 타입 정의 패키지 추가 (#616)
- `common` Canary 릴리즈시 모든 패키지를 내보냅니다. (#619)
- `date-picker` RangePicker에 DateLabel 을 추가합니다 (#614)
- `triple-document` Optional props를 명시합니다. (#618)
- `i18n` Provider가 없을 때 반드시 fallback을 사용하도록 합니다. (#612)
- `core-elements` Radio 텍스트가 길 경우 말줄임표 추가 (#617)
- `dev` Canary release의 preid로 PR 번호 사용 (#622)

## 1.12.0 (2020-03-26)

- `core-elements` Pager 삭제 (#532)
- `common` triple-web-to-native-interfaces 버전 1.0.0로 업데이트 (#583)
- `i18n` 패키지 추가 (#580)
- `react-contexts` HistoryContext에 showTransitionModal 인터페이스 추가 (#586)
- `directions-finder` 패키지 추가 (#590)
- `static-map` 패키지 추가 (#592)
- `core-elements` Text에 ref를 지정할 수 있도록 수정 (#592)
- `core-elements` longClickable HoC를 추가 (#597)
- `resource-list-element` salePrice 가 0 원이더라도 priceLabelOverride 가 있다면 가격영역 노출 (#602)
- `social-reviews` 소셜 리뷰 패키지 추가 (#604)
- `location-properties` 패키지 추가 (#601)
- `react-contexts` native 인터페이스 사용할 수 없을 때 openWindow가 window.open 사용 (#600)
- `poi-list-elements` POI 타입에 regionId 추가 (#608)
- `date-picker` RangePicker에 sameFromTo 옵션 추가 (#609)
- `frontend-devtools` react-use-reducer-logger 추가 (#587)
- `nearby-pois` 근처의 추천 장소 컴포넌트 패키지 추가, `poi-list-elements`에 pointGeolocation props 추가 (#610)
- `core-elements` Section의 type annotation 확장, 중복 제거 (#607)

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
