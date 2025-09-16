# CHANGELOG

## v14.1.6

```
### tds-widget

- [DMTALK-555] dismissKeyboardOnSend 옵션 추가 [#3747](https://github.com/titicacadev/triple-frontend/pull/3747)
```

## v14.1.5

```
### tds-widget

- [TPB-3385] InvitationInterface 에  validInvitation 필드 추가 [#3741](https://github.com/titicacadev/triple-frontend/pull/3741)
- [DMTALK-533] usePendingIntersections 추가 [#3742](https://github.com/titicacadev/triple-frontend/pull/3742)
- [DMTALK-505] 타입 업데이트 [#3743](https://github.com/titicacadev/triple-frontend/pull/3743)
```

## v14.1.4

```
### tds-widget

- [tds-widget] focus tracker에 disabled props를 추가합니다. [#3739](https://github.com/titicacadev/triple-frontend/pull/3739)
```

## v14.1.3

### tds-ui

- [tds-ui] 체크박스 사이즈 설정 prop을 추가합니다. [#3732](https://github.com/titicacadev/triple-frontend/pull/3732)
- [tds-ui, tds-widget] 컴포넌트에 color props 추가 [#3735](https://github.com/titicacadev/triple-frontend/pull/3735)

### tds-widget

- [DMTALK-472] 채팅 디자인 개선사항 반영 [#3734](https://github.com/titicacadev/triple-frontend/pull/3734)
- [tds-ui, tds-widget] 컴포넌트에 color props 추가 [#3735](https://github.com/titicacadev/triple-frontend/pull/3735)
- [DMTALK-487] Chat/nol-input-area-ui 디자인 수정사항 반영 [#3736](https://github.com/titicacadev/triple-frontend/pull/3736)
- [tds-widget] focus tracker에 autoZoomThreshold props 추가 [#3737](https://github.com/titicacadev/triple-frontend/pull/3737)

## v14.1.2

```
### tds-widget

- [DMTALK-217] welcomeMessage 전송시 UI 오류 수정 [#3688](https://github.com/titicacadev/triple-frontend/pull/3688)
- [DMTALK-249] 재문의 가능여부 타입 정의 [#3727](https://github.com/titicacadev/triple-frontend/pull/3727)
- [DMTALK-403] refactor: pusher data 타입 분리 [#3728](https://github.com/titicacadev/triple-frontend/pull/3728)
- fix: rebase 누락 적용 [#3730](https://github.com/titicacadev/triple-frontend/pull/3730)
```

## 14.1.1

```
### middlewares

- [middleware] next14용 미들웨어에 applySetCookie 적용 [#3717](https://github.com/titicacadev/triple-frontend/pull/3717)

### tds-widget

- [DMTALK-416] 채팅 > 디자인 개선 적용 [#3715](https://github.com/titicacadev/triple-frontend/pull/3715)
- [DMTALK-425] input resize observer 옵션 변경 [#3722](https://github.com/titicacadev/triple-frontend/pull/3722)
- [DMTALK-432] 쿠폰 메시지 디자인 변경 [#3723](https://github.com/titicacadev/triple-frontend/pull/3723)
- [DMTALK-422] 이벤트 로깅을 위한 onClick 핸들러 전달 [#3724](https://github.com/titicacadev/triple-frontend/pull/3724)
```

## 14.1.0

```
### tds-theme

- [tds-theme] vermilion 컬러를 찾지 못하는 오류 수정 [#3691](https://github.com/titicacadev/triple-frontend/pull/3691)

### tds-ui

- [tds-widget] react-day-picker의 props를 받을 수 있도록 추가 [#3689](https://github.com/titicacadev/triple-frontend/pull/3689)
- [tds-ui] 체크박스 체크 위치 수정 [#3692](https://github.com/titicacadev/triple-frontend/pull/3692)
- [tds-ui] popup에 id props를 추가합니다. [#3695](https://github.com/titicacadev/triple-frontend/pull/3695)
- [tds-ui] ActionSheetItem에 plus icon 추가 [#3712](https://github.com/titicacadev/triple-frontend/pull/3712)
- [tds-ui] carousel-item 추가 prop 받을 수 있도록 수정 [#3716](https://github.com/titicacadev/triple-frontend/pull/3716)

### tds-widget

- [tds-widget] react-day-picker의 props를 받을 수 있도록 추가 [#3689](https://github.com/titicacadev/triple-frontend/pull/3689)
- [DMTALK-165] chat 컴포넌트 커스텀 필드 추가, 스타일 및 타입 수정 [#3690](https://github.com/titicacadev/triple-frontend/pull/3690)
- [DMTALK-316] message payload 내 extra 노출 [#3698](https://github.com/titicacadev/triple-frontend/pull/3698)
- [DMTALK-317] interactionStatusSlot 추가 [#3699](https://github.com/titicacadev/triple-frontend/pull/3699)
- [DMTALK-234] scroll-bottom-buttons 리셋 로직 추가 [#3700](https://github.com/titicacadev/triple-frontend/pull/3700)
- [DMTALK-310] ChatChannelEvents 타입 정의 [#3701](https://github.com/titicacadev/triple-frontend/pull/3701)
- [DMTALK-304] 쿠폰 메시지 추가 [#3703](https://github.com/titicacadev/triple-frontend/pull/3703)
- chat > expired 컴포넌트 배경색 변경 [#3704](https://github.com/titicacadev/triple-frontend/pull/3704)
- [DMTALK-374] RICH 버블의 블록을 각각의 버블로 분리하는 옵션을 제공하고 버튼 버블을 추가합니다. [#3707](https://github.com/titicacadev/triple-frontend/pull/3707)
- [tds-widget] RangePicker에서 publicHoliday를 props로 받아올 수 있도록 수정합니다. [#3710](https://github.com/titicacadev/triple-frontend/pull/3710)
- [DMTALK-396] 프로필 이미지 object-fit 변경 [#3711](https://github.com/titicacadev/triple-frontend/pull/3711)
- [DMTALK-374] parent message로 스크롤 되지 않는 오류 수정 [#3718](https://github.com/titicacadev/triple-frontend/pull/3718)
- [tds-widget] map에서 fitBounds 비활성화 props 추가 [#3720](https://github.com/titicacadev/triple-frontend/pull/3720)

### triple-web

- [triple-web] multiple hash 지원 [#3706](https://github.com/titicacadev/triple-frontend/pull/3706)
```

## 14.0.13

```
### middlewares

- (Chat) [DMTALK-60] 챗룸 컴포넌트 추가 [#3608](https://github.com/titicacadev/triple-frontend/pull/3608)

### router

- [DMTALK-183] 링크 두번 열리는 오류 수정 [#3681](https://github.com/titicacadev/triple-frontend/pull/3681)

### tds-widget

- (Chat) 채팅 버블 부가 정보 커스텀 스타일 프롭스 추가 [#3574](https://github.com/titicacadev/triple-frontend/pull/3574)
- (Chat) 누락된 타입 export 및 props 추가 [#3585](https://github.com/titicacadev/triple-frontend/pull/3585)
- tds-widget/chat에서 triple-web 디펜던시를 제거 [#3586](https://github.com/titicacadev/triple-frontend/pull/3586)
- (chat) 커스텀이 가능한 채팅 리스트 공통 컴포넌트를 만든다. [#3588](https://github.com/titicacadev/triple-frontend/pull/3588)
- (Chat) [DMTALK-31] 채팅 공통타입 정리 [#3589](https://github.com/titicacadev/triple-frontend/pull/3589)
- (Chat) [DMTALK-32] 채팅 메시지 플로우 공통화  [#3593](https://github.com/titicacadev/triple-frontend/pull/3593)
- (Chat) [DMTALK-51] 사용자 식별자 제외 API 응답 마이그레이션 [#3601](https://github.com/titicacadev/triple-frontend/pull/3601)
- (Chat) 채팅 리스트 기본 기능 로직을 확장 가능하게 제공한다. [#3602](https://github.com/titicacadev/triple-frontend/pull/3602)
- (Chat) [DMTALK-60] 챗룸 컴포넌트 추가 [#3608](https://github.com/titicacadev/triple-frontend/pull/3608)
- [EPIC] tds-widget/chat을 확장하고 서비스간 중복 로직을 공통화 합니다  (v14) - 2/2 [#3614](https://github.com/titicacadev/triple-frontend/pull/3614)
- [DMTALK-86] Chat 스타일 / 컴포넌트 확장 가능하도록 수정 [#3616](https://github.com/titicacadev/triple-frontend/pull/3616)
- [DMTALK-88] 초대 및 채팅방 만료 정책 타입 추가 [#3620](https://github.com/titicacadev/triple-frontend/pull/3620)
- [DMTALK-90] 새로운 메시지 수신 시 bottom scroll 여부 컨트롤 추가 [#3621](https://github.com/titicacadev/triple-frontend/pull/3621)
- fix: onChatRestart 기본값 제거 [#3623](https://github.com/titicacadev/triple-frontend/pull/3623)
- (Chat) nol-chat getMessages 응답값 migration [#3626](https://github.com/titicacadev/triple-frontend/pull/3626)
- [DMTALK-67] ReservationLabel export 및 일부 Preview element css override 되도록 수정 [#3627](https://github.com/titicacadev/triple-frontend/pull/3627)
- [DMTALK-112] 새로운 메시지 UI 추가 [#3628](https://github.com/titicacadev/triple-frontend/pull/3628)
- [DMTALK] 조건문 내 오타 수정 [#3629](https://github.com/titicacadev/triple-frontend/pull/3629)
- [DMTALK] `ProductMetaData, BookingMetaData` type 스웨거와 싱크 [#3633](https://github.com/titicacadev/triple-frontend/pull/3633)
- [DMTALK] get messages 응답 인터페이스 변경 대응 [#3634](https://github.com/titicacadev/triple-frontend/pull/3634)
- [DMTALK] refactor: export 네이밍 변경 [#3635](https://github.com/titicacadev/triple-frontend/pull/3635)
- [DMTALK] get messages 응답 인터페이스 변경 대응 [#3639](https://github.com/titicacadev/triple-frontend/pull/3639)
- [DMTALK] Preview 날짜 표기 방식 util 추가 [#3644](https://github.com/titicacadev/triple-frontend/pull/3644)
- [DMTALK-126] 첫 메시지 전송 시 룸 생성 전 pending message 처리 [#3647](https://github.com/titicacadev/triple-frontend/pull/3647)
- [DMTALK-135] 예약정보 UI 디자인 수정 반영 [#3650](https://github.com/titicacadev/triple-frontend/pull/3650)
- [DMTALK-133] 상대방 메시지 실시간 받을 경우 스크롤이 올라가도록 수정 [#3653](https://github.com/titicacadev/triple-frontend/pull/3653)
- [DMTALK] 중복 UI 정리 및 NolThemeProvider 생성 [#3657](https://github.com/titicacadev/triple-frontend/pull/3657)
- [DMTALK-148] refactor: nol-theme-provider 사용 [#3661](https://github.com/titicacadev/triple-frontend/pull/3661)
- [DMTALK] 잘못된 간격 수정 [#3662](https://github.com/titicacadev/triple-frontend/pull/3662)
- [DMTALK-130] 안드로이드 스크롤 오류 관련 프롭스 추가 [#3663](https://github.com/titicacadev/triple-frontend/pull/3663)
- [DMTALK] 네트워크 없을 경우 실패 아이콘 미노출되는 이슈 수정 [#3665](https://github.com/titicacadev/triple-frontend/pull/3665)
- [DMTALK-156] 간격 수정 및 문구 변경으로 인한 max-width 수정 [#3666](https://github.com/titicacadev/triple-frontend/pull/3666)
- [DMTALK-158] 누락된 디펜던시 및 message sanitize 추가 [#3667](https://github.com/titicacadev/triple-frontend/pull/3667)
- [DMTALK] 채팅창 상세에서 상품/예약정보 접기펼치기 영역 확대 [#3668](https://github.com/titicacadev/triple-frontend/pull/3668)
- [DMTALK] 취소 후 만료정책 추가 [#3669](https://github.com/titicacadev/triple-frontend/pull/3669)
- [DMTALK] 상품/예약정보 접기펼치기 영역 - 클릭이벤트 조건 수정 [#3670](https://github.com/titicacadev/triple-frontend/pull/3670)
- [DMTALK-176] 디자인 QA [#3675](https://github.com/titicacadev/triple-frontend/pull/3675)
- [DMTALK-177] 전체보기 뷰 지오챗 스타일 오류 수정 [#3678](https://github.com/titicacadev/triple-frontend/pull/3678)
- moment 라이브러리를 date-fns로 변경합니다.  [#3679](https://github.com/titicacadev/triple-frontend/pull/3679)
- reservation info min-height 수정 [#3680](https://github.com/titicacadev/triple-frontend/pull/3680)
- [DMTALK-183] 링크 두번 열리는 오류 수정 [#3681](https://github.com/titicacadev/triple-frontend/pull/3681)
- [DMTALK-184] 아이콘 오류 수정 [#3683](https://github.com/titicacadev/triple-frontend/pull/3683)
- [EPIC] tds-widget/chat을 확장하고 서비스간 중복 로직을 공통화 합니다 (v14) - 1 / 2 [#3684](https://github.com/titicacadev/triple-frontend/pull/3684)

### triple-document

- moment 라이브러리를 date-fns로 변경합니다.  [#3679](https://github.com/titicacadev/triple-frontend/pull/3679)

### triple-web

- (Chat) [DMTALK-60] 챗룸 컴포넌트 추가 [#3608](https://github.com/titicacadev/triple-frontend/pull/3608)

### view-utilities

- (Chat) [DMTALK-60] 챗룸 컴포넌트 추가 [#3608](https://github.com/titicacadev/triple-frontend/pull/3608)
- moment 라이브러리를 date-fns로 변경합니다.  [#3679](https://github.com/titicacadev/triple-frontend/pull/3679)
```

## 14.0.12

```
### ab-experiments

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [KLZT-882] 클라이언트 세션 갱신 로직을 추가합니다.  [#3631](https://github.com/titicacadev/triple-frontend/pull/3631)

### constants

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)

### fetcher

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [KLZT-882] 클라이언트 세션 갱신 로직을 추가합니다.  [#3631](https://github.com/titicacadev/triple-frontend/pull/3631)
- [middlware] 세션 갱신 로직을 수정합니다. [#3660](https://github.com/titicacadev/triple-frontend/pull/3660)

### middlewares

- v13.43.0 이후의 변경사항을 적용합니다. [#3603](https://github.com/titicacadev/triple-frontend/pull/3603)
- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [middlware] 세션 갱신 로직을 수정합니다. [#3660](https://github.com/titicacadev/triple-frontend/pull/3660)

### router

- [router] openNativeLink에서 href가 아닌 path를 param으로 넘겨주도록 수정 [#3571](https://github.com/titicacadev/triple-frontend/pull/3571)

### standard-action-handler

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)

### tds-ui

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)

### tds-widget

- v13.41.0 ~ v13.42.1 변경사항을 반영합니다. [#3562](https://github.com/titicacadev/triple-frontend/pull/3562)
- v13.43.0 이후의 변경사항을 적용합니다. [#3603](https://github.com/titicacadev/triple-frontend/pull/3603)
- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [KLZT-882] 클라이언트 세션 갱신 로직을 추가합니다.  [#3631](https://github.com/titicacadev/triple-frontend/pull/3631)

### triple-document

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [KLZT-882] 클라이언트 세션 갱신 로직을 추가합니다.  [#3631](https://github.com/titicacadev/triple-frontend/pull/3631)

### triple-header

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [KLZT-882] 클라이언트 세션 갱신 로직을 추가합니다.  [#3631](https://github.com/titicacadev/triple-frontend/pull/3631)

### triple-web

- v13.43.0 이후의 변경사항을 적용합니다. [#3603](https://github.com/titicacadev/triple-frontend/pull/3603)
- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)

### triple-web-nextjs

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)

### triple-web-nextjs-pages

- [Epic] NOL 회원 통합 (v14) [#3604](https://github.com/titicacadev/triple-frontend/pull/3604)
- [KLZT-882] 클라이언트 세션 갱신 로직을 추가합니다.  [#3631](https://github.com/titicacadev/triple-frontend/pull/3631)

### view-utilities

- v13.43.0 이후의 변경사항을 적용합니다. [#3603](https://github.com/titicacadev/triple-frontend/pull/3603)
```

## 14.0.11

### tds-widget

- v13.40.0 변경사항을 적용합니다. [#3545](https://github.com/titicacadev/triple-frontend/pull/3545)

### triple-web

- [triple-web] 앱설치유도 모달 및 로그인 모달의 showOptions를 수정합니다. [#3540](https://github.com/titicacadev/triple-frontend/pull/3540)

### view-utilities

- v13.40.1 변경사항을 적용합니다. [#3547](https://github.com/titicacadev/triple-frontend/pull/3547)

## 14.0.10

### triple-web

- [triple-web] 웹뷰에서는 nativeTrackScreen만 실행하도록 수정합니다. [#3536](https://github.com/titicacadev/triple-frontend/pull/3536)

## 14.0.9

### tds-ui

- App router에서 use client 문제 수정 [#3514](https://github.com/titicacadev/triple-frontend/pull/3514)
- [tds-ui] onChange 함수가 중복 실행되지 않도록 수정합니다. [#3532](https://github.com/titicacadev/triple-frontend/pull/3532)

### tds-widget

- App router에서 use client 문제 수정 [#3514](https://github.com/titicacadev/triple-frontend/pull/3514)

### triple-email-document

- v13.39.0 수정사항을 반영합니다. [#3519](https://github.com/titicacadev/triple-frontend/pull/3519)

### triple-web

- App router에서 use client 문제 수정 [#3514](https://github.com/titicacadev/triple-frontend/pull/3514)
- triple-web-nextjs-pages에 ssr-utils 추가 [#3518](https://github.com/titicacadev/triple-frontend/pull/3518)

### triple-web-nextjs

- App router에서 use client 문제 수정 [#3514](https://github.com/titicacadev/triple-frontend/pull/3514)
- triple-web-nextjs-pages에 ssr-utils 추가 [#3518](https://github.com/titicacadev/triple-frontend/pull/3518)

### triple-web-nextjs-pages

- App router에서 use client 문제 수정 [#3514](https://github.com/titicacadev/triple-frontend/pull/3514)
- triple-web-nextjs-pages에 ssr-utils 추가 [#3518](https://github.com/titicacadev/triple-frontend/pull/3518)

## 14.0.8

### tds-widget

v13.38.1 변경사항을 적용합니다. [#3521](https://github.com/titicacadev/triple-frontend/pull/3521)

## 14.0.7

### meta-tags

- [meta-tags] 앱라우터용 메타태그 및 QaPageScript, DiscussionForumPostingScript를 추가합니다. [#3500](https://github.com/titicacadev/triple-frontend/pull/3500)

### middlewares

- [middleware] 세션 쿠키 리프레시 로직을 수정합니다. [#3498](https://github.com/titicacadev/triple-frontend/pull/3498)

### triple-web

- [triple-web] web track event는 클라이언트 웹뷰가 아닐 때만 로깅하도록 수정합니다. [#3507](https://github.com/titicacadev/triple-frontend/pull/3507)

### tds-widget

- v13.37.0, v13.38.0 변경사항을 적용합니다. [#3512](https://github.com/titicacadev/triple-frontend/pull/3512)

### type-definitions

- v13.37.0, v13.38.0 변경사항을 적용합니다. [#3512](https://github.com/titicacadev/triple-frontend/pull/3512)

## v14.0.6

### tds-widget

- [tds-widget] beforeScrapedChange시 파람에 eventParam을 넘기도록 수정합니다. [#3493](https://github.com/titicacadev/triple-frontend/pull/3493)

### triple-web

- [triple-web] firebaseAnalytics 인스턴스를 가져오지 못하는 이슈를 해결합니다. [#3492](https://github.com/titicacadev/triple-frontend/pull/3492)
- [triple-web] 모달을 띄울 때 trackScreen이 호출되는 문제를 해결합니다. [#3496](https://github.com/titicacadev/triple-frontend/pull/3496)
- [triple-web] 로그인 모달 버튼 함수 수정 [#3497](https://github.com/titicacadev/triple-frontend/pull/3497)

## v14.0.5

### router

- [view-utilities, router] routelist에 라운지홈을 추가합니다. useNavigate에서 deeplink 이동 로직을 추가합니다 [#3486](https://github.com/titicacadev/triple-frontend/pull/3486)
- 앱에서 navigate 동작 수정 [#3487](https://github.com/titicacadev/triple-frontend/pull/3487)

### tds-widget

- 앱 외부에서도 스크랩이 가능하도록 옵션 추가 [#3489](https://github.com/titicacadev/triple-frontend/pull/3489)

### triple-web

- 앱에서 navigate 동작 수정 [#3487](https://github.com/titicacadev/triple-frontend/pull/3487)
- LoginCtaModal 기본 return url에서 hash 제거 [#3488](https://github.com/titicacadev/triple-frontend/pull/3488)

### triple-web-nextjs

- 앱에서 navigate 동작 수정 [#3487](https://github.com/titicacadev/triple-frontend/pull/3487)

### triple-web-nextjs-pages

- 앱에서 navigate 동작 수정 [#3487](https://github.com/titicacadev/triple-frontend/pull/3487)

### triple-web-utils

- 앱에서 navigate 동작 수정 [#3487](https://github.com/titicacadev/triple-frontend/pull/3487)

### view-utilities

- [view-utilities, router] routelist에 라운지홈을 추가합니다. useNavigate에서 deeplink 이동 로직을 추가합니다 [#3486](https://github.com/titicacadev/triple-frontend/pull/3486)

## v14.0.4

### i18n

- triple-web 테스트 추가 [#3472](https://github.com/titicacadev/triple-frontend/pull/3472)

### router

- Link 컴포넌트에서 불필요한 inline style 제거 [#3482](https://github.com/titicacadev/triple-frontend/pull/3482)

### standard-action-handler

- 타입 에러 수정 [#3471](https://github.com/titicacadev/triple-frontend/pull/3471)

### tds-ui

- Card radius prop 이름 변경 [#3463](https://github.com/titicacadev/triple-frontend/pull/3463)
- Carousel containerPadding, margin prop 복구 [#3470](https://github.com/titicacadev/triple-frontend/pull/3470)
- 타입 에러 수정 [#3471](https://github.com/titicacadev/triple-frontend/pull/3471)

### tds-widget

- ScrapsProvider에 onScrapeFailed prop 넘길 수 있도록 추가 [#3469](https://github.com/titicacadev/triple-frontend/pull/3469)
- 타입 에러 수정 [#3471](https://github.com/titicacadev/triple-frontend/pull/3471)
- 13.35.0 - 13.36.0 변경사항을 14에 반영 [#3479](https://github.com/titicacadev/triple-frontend/pull/3479)

### triple-document

- #3437 변경사항을 적용합니다 [#3466](https://github.com/titicacadev/triple-frontend/pull/3466)
- 타입 에러 수정 [#3471](https://github.com/titicacadev/triple-frontend/pull/3471)

### triple-web

- triple-web 테스트 추가 [#3472](https://github.com/titicacadev/triple-frontend/pull/3472)
- 13.35.0 - 13.36.0 변경사항을 14에 반영 [#3479](https://github.com/titicacadev/triple-frontend/pull/3479)

### triple-web-nextjs

- [triple-web-nextjs] promise error 해결 [#3473](https://github.com/titicacadev/triple-frontend/pull/3473)
- 13.35.0 - 13.36.0 변경사항을 14에 반영 [#3479](https://github.com/titicacadev/triple-frontend/pull/3479)

### triple-web-nextjs-pages

- 13.35.0 - 13.36.0 변경사항을 14에 반영 [#3479](https://github.com/titicacadev/triple-frontend/pull/3479)

### triple-web-test-utils

- 타입 에러 수정 [#3471](https://github.com/titicacadev/triple-frontend/pull/3471)

### triple-web-utils

- 13.35.0 - 13.36.0 변경사항을 14에 반영 [#3479](https://github.com/titicacadev/triple-frontend/pull/3479)

## v14.0.3

### standard-action-handler

- 13.31.0 - 13.34.0 변경사항을 14에 반영 [#3460](https://github.com/titicacadev/triple-frontend/pull/3460)

### tds-ui

- 13.31.0 - 13.34.0 변경사항을 14에 반영 [#3460](https://github.com/titicacadev/triple-frontend/pull/3460)

### tds-widget

- user-verification service export 추가 [#3442](https://github.com/titicacadev/triple-frontend/pull/3442)
- 13.31.0 - 13.34.0 변경사항을 14에 반영 [#3460](https://github.com/titicacadev/triple-frontend/pull/3460)

### triple-web

- useClientAppCallback의 fn, appInstallCtaModalOptions 파라미터 순서 변경 [#3440](https://github.com/titicacadev/triple-frontend/pull/3440)

### view-utilities

- 13.31.0 - 13.34.0 변경사항을 14에 반영 [#3460](https://github.com/titicacadev/triple-frontend/pull/3460)

## v14.0.2

### tds-widget

- node querystring 대신 qs 사용 [#3423](https://github.com/titicacadev/triple-frontend/pull/3423)

## v14.0.1

### ab-experiments

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)

### fetcher

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)

### i18n

- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### intersection-observer

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)

### meta-tags

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### middlewares

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)

### router

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### standard-action-handler

- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### tds-theme

- styled components에 transient prop 사용 [#3326](https://github.com/titicacadev/triple-frontend/pull/3326)

### tds-ui

- v13 변경사항 리베이스 [#3315](https://github.com/titicacadev/triple-frontend/pull/3315)
- styled components 6 prop forward warning 수정 [#3323](https://github.com/titicacadev/triple-frontend/pull/3323)
- styled components에 transient prop 사용 [#3326](https://github.com/titicacadev/triple-frontend/pull/3326)
- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- FlickingCarousel을 원상복구 [#3359](https://github.com/titicacadev/triple-frontend/pull/3359)
- v14 버그 수정 [#3369](https://github.com/titicacadev/triple-frontend/pull/3369)

### tds-widget

- [v14] beforeScrapedChange prop 복구 [#3289](https://github.com/titicacadev/triple-frontend/pull/3289)
- querystring 대신 qs 모듈 사용 [#3314](https://github.com/titicacadev/triple-frontend/pull/3314)
- styled components 6 prop forward warning 수정 [#3323](https://github.com/titicacadev/triple-frontend/pull/3323)
- styled components에 transient prop 사용 [#3326](https://github.com/titicacadev/triple-frontend/pull/3326)
- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- [v14] POI 대표 이미지 오류 수정 [#3356](https://github.com/titicacadev/triple-frontend/pull/3356)
- FlickingCarousel을 원상복구 [#3359](https://github.com/titicacadev/triple-frontend/pull/3359)
- [migration] v13.26.3 이후 변경사항 v14에 반영 [#3374](https://github.com/titicacadev/triple-frontend/pull/3374)
- [migration] v13.29.0~v13.31.0 변경사항을 v14에 반영합니다. [#3381](https://github.com/titicacadev/triple-frontend/pull/3381)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)
- [v14] 캐러셀 관련 이슈 수정 [#3409](https://github.com/titicacadev/triple-frontend/pull/3409)

### triple-document

- styled components에 transient prop 사용 [#3326](https://github.com/titicacadev/triple-frontend/pull/3326)
- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### triple-email-document

- styled components에 transient prop 사용 [#3326](https://github.com/titicacadev/triple-frontend/pull/3326)

### triple-header

- styled components에 transient prop 사용 [#3326](https://github.com/titicacadev/triple-frontend/pull/3326)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### triple-web

- v13 변경사항 리베이스 [#3315](https://github.com/titicacadev/triple-frontend/pull/3315)
- v14 버그 수정 [#3369](https://github.com/titicacadev/triple-frontend/pull/3369)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### triple-web-nextjs

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- v14 버그 수정 [#3369](https://github.com/titicacadev/triple-frontend/pull/3369)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### triple-web-nextjs-pages

- 스토리북 8 업그레이드 [#3341](https://github.com/titicacadev/triple-frontend/pull/3341)
- v14 버그 수정 [#3369](https://github.com/titicacadev/triple-frontend/pull/3369)
- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

### triple-web-test-utils

- i18next 제거 & triple-web에 i18n context 추가 [#3387](https://github.com/titicacadev/triple-frontend/pull/3387)

## v14

### ab-experiments

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### action-sheet

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### ad-banners

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### app-banner

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### app-installation-cta

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### author

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### booking-completion

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### carousel

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### chat

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### color-palette

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### constants

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### content-sharing

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### core-elements

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### date-picker

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### directions-finder

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### drawer-button

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### fetcher

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### footer

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### form

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### hub-form

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### i18n

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### icons

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### image-carousel

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### image-viewer

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### intersection-observer

- [v14] 빌드 에러 수정 1 [#3077](https://github.com/titicacadev/triple-frontend/pull/3077)
- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- [v14] QA 버그 수정 [#3162](https://github.com/titicacadev/triple-frontend/pull/3162)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- styled-components 6 업그레이드 [#3268](https://github.com/titicacadev/triple-frontend/pull/3268)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### listing-filter

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### location-properties

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### map

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### meta-tags

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### middlewares

- middleware 패키지 추가 및 세션 갱신 middlware 추가 [#3185](https://github.com/titicacadev/triple-frontend/pull/3185)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### modals

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### nearby-pois

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### poi-detail

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### poi-list-elements

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### popup

- V14 에픽 브랜치 [#3189](https://github.com/titicacadev/triple-frontend/pull/3189)

### react-hooks

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- [v14] 타입 개선과 버그 수정 [#3128](https://github.com/titicacadev/triple-frontend/pull/3128)
- [v14] QA 버그 수정 [#3162](https://github.com/titicacadev/triple-frontend/pull/3162)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- styled-components 6 업그레이드 [#3268](https://github.com/titicacadev/triple-frontend/pull/3268)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### react-triple-client-interfaces

- [v14] 스토리북 코드 수정 [#3063](https://github.com/titicacadev/triple-frontend/pull/3063)
- [v14] react-triple-client-interfaces 패키지 제거 [#3068](https://github.com/titicacadev/triple-frontend/pull/3068)

### router

- [v14] useIsomorphicNavigation 복구 및 replies 마이그레이션 [#3062](https://github.com/titicacadev/triple-frontend/pull/3062)
- [v14] react-triple-client-interfaces 패키지 제거 [#3068](https://github.com/titicacadev/triple-frontend/pull/3068)
- [v14] 새로운 open link 훅 추가 [#3071](https://github.com/titicacadev/triple-frontend/pull/3071)
- [v14] useClientAppActions import path 수정 [#3072](https://github.com/titicacadev/triple-frontend/pull/3072)
- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- [v14] 테스트 코드를 수정합니다. [#3087](https://github.com/titicacadev/triple-frontend/pull/3087)
- [v14] 컴포넌트형 링크 제거하고 useMake 훅 추가 [#3099](https://github.com/titicacadev/triple-frontend/pull/3099)
- [v14] TripleWeb 사용 편의성 보완 [#3117](https://github.com/titicacadev/triple-frontend/pull/3117)
- [triple-web] TransitionModal을 AppInstallCtaModal로 변경합니다. [#3249](https://github.com/titicacadev/triple-frontend/pull/3249)
- 타입 문제 수정 [#3261](https://github.com/titicacadev/triple-frontend/pull/3261)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### scroll-spy

- [v14] 빌드 에러 수정 1 [#3077](https://github.com/titicacadev/triple-frontend/pull/3077)
- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- [V14] scroll-spy 패키지 제거 [#3089](https://github.com/titicacadev/triple-frontend/pull/3089)

### scroll-to-element

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### standard-action-handler

- [v14] standard-action-handler 마이그레이션 [#3061](https://github.com/titicacadev/triple-frontend/pull/3061)
- [v14] useExternalRouter 제거 [#3067](https://github.com/titicacadev/triple-frontend/pull/3067)
- [v14] react-triple-client-interfaces 패키지 제거 [#3068](https://github.com/titicacadev/triple-frontend/pull/3068)
- [v14] 새로운 open link 훅 추가 [#3071](https://github.com/titicacadev/triple-frontend/pull/3071)
- [v14] useClientAppActions import path 수정 [#3072](https://github.com/titicacadev/triple-frontend/pull/3072)
- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- [v14] 테스트 코드를 수정합니다. [#3087](https://github.com/titicacadev/triple-frontend/pull/3087)
- [triple-web] TransitionModal을 AppInstallCtaModal로 변경합니다. [#3249](https://github.com/titicacadev/triple-frontend/pull/3249)
- 타입 문제 수정 [#3261](https://github.com/titicacadev/triple-frontend/pull/3261)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- styled-components 6 업그레이드 [#3268](https://github.com/titicacadev/triple-frontend/pull/3268)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

### tds-theme

- [v14] ES Module 사용, 빌드 오류 일부 수정 [#3081](https://github.com/titicacadev/triple-frontend/pull/3081)
- [v14] subpath exports 제거, intersection-observer 개선 [#3085](https://github.com/titicacadev/triple-frontend/pull/3085)
- Vite 빌드 [#3264](https://github.com/titicacadev/triple-frontend/pull/3264)
- styled-components 6 업그레이드 [#3268](https://github.com/titicacadev/triple-frontend/pull/3268)
- ES Module 빌드 [#3275](https://github.com/titicacadev/triple-frontend/pull/3275)

## 13.46.0

### ab-experiments

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### ad-banners

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### constants

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 세션 리프레쉬 로직을 수정합니다. [#3592](https://github.com/titicacadev/triple-frontend/pull/3592)

### core-elements

- [footer] 푸터에 버튼, 링크, 드롭다운을 원격으로 설정할 수 있도록 수정합니다. [#3615](https://github.com/titicacadev/triple-frontend/pull/3615)

### date-picker

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### fetcher

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)
- [fetcher] authFetcherize에서 refresh의 apiUriBase를 fetcher와 통일합니다. [#3645](https://github.com/titicacadev/triple-frontend/pull/3645)
- [KLZT-910] 서버의 401 에러의 AccessTokenExpiredException를 구분합니다. [#3646](https://github.com/titicacadev/triple-frontend/pull/3646)
- [ui-flow] authGuard에서 firstTrial시 NEED_LOGIN 응답시 NEED_LOGIN_IDENTIFIER 리턴 [#3655](https://github.com/titicacadev/triple-frontend/pull/3655)

### footer

- [footer] 푸터에 버튼, 링크, 드롭다운을 원격으로 설정할 수 있도록 수정합니다. [#3615](https://github.com/titicacadev/triple-frontend/pull/3615)
- [footer] footer의 disclaimer maxWidth 삭제 [#3648](https://github.com/titicacadev/triple-frontend/pull/3648)
- [footer] 푸터 버튼에 key props를 추가합니다. [#3652](https://github.com/titicacadev/triple-frontend/pull/3652)

### nearby-pois

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### poi-detail

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### public-header

- [public-header, react-contexts] NOL 연동 회원의 경우 웹 사이드바 프로필에서 provider를 노출하지 않습니다. [#3580](https://github.com/titicacadev/triple-frontend/pull/3580)
- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [public-header] provider 타입 추가에 따른 프로필 변경 [#3607](https://github.com/titicacadev/triple-frontend/pull/3607)
- [public-header] NOL 멤버스 문구를 NOL 회원으로 변경합니다. [#3659](https://github.com/titicacadev/triple-frontend/pull/3659)

### react-contexts

- [public-header, react-contexts] NOL 연동 회원의 경우 웹 사이드바 프로필에서 provider를 노출하지 않습니다. [#3580](https://github.com/titicacadev/triple-frontend/pull/3580)
- [react-contexts] NOL 통합 유저일 경우 로그아웃시 redirect합니다. [#3581](https://github.com/titicacadev/triple-frontend/pull/3581)
- [react-contexts] 트리플 deviceId를 추가하는 미들웨어를 작성합니다. [#3584](https://github.com/titicacadev/triple-frontend/pull/3584)
- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 세션 리프레쉬 로직을 수정합니다. [#3592](https://github.com/titicacadev/triple-frontend/pull/3592)
- [react-contexts] setWebDeviceId 미들웨어에 applySetCookie를 적용합니다. [#3594](https://github.com/titicacadev/triple-frontend/pull/3594)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)
- [react-contexts] 세션 체크 API로 변경 [#3605](https://github.com/titicacadev/triple-frontend/pull/3605)
- [public-header] provider 타입 추가에 따른 프로필 변경 [#3607](https://github.com/titicacadev/triple-frontend/pull/3607)
- [react-contexts] 미들웨어에 chain 및 기타 미들웨어의 export를 추가합니다. [#3609](https://github.com/titicacadev/triple-frontend/pull/3609)
- [react-contexts] setWebDeviceId 미들웨어에 domain을 추가합니다. [#3610](https://github.com/titicacadev/triple-frontend/pull/3610)
- [react-contexts] trackScreen에 nol_device_id를 기록하도록 수정합니다. [#3617](https://github.com/titicacadev/triple-frontend/pull/3617)
- [react-contexts] 일반 로그아웃시 reload 추가 [#3641](https://github.com/titicacadev/triple-frontend/pull/3641)
- [KLZT-910] 서버의 401 에러의 AccessTokenExpiredException를 구분합니다. [#3646](https://github.com/titicacadev/triple-frontend/pull/3646)

### replies

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### review

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)
- [KLZT-910] 서버의 401 에러의 AccessTokenExpiredException를 구분합니다. [#3646](https://github.com/titicacadev/triple-frontend/pull/3646)

### standard-action-handler

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [KLZT-910] 서버의 401 에러의 AccessTokenExpiredException를 구분합니다. [#3646](https://github.com/titicacadev/triple-frontend/pull/3646)

### triple-document

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### triple-header

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

### ui-flow

- [public-header, react-contexts] NOL 연동 회원의 경우 웹 사이드바 프로필에서 provider를 노출하지 않습니다. [#3580](https://github.com/titicacadev/triple-frontend/pull/3580)
- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)
- [ui-flow] authGuard에서 firstTrial시 NEED_LOGIN 응답시 NEED_LOGIN_IDENTIFIER 리턴 [#3655](https://github.com/titicacadev/triple-frontend/pull/3655)

### user-verification

- [Epic] NOL 회원 통합 [#3590](https://github.com/titicacadev/triple-frontend/pull/3590)
- [react-contexts] 클라이언트 세션 갱신 로직을 추가합니다. [#3595](https://github.com/titicacadev/triple-frontend/pull/3595)

## 13.45.1

### view-utilities

- [view-utilities] routelist의 static-pages 정규식을 수정합니다. [#3598](https://github.com/titicacadev/triple-frontend/pull/3598)

## 13.45.0

### view-utilities

- [KLZT-885] routelist에 static-pages, community, game을 추가합니다. [#3596](https://github.com/titicacadev/triple-frontend/pull/3596)

## 13.44.0

### footer

- [footer, react-contexts] 푸터 정보를 footer.json으로 관리하도록 수정합니다 [#3577](https://github.com/titicacadev/triple-frontend/pull/3577)

### react-contexts

- [footer, react-contexts] 푸터 정보를 footer.json으로 관리하도록 수정합니다 [#3577](https://github.com/titicacadev/triple-frontend/pull/3577)

## 13.43.0

### react-contexts

- session refresh middleware 추가 [#3564](https://github.com/titicacadev/triple-frontend/pull/3564)

## 13.42.1

### chat

- (chat)fix: file input에 사진만 업로드 가능하도록 accept 추가 [#3552](https://github.com/titicacadev/triple-frontend/pull/3552)

## 13.42.0

### chat

- (chat) 트리플 앱 디펜던시 제거 [#3554](https://github.com/titicacadev/triple-frontend/pull/3554)

## v13.41.0

### chat

- [chat] 메세지에 IntersectionObserver와 ref를 추가합니다. [#3109](https://github.com/titicacadev/triple-frontend/pull/3109)
- [chat] 부모 메세지 UI를 추가합니다 [#3111](https://github.com/titicacadev/triple-frontend/pull/3111)
- [chat] 버블 스타일을 수정하고 날짜 및 시간 표기, 프로필 생략 기능을 추가합니다. [#3116](https://github.com/titicacadev/triple-frontend/pull/3116)
- [chat] 메세지에 답장하기 아이콘을 추가합니다. [#3127](https://github.com/titicacadev/triple-frontend/pull/3127)
- [chat] epic: geochat 기능을 chat 패키지에 추가합니다. [#3130](https://github.com/titicacadev/triple-frontend/pull/3130)
- [chat] 답장하기 아이콘의 렌더링 조건을 수정합니다. [#3132](https://github.com/titicacadev/triple-frontend/pull/3132)
- [chat] 긴 글 메세지의 전체보기 뷰를 추가합니다. [#3134](https://github.com/titicacadev/triple-frontend/pull/3134)
- [chat] openMenu의 타입 오류를 수정합니다. [#3139](https://github.com/titicacadev/triple-frontend/pull/3139)
- [chat] 지오챗 버블의 기능을 추가합니다. [#3146](https://github.com/titicacadev/triple-frontend/pull/3146)
- [chat] intersection observer 교체 외 스타일 수정 [#3444](https://github.com/titicacadev/triple-frontend/pull/3444)
- [chat] aTagNavigator가 외부 브라우저에서 열리도록 수정합니다. [#3551](https://github.com/titicacadev/triple-frontend/pull/3551)
- [chat] 답장하기 버튼에 data-id 추가 [#3556](https://github.com/titicacadev/triple-frontend/pull/3556)

## 13.40.1

### view-utilities

- [view-utilities] tna public_routerlist 정규식 수정 [#3542](https://github.com/titicacadev/triple-frontend/pull/3542)

## 13.40.0

### footer

- [footer] 푸터 내 문의메일 정보 변경 [#3543](https://github.com/titicacadev/triple-frontend/pull/3543)

## 13.39.0

### triple-email-document

- [triple-email-template] default 링크 스타일을 추가하고, 스크롤 포커싱 이슈를 해결합니다 [#3517](https://github.com/titicacadev/triple-frontend/pull/3517)

## v13.38.1

### footer

- [footer] 푸터의 맞춤법을 수정합니다. [#3516](https://github.com/titicacadev/triple-frontend/pull/3516)

## v13.38.0

### footer

- [footer] 푸터의 회사명, 대표명을 변경합니다. [#3505](https://github.com/titicacadev/triple-frontend/pull/3505)

### review

- [Reivew] 리뷰 플레이스홀더 마진 값을 수정합니다. [#3509](https://github.com/titicacadev/triple-frontend/pull/3509)

## v13.37.0

### triple-media

- KLZT-766 영상기본음소거 [#3503](https://github.com/titicacadev/triple-frontend/pull/3503)

### type-definitions

- KLZT-766 영상기본음소거 [#3503](https://github.com/titicacadev/triple-frontend/pull/3503)

## v13.36.0

### react-contexts

- [INTHOTEL-2407] defaultImage와 중복되는 이미지 필터링 [#3474](https://github.com/titicacadev/triple-frontend/pull/3474)
- triple-web-to-native-interfaces 패키지 버전업 대응 [#3475](https://github.com/titicacadev/triple-frontend/pull/3475)

### search

- triple-web-to-native-interfaces 패키지 버전업 대응 [#3475](https://github.com/titicacadev/triple-frontend/pull/3475)

### standard-action-handler

- triple-web-to-native-interfaces 패키지 버전업 대응 [#3475](https://github.com/titicacadev/triple-frontend/pull/3475)

## v13.35.0

### react-triple-client-interfaces

- [MAC용 트리플 앱 개발 지원] client meta data에 isMacApp 플래그 추가 [#3439](https://github.com/titicacadev/triple-frontend/pull/3439)

### triple-document

- [KLZT-668] 아티클 추천코스의 POI에 한줄 소개 영역을 추가합니다. [#3437](https://github.com/titicacadev/triple-frontend/pull/3437)

## v13.34.0

### modals

- [KLZT-663] converse에 로그인 유도 모달을 추가합니다 [#3429](https://github.com/titicacadev/triple-frontend/pull/3429)

### standard-action-handler

- [KLZT-663] converse에 로그인 유도 모달을 추가합니다 [#3429](https://github.com/titicacadev/triple-frontend/pull/3429)

### view-utilities

- [KLZT-677] routelist에 tna, air hub 추가 [#3443](https://github.com/titicacadev/triple-frontend/pull/3443)

## v13.33.0

### footer

- [KLZT-671] 푸터 내 통신판매업 신고번호 변경 [#3435](https://github.com/titicacadev/triple-frontend/pull/3435)

## v13.32.0

### review

- [KLZT-655] 리뷰 정렬 옵션 변경 시 무관한 element로 포커싱이 되는 버그를 수정합니다. [#3425](https://github.com/titicacadev/triple-frontend/pull/3425)
- [WATF-397] 리뷰 컴포넌트 내 배너를 prop으로 받도록 수정합니다. [#3433](https://github.com/titicacadev/triple-frontend/pull/3433)

## v13.31.0

### react-contexts

- [react-contexts] ScrapProvider에서 스크랩 실패 시 콜백함수를 props로 받습니다. [#3418](https://github.com/titicacadev/triple-frontend/pull/3418)

### review

- [KLZT-103] 리뷰 컴포넌트 렌더링 버그를 수정합니다. [#3407](https://github.com/titicacadev/triple-frontend/pull/3407)

## v13.30.0

### footer

- [KLZT-622] 푸터 주소 변경 [#3413](https://github.com/titicacadev/triple-frontend/pull/3413)

## v13.29.0

### footer

- [footer] 푸터 KINT 진입점에 FA 로깅을 추가합니다. [#3379](https://github.com/titicacadev/triple-frontend/pull/3379)

### react-contexts

- [react-contexts] images-api v2 적용 [#3345](https://github.com/titicacadev/triple-frontend/pull/3345)

## v13.28.0

### footer

- [footer] 푸터에 트리플 코리아 링크를 추가합니다. [#3370](https://github.com/titicacadev/triple-frontend/pull/3370)

## v13.27.1

### review

- [review] travel-restritions-api 관련 코드를 제거하기 위해 코드젠 generated.tsx를 재생성합니다 [#3357](https://github.com/titicacadev/triple-frontend/pull/3357)

## v13.27.0

### public-header

- [public-header] 헤더에 사이드바를 추가합니다. [#3328](https://github.com/titicacadev/triple-frontend/pull/3328)

## v13.26.4

### footer

- [footer] 푸터 통신판매업 신고번호를 변경합니다. [#3329](https://github.com/titicacadev/triple-frontend/pull/3329)

## v13.26.3

### action-sheet

- [action-sheet] pointer select revert [#3313](https://github.com/titicacadev/triple-frontend/pull/3313)

### react-contexts

- [react-contexts] user의 마일리지 뱃지 이미지 타입을 수정합니다. [#3310](https://github.com/titicacadev/triple-frontend/pull/3310)

## v13.26.2

### action-sheet

- [action-sheet] 액션 시트에서 lockScroll을 해제할 수 있도록 옵션 제공 [#3295](https://github.com/titicacadev/triple-frontend/pull/3295)

### react-contexts

- [react-hooks] user 타입에 email 필드를 추가합니다. [#3304](https://github.com/titicacadev/triple-frontend/pull/3304)

### react-hooks

- [react-hooks] user 타입에 email 필드를 추가합니다. [#3304](https://github.com/titicacadev/triple-frontend/pull/3304)

## v13.26.1

### review

- [review] 리뷰 상세 딥링크의 regionId 파라미터 null처리 추가 [#3266](https://github.com/titicacadev/triple-frontend/pull/3266)

## v13.26.0

### footer

- [footer] 인터파크 사업장 주소 변경 [#3247](https://github.com/titicacadev/triple-frontend/pull/3247)

## v13.25.3

### triple-document

- triple-document 내 쿠폰 모달 닫기 버튼 문구 수정 [#3243](https://github.com/titicacadev/triple-frontend/pull/3243)

### core-elements

- input error border-color 변경 [#3244](https://github.com/titicacadev/triple-frontend/pull/3244)

## v13.25.2

### triple-document

- [triple-document] StickyTabs 이미지에 object-fit 적용 [#3238](https://github.com/titicacadev/triple-frontend/pull/3238)

### view-utilities

- [view-utilities] 맞춤일정 페이지를 routelist에 추가합니다. [#3239](https://github.com/titicacadev/triple-frontend/pull/3239)

## v13.25.1

### core-elements

- form field error color 변경 [#3234](https://github.com/titicacadev/triple-frontend/pull/3234)

### triple-document

- sticky-tabs의 z-index 수정 [#3235](https://github.com/titicacadev/triple-frontend/pull/3235)

## v13.25.0

### triple-header, triple-document

- triple-header가 로티 애니메이션 타입을 지원합니다.
- triple-document에 Animation Element를 추가합니다. [#3210](https://github.com/titicacadev/triple-frontend/pull/3210)

### triple-document

- StickyTabs element 추가합니다. [#3220](https://github.com/titicacadev/triple-frontend/pull/3220)

## v13.24.0

### triple-document

- 추천코스가 페스타 타입을 지원하도록 합니다. [#3202](https://github.com/titicacadev/triple-frontend/pull/3202)

## v13.23.1

### image-viewer

- [image-viewer] 첫번째 이미지를 클릭했을 때 비정상적으로 작동하는 버그를 수정합니다. [#3187](https://github.com/titicacadev/triple-frontend/pull/3187)

## v13.23.0

### modals

- [modals] 앱설치유도 모달에 POI 기본정보 type을 추가합니다. [#3182](https://github.com/titicacadev/triple-frontend/pull/3182)

### public-header

- [public-header] 헤더 로고에 onClick props를 추가합니다. [#3183](https://github.com/titicacadev/triple-frontend/pull/3183)

## v13.22.0

### image-viewer

- [image-viewer] 확대뷰/격자뷰를 위한 이미지 뷰어 패키지를 생성합니다 [#3165](https://github.com/titicacadev/triple-frontend/pull/3165)
- [image-viewer] 이미지 확대뷰 팝업을 생성합니다 [#3166](https://github.com/titicacadev/triple-frontend/pull/3166)
- [image-viewer] 동영상 확대뷰를 작성합니다 [#3170](https://github.com/titicacadev/triple-frontend/pull/3170)
- [image-viewer] 이미지 확대뷰에서 핀치 줌 기능을 적용합니다 [#3172](https://github.com/titicacadev/triple-frontend/pull/3172)
- [review, image-viewer] 이미지 뷰어에서 ImagesContext를 제거하고 리뷰 컴포넌트에 이미지 뷰어를 적용합니다 [#3173](https://github.com/titicacadev/triple-frontend/pull/3173)
- [image-viewer, poi-detail, review] 이미지 확대뷰 fa 이벤트를 추가합니다 [#3175](https://github.com/titicacadev/triple-frontend/pull/3175)
- [image-viewer] 더블 클릭으로 인한 이미지 확대를 disable합니다 [#3176](https://github.com/titicacadev/triple-frontend/pull/3176)
- [reviews] 이미지 확대뷰 QA [#3179](https://github.com/titicacadev/triple-frontend/pull/3179)

### meta-tags

- [meta-tags] 불필요 주석 제거 [#3163](https://github.com/titicacadev/triple-frontend/pull/3163)

### poi-detail

- [image-viewer] 확대뷰/격자뷰를 위한 이미지 뷰어 패키지를 생성합니다 [#3165](https://github.com/titicacadev/triple-frontend/pull/3165)
- [poi-detail, review] 이미지 캐러셀의 cta 조건을 수정합니다 [#3171](https://github.com/titicacadev/triple-frontend/pull/3171)
- [poi-detail] 이지역꿀정보의 fa를 추가합니다 [#3174](https://github.com/titicacadev/triple-frontend/pull/3174)
- [image-viewer, poi-detail, review] 이미지 확대뷰 fa 이벤트를 추가합니다 [#3175](https://github.com/titicacadev/triple-frontend/pull/3175)
- [poi-detail] 이지역꿀정보 영역 디자인을 수정합니다 [#3178](https://github.com/titicacadev/triple-frontend/pull/3178)

### review

- [image-viewer] 확대뷰/격자뷰를 위한 이미지 뷰어 패키지를 생성합니다 [#3165](https://github.com/titicacadev/triple-frontend/pull/3165)
- [poi-detail, review] 이미지 캐러셀의 cta 조건을 수정합니다 [#3171](https://github.com/titicacadev/triple-frontend/pull/3171)
- [review, image-viewer] 이미지 뷰어에서 ImagesContext를 제거하고 리뷰 컴포넌트에 이미지 뷰어를 적용합니다 [#3173](https://github.com/titicacadev/triple-frontend/pull/3173)
- [image-viewer, poi-detail, review] 이미지 확대뷰 fa 이벤트를 추가합니다 [#3175](https://github.com/titicacadev/triple-frontend/pull/3175)
- [reviews] 유저 photo가 없을 때 디폴트 프로필을 설정합니다 [#3180](https://github.com/titicacadev/triple-frontend/pull/3180)

### triple-document

- [triple-document] itinerary의 transportation 타입에 bike를 추가합니다 [#3177](https://github.com/titicacadev/triple-frontend/pull/3177)

## v13.21.1

### review

- [reviews] 리뷰 더보기의 로그인 returnUrl을 리뷰 목록 페이지로 수정합니다. [#3167](https://github.com/titicacadev/triple-frontend/pull/3167)

## v13.21.0

### modals

- [review] 웹에서도 리뷰 더보기 버튼을 통해 리뷰 상세 페이지에 접근할 수 있도록 수정합니다 [#3156](https://github.com/titicacadev/triple-frontend/pull/3156)
- [modals] loginCtaModal의 로그인 클릭시에도 리퍼럴 이벤트를 기록하도록 수정합니다 [#3157](https://github.com/titicacadev/triple-frontend/pull/3157)

### poi-detail

- [poi-detail] 저장 유도 툴팁을 추가합니다 [#3152](https://github.com/titicacadev/triple-frontend/pull/3152)

### review

- [review] 웹에서도 리뷰 더보기 버튼을 통해 리뷰 상세 페이지에 접근할 수 있도록 수정합니다 [#3156](https://github.com/titicacadev/triple-frontend/pull/3156)
- [review] 맞춤 일정 배너를 노출합니다 [#3158](https://github.com/titicacadev/triple-frontend/pull/3158)

### triple-document

- [triple-document] note가 markdownText를 지원하도록 수정합니다 [#3148](https://github.com/titicacadev/triple-frontend/pull/3148)

### view-utilities

- [review] 웹에서도 리뷰 더보기 버튼을 통해 리뷰 상세 페이지에 접근할 수 있도록 수정합니다 [#3156](https://github.com/titicacadev/triple-frontend/pull/3156)
- [view-utilities] 항공 시세 페이지를 routelist에 추가합니다 [#3160](https://github.com/titicacadev/triple-frontend/pull/3160)

## v13.20.0

### view-utilities

- [view-utilities] 말줄임 함수 수정 [#3154](https://github.com/titicacadev/triple-frontend/pull/3154)

## v13.19.2

### modals

- TransitionModal에 타입을 추가합니다. [#3144](https://github.com/titicacadev/triple-frontend/pull/3144)

## v13.19.1

### nearby-pois

- [nearby-pois] 더보기 버튼 클릭 시 api 호출이 중복되는 이슈 수정 [#3140](https://github.com/titicacadev/triple-frontend/pull/3140)
- [nearby-pois] pois 중복을 제거하는 로직을 수정합니다. [#3141](https://github.com/titicacadev/triple-frontend/pull/3141)

## v13.19.0

### standard-action-handler

- [standard-action-handler] requireTripleClient 함수 추가 [#3121](https://github.com/titicacadev/triple-frontend/pull/3121)

### triple-document

- [triple-document] tna slot의 타이틀을 두줄 노출하도록 수정 [#3133](https://github.com/titicacadev/triple-frontend/pull/3133)

## v13.18.3

### poi-detail

- [poi-detail] DetailHeader의 아이콘을 정렬합니다. [#3126](https://github.com/titicacadev/triple-frontend/pull/3126)
- [poi-detail] 리뷰 영상 관련 툴팁 노출 버그를 수정합니다 [#3129](https://github.com/titicacadev/triple-frontend/pull/3129)

## v13.18.2

### modals

- [Review] notifyReviewDeleted 중복 호출 제거 및 리뷰 메뉴 선택 시 앱 설치 유도팝업 노출 [#3118](https://github.com/titicacadev/triple-frontend/pull/3118)

### review

- [Review] notifyReviewDeleted 중복 호출 제거 및 리뷰 메뉴 선택 시 앱 설치 유도팝업 노출 [#3118](https://github.com/titicacadev/triple-frontend/pull/3118)

## v13.18.1

### review

- [review] 좋아요 카운트 버그 수정 [#3115](https://github.com/titicacadev/triple-frontend/pull/3115)

## v13.18.0

### chat

- [Chat refactor] Bubble 리팩토링 [#2980](https://github.com/titicacadev/triple-frontend/pull/2980)
- [Chat refactor] 채팅의 default 네브바와 input ui를 추가합니다. [#2982](https://github.com/titicacadev/triple-frontend/pull/2982)
- [Chat refactor] 스크롤을 위한 context와 container를 작성합니다. [#2985](https://github.com/titicacadev/triple-frontend/pull/2985)
- [Chat refactor] messagesReducer를 추가합니다. [#2986](https://github.com/titicacadev/triple-frontend/pull/2986)
- [epic] Chat 리팩토링 [#2994](https://github.com/titicacadev/triple-frontend/pull/2994)
- [Chat refactor] BubbleUI의 prop 변경 [#2998](https://github.com/titicacadev/triple-frontend/pull/2998)
- [Chat refactor] 사용하지 않는 파일을 제거합니다. [#2999](https://github.com/titicacadev/triple-frontend/pull/2999)
- [Chat refactor] 메시지 리스트를 렌더링하는 Messages 컴포넌트 생성 [#3003](https://github.com/titicacadev/triple-frontend/pull/3003)
- [Chat refactor] Bubble의 default click 설정 [#3008](https://github.com/titicacadev/triple-frontend/pull/3008)
- [chat refactor] constants의 export를 추가하고 다중 이미지 업로드 옵션을 추가합니다. [#3031](https://github.com/titicacadev/triple-frontend/pull/3031)
- [Chat refactor] Bubble 스타일 설정 추가 및 스토리북 추가 [#3044](https://github.com/titicacadev/triple-frontend/pull/3044)
- [chat refactor] scroll context에 스크롤 방지 옵션을 추가합니다. [#3051](https://github.com/titicacadev/triple-frontend/pull/3051)
- [Chat] react-triple-client-interfaces의 Dependencies 수정 [#3088](https://github.com/titicacadev/triple-frontend/pull/3088)
- [chat refactor] 메세지에 unreadCount를 계산하기 위한 prop을 추가합니다. [#3095](https://github.com/titicacadev/triple-frontend/pull/3095)
- [Chat Refactor] MessagesReducer의 액션을 추가하고 타입을 수정합니다. [#3104](https://github.com/titicacadev/triple-frontend/pull/3104)

## v13.17.0

### replies

- 댓글 작성, 삭제 handle function prop을 추가합니다 [#3098](https://github.com/titicacadev/triple-frontend/pull/3098)

### reply

- 댓글 작성, 삭제 handle function prop을 추가합니다 [#3098](https://github.com/titicacadev/triple-frontend/pull/3098)

### triple-document

- [triple-document] 추천 일정의 '내 일정으로 담기' 로직을 수정합니다. [#3096](https://github.com/titicacadev/triple-frontend/pull/3096)

## v13.16.0

### directions-finder

- [directions-finder] grab 호출 버튼에 Intersecting Observer를 추가합니다. [#3082](https://github.com/titicacadev/triple-frontend/pull/3082)

### i18n

- [Review] 예약 상품 상세 정보 노출 [#3070](https://github.com/titicacadev/triple-frontend/pull/3070)

### meta-tags

- [meta-tags] reviewRating에 bestRating, worstRating을 추가합니다. [#3079](https://github.com/titicacadev/triple-frontend/pull/3079)

### review

- [Review] 예약 상품 상세 정보 노출 [#3070](https://github.com/titicacadev/triple-frontend/pull/3070)

## v13.15.0

### directions-finder

- [directions-finder] grab 호출 버튼을 추가합니다. [#3032](https://github.com/titicacadev/triple-frontend/pull/3032)

### i18n

- [directions-finder] grab 호출 버튼을 추가합니다. [#3032](https://github.com/titicacadev/triple-frontend/pull/3032)

### meta-tags

- [meta-tags] 리뷰 스니펫에 inLanguage 항목을 추가합니다. [#3074](https://github.com/titicacadev/triple-frontend/pull/3074)

## v13.14.2

### react-contexts

- [react-contexts] 틱톡 픽셀의 누락된 track 메소드를 추가합니다. [#3064](https://github.com/titicacadev/triple-frontend/pull/3064)

## v13.14.1

### resource-list-element

- ExtendedResourceListElement badge 디자인 수정 [#3057](https://github.com/titicacadev/triple-frontend/pull/3057)

### triple-header

- [TFC-52] 트리플 헤더 블링크 이슈 [#2783](https://github.com/titicacadev/triple-frontend/pull/2783)

## v13.14.0

### chat

- [Chat] 좋아요 기능 추가 [#3017](https://github.com/titicacadev/triple-frontend/pull/3017)

### react-contexts

- [react-contexts] 틱톡 pixel 이벤트를 추가합니다. [#3053](https://github.com/titicacadev/triple-frontend/pull/3053)

### resource-list-element

- ExtendedResourceListElement에 badge 영역 추가 [#3048](https://github.com/titicacadev/triple-frontend/pull/3048)

## v13.13.0

### poi-detail

- [type-definitions] GuestModeType 타입 추가 및 적용 [#3028](https://github.com/titicacadev/triple-frontend/pull/3028)

### poi-list-elements

- [type-definitions] GuestModeType 타입 추가 및 적용 [#3028](https://github.com/titicacadev/triple-frontend/pull/3028)

### triple-document

- [triple-document] 가이드 일정영역 서울콘 대응 [#3025](https://github.com/titicacadev/triple-frontend/pull/3025)
- [type-definitions] GuestModeType 타입 추가 및 적용 [#3028](https://github.com/titicacadev/triple-frontend/pull/3028)

### type-definitions

- [type-definitions] GuestModeType 타입 추가 및 적용 [#3028](https://github.com/titicacadev/triple-frontend/pull/3028)

## v13.12.0

### view-utilities

- [view-utilities] 로그인 없이 이동할 수 있는 페이지 주소 목록에 웹일정판 path 추가 [#3015](https://github.com/titicacadev/triple-frontend/pull/3015)

## v13.11.0

### poi-detail

- [Poi-detail] image carousel 서울콘 대응 [#2991](https://github.com/titicacadev/triple-frontend/pull/2991)

### poi-list-elements

- [Poi-list-elements] POI의 이름과 리전명 영역에 대표어값이 가장 우선적으로 표기되도록 함 [#2989](https://github.com/titicacadev/triple-frontend/pull/2989)
- [Poi-list-elements] POI 리스트에서 스크랩 버튼을 숨길 수 있도록 함 [#2990](https://github.com/titicacadev/triple-frontend/pull/2990)

### standard-action-handler

- [standard-action-handler] API 응답 일반화 노출 기능을 추가합니다. [#2947](https://github.com/titicacadev/triple-frontend/pull/2947)

### triple-document

- [Poi-list-elements] POI 리스트에서 스크랩 버튼을 숨길 수 있도록 함 [#2990](https://github.com/titicacadev/triple-frontend/pull/2990)

## v13.10.1

### chat

- [chat] beforeSendMessages를 리듀서에서 제거합니다. [#2988](https://github.com/titicacadev/triple-frontend/pull/2988)

## v13.10.0

### action-sheet

- [action-sheet] action sheet item에 아이콘 추가 [#2979](https://github.com/titicacadev/triple-frontend/pull/2979)

### app-installation-cta

- [react-hooks] useLocalStorage, useSessionStorage 추가 [#2961](https://github.com/titicacadev/triple-frontend/pull/2961)

### chat

- [Chat] Message에 sender 정보를 포함하는 api 변경에 대응합니다. [#2973](https://github.com/titicacadev/triple-frontend/pull/2973)

### poi-detail

- [react-hooks] useLocalStorage, useSessionStorage 추가 [#2961](https://github.com/titicacadev/triple-frontend/pull/2961)

### react-hooks

- [react-hooks] useLocalStorage, useSessionStorage 추가 [#2961](https://github.com/titicacadev/triple-frontend/pull/2961)

## v13.9.0

### chat

- [Chat] received, sent 구분 기준 변경 [#2968](https://github.com/titicacadev/triple-frontend/pull/2968)
- [chat] beforeSentMessages 초기 props만 저장하도록 수정 [#2969](https://github.com/titicacadev/triple-frontend/pull/2969)
- [chat] beforeSentMessages 기본값 불필요하므로 제거 [#2975](https://github.com/titicacadev/triple-frontend/pull/2975)

### footer

- [footer] Award Footer의 인증마크 변경 [#2974](https://github.com/titicacadev/triple-frontend/pull/2974)

## v13.8.1

### chat

- [chat] 채팅 인입 후 메시지 전송시 상품/예약정보 중복노출 [#2960](https://github.com/titicacadev/triple-frontend/pull/2960)

## v13.8.0

### chat

- [Chat] Product bubble 추가 [#2891](https://github.com/titicacadev/triple-frontend/pull/2891)

### core-elements

- [Chat] Product bubble 추가 [#2891](https://github.com/titicacadev/triple-frontend/pull/2891)

## v13.7.0

### chat

- [Chat] message에 blinded 필드를 추가합니다. [#2886](https://github.com/titicacadev/triple-frontend/pull/2886)
- [Chat] 전송 실패 메시지 처리 방식 변경 [#2938](https://github.com/titicacadev/triple-frontend/pull/2938)
- [Chat] RoomMetadata의 타입을 변경합니다. [#2939](https://github.com/titicacadev/triple-frontend/pull/2939)
- [Chat] 채팅 bubble의 link 스타일을 수정합니다. [#2944](https://github.com/titicacadev/triple-frontend/pull/2944)

## v13.6.0

### i18n

- i18n 영어 설정을 추가합니다. [#2923](https://github.com/titicacadev/triple-frontend/pull/2923)

### map

- 구글맵 load script 언어 옵션 추가 [#2918](https://github.com/titicacadev/triple-frontend/pull/2918)

## v13.5.0

### i18n

- [reviews] 리뷰에 사진/동영상 필터를 지원합니다. [#2896](https://github.com/titicacadev/triple-frontend/pull/2896)

### review

- [reviews] 리뷰에 사진/동영상 필터를 지원합니다. [#2896](https://github.com/titicacadev/triple-frontend/pull/2896)
- [reviews] 코드를 리팩토링합니다. [#2904](https://github.com/titicacadev/triple-frontend/pull/2904)
- [reviews] 정렬 옵션 및 필터가 싱크되도록 지원합니다. [#2907](https://github.com/titicacadev/triple-frontend/pull/2907)

### web-storage

- web storage error boundary 컴포넌트 타입 수정 [#2912](https://github.com/titicacadev/triple-frontend/pull/2912)

## v13.4.0

### chat

- [Chat] RoomInterface에 roomType을 추가합니다. [#2900](https://github.com/titicacadev/triple-frontend/pull/2900)
- [Chat] 채팅 리트라이 이벤트를 위한 props를 추가합니다. [#2905](https://github.com/titicacadev/triple-frontend/pull/2905)

### common

- tsconfig emit 관련 설정을 tsconfig.build.json 으로 이동 [#2898](https://github.com/titicacadev/triple-frontend/pull/2898)

### core-elements

- image-source 패키지 추가 [#2876](https://github.com/titicacadev/triple-frontend/pull/2876)

### image-carousel

- image-source 패키지 추가 [#2876](https://github.com/titicacadev/triple-frontend/pull/2876)

### image-source

- image-source 패키지 추가 [#2876](https://github.com/titicacadev/triple-frontend/pull/2876)

### location-properties

- [LocationProperties] 액션시트에서 누락된 주소를 복원합니다. [#2903](https://github.com/titicacadev/triple-frontend/pull/2903)

### poi-detail

- image-source 패키지 추가 [#2876](https://github.com/titicacadev/triple-frontend/pull/2876)

### review

- 리뷰 컴포넌트를 리펙토링합니다. [#2892](https://github.com/titicacadev/triple-frontend/pull/2892)

### triple-document

- image-source 패키지 추가 [#2876](https://github.com/titicacadev/triple-frontend/pull/2876)

### triple-media

- image-source 패키지 추가 [#2876](https://github.com/titicacadev/triple-frontend/pull/2876)

## v13.3.0

### chat

- [Chat] iOS 모바일에서 init 시점에 infinite scroll 로직 실행되는 오류 수정 [#2868](https://github.com/titicacadev/triple-frontend/pull/2868)
- Chat에 disableUnreadCount props를 추가합니다. [#2884](https://github.com/titicacadev/triple-frontend/pull/2884)

### resource-list-element

- [resource-list-element] 광고 표기 위치와 디자인을 수정합니다. [#2858](https://github.com/titicacadev/triple-frontend/pull/2858)

## v13.2.4

### slider

- [slider] SliderBase disabled 상태 추가 [#2824](https://github.com/titicacadev/triple-frontend/pull/2824)

## v13.2.3

### chat

- [chat] chat image url 생성 시 cloudinaryBucket을 우선적으로 사용하도록 변경 [#2838](https://github.com/titicacadev/triple-frontend/pull/2838)

### modals

- (modal) modal flexible 옵션을 추가합니다. [#2841](https://github.com/titicacadev/triple-frontend/pull/2841)

## v13.2.2

### directions-finder

- 현지에서 길묻기 ellipsis 옵션 삭제 [#2834](https://github.com/titicacadev/triple-frontend/pull/2834)

### view-utilities

- feat: debounce에 leading, trailing 옵션 추가 [#2740](https://github.com/titicacadev/triple-frontend/pull/2740)

## v13.2.1

### react-contexts

- react-contexts의 middleware export 경로를 복구합니다. [#2829](https://github.com/titicacadev/triple-frontend/pull/2829)

## v13.2.0

### color-palette

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### core-elements

- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)
- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### date-picker

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)
- mockdate 대신 storybook-mock-date-decorator 사용 [#2816](https://github.com/titicacadev/triple-frontend/pull/2816)

### directions-finder

- 현지에서 길묻기 팝업 글씨 크기를 조정합니다. [#2812](https://github.com/titicacadev/triple-frontend/pull/2812)

### fetcher

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### image-carousel

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### map

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### meta-tags

- app directory용 메타태그 유틸 함수를 작성합니다. [#2789](https://github.com/titicacadev/triple-frontend/pull/2789)
- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)
- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)
- app-directory 관련 코드를 TF에서 삭제합니다. [#2826](https://github.com/titicacadev/triple-frontend/pull/2826)

### modals

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### public-header

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### react-contexts

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)
- app-directory 관련 코드를 TF에서 삭제합니다. [#2826](https://github.com/titicacadev/triple-frontend/pull/2826)

### react-triple-client-interfaces

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### replies

- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)
- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### router

- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)
- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### scrap-button

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### scroll-spy

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### scroll-to-element

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### triple-email-document

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### triple-fallback-action

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### ui-flow

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### user-verification

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)

### view-utilities

- 테스트 코드 린트 [#2815](https://github.com/titicacadev/triple-frontend/pull/2815)
- app-directory 관련 코드를 TF에서 삭제합니다. [#2826](https://github.com/titicacadev/triple-frontend/pull/2826)

## v13.2.0

### core-elements

- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)

### date-picker

- mockdate 대신 storybook-mock-date-decorator 사용 [#2816](https://github.com/titicacadev/triple-frontend/pull/2816)

### directions-finder

- 현지에서 길묻기 팝업 글씨 크기를 조정합니다 [#2812](https://github.com/titicacadev/triple-frontend/pull/2812)

### meta-tags

- app directory용 메타태그 유틸 함수를 작성합니다. [#2789](https://github.com/titicacadev/triple-frontend/pull/2789)
- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)
- app-directory 관련 코드를 TF에서 삭제합니다. [#2826](https://github.com/titicacadev/triple-frontend/pull/2826)

### react-contexts

- app-directory 관련 코드를 TF에서 삭제합니다. [#2826](https://github.com/titicacadev/triple-frontend/pull/2826)

### replies

- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)

### router

- react-test-renderer -> testing-library 변경 [#2814](https://github.com/titicacadev/triple-frontend/pull/2814)

### view-utilities

- app-directory 관련 코드를 TF에서 삭제합니다. [#2826](https://github.com/titicacadev/triple-frontend/pull/2826)

## v13.1.3

### react-contexts

- firebase 버전을 v9.15.0으로 다운그레이드합니다. [#2811](https://github.com/titicacadev/triple-frontend/pull/2811)

## v13.1.2

### react-contexts

- [react-contexts] ios cookie fixation 기준 버전 변경 [#2800](https://github.com/titicacadev/triple-frontend/pull/2800)

## v13.1.1

### triple-document

- 쿠폰 색상 HEX fixation 을 지원합니다. [#2791](https://github.com/titicacadev/triple-frontend/pull/2791)

### view-utilities

- view-utilities의 package.json main 필드를 복구합니다. [#2792](https://github.com/titicacadev/triple-frontend/pull/2792)

## v13.1.0

### action-sheet

- focus trap 테스트가 랜덤하게 실패하는 현상 수정 [#2785](https://github.com/titicacadev/triple-frontend/pull/2785)

### core-elements

- workspace root의 의존성 제거 및 이동 [#2777](https://github.com/titicacadev/triple-frontend/pull/2777)

### form

- workspace root의 의존성 제거 및 이동 [#2777](https://github.com/titicacadev/triple-frontend/pull/2777)

### map

- workspace root의 의존성 제거 및 이동 [#2777](https://github.com/titicacadev/triple-frontend/pull/2777)

### modals

- TransitionModal에 community TransitionType 추가 [#2774](https://github.com/titicacadev/triple-frontend/pull/2774)
- workspace root의 의존성 제거 및 이동 [#2777](https://github.com/titicacadev/triple-frontend/pull/2777)
- focus trap 테스트가 랜덤하게 실패하는 현상 수정 [#2785](https://github.com/titicacadev/triple-frontend/pull/2785)

### popup

- focus trap 테스트가 랜덤하게 실패하는 현상 수정 [#2785](https://github.com/titicacadev/triple-frontend/pull/2785)

### react-contexts

- app 디렉토리용 eventTrackingProvider를 작성합니다. [#2768](https://github.com/titicacadev/triple-frontend/pull/2768)
- /api/users/me의 타입을 최신화합니다. [#2770](https://github.com/titicacadev/triple-frontend/pull/2770)
- workspace root의 의존성 제거 및 이동 [#2777](https://github.com/titicacadev/triple-frontend/pull/2777)

### triple-document

- triple-document 쿠폰 개선 [#2743](https://github.com/titicacadev/triple-frontend/pull/2743)

### view-utilities

- view-utilities에 common, client export 경로를 추가하고 query 관련 유틸함수를 작성합니다. [#2784](https://github.com/titicacadev/triple-frontend/pull/2784)

## v13.0.2

### review

- TF13 review fix [#2766](https://github.com/titicacadev/triple-frontend/pull/2766)

## v13.0.1

### ad-banners

- Revert egjs flicking 업데이트 [#2765](https://github.com/titicacadev/triple-frontend/pull/2765)

### carousel

- Revert egjs flicking 업데이트 [#2765](https://github.com/titicacadev/triple-frontend/pull/2765)

### image-carousel

- Revert egjs flicking 업데이트 [#2765](https://github.com/titicacadev/triple-frontend/pull/2765)

### poi-detail

- Revert egjs flicking 업데이트 [#2765](https://github.com/titicacadev/triple-frontend/pull/2765)

## v13

### action-sheet

- Headless UI -> Floating UI 변경 [#2567](https://github.com/titicacadev/triple-frontend/pull/2567)

### Breaking Change

- [meta-tag] 구조화된 데이터 스크립트를 작성합니다. [#2674](https://github.com/titicacadev/triple-frontend/pull/2674)

### core-elements

- Headless UI -> Floating UI 변경 [#2567](https://github.com/titicacadev/triple-frontend/pull/2567)

### i18n

- i18n 번체 토큰 디렉토리 이름을 zh에서 zh-TW로 수정합니다. [#2446](https://github.com/titicacadev/triple-frontend/pull/2446)

### meta-tags

- [meta-tag] 구조화된 데이터 스크립트를 작성합니다. [#2674](https://github.com/titicacadev/triple-frontend/pull/2674)
- 구조화된 데이터에 ReviewScript를 추가합니다. [#2726](https://github.com/titicacadev/triple-frontend/pull/2726)

### modals

- Headless UI -> Floating UI 변경 [#2567](https://github.com/titicacadev/triple-frontend/pull/2567)

### popup

- Headless UI -> Floating UI 변경 [#2567](https://github.com/titicacadev/triple-frontend/pull/2567)

### review

- [TFC-97] 호텔 리뷰 개선 - 더보기 UX 개선 (v13 용) [#2734](https://github.com/titicacadev/triple-frontend/pull/2734)
- [review] mutation, 디자인 버그 수정 [#2736](https://github.com/titicacadev/triple-frontend/pull/2736)

## v12.21.1

### triple-document

- [triple-document] POI 가격 0원 개선 - 0원일 때 일시품절 텍스트로 노출 [#2737](https://github.com/titicacadev/triple-frontend/pull/2737)

## v12.21.0

### review

- [TFC-97] 호텔 리뷰 개선 - 더보기 UX 개선 [#2731](https://github.com/titicacadev/triple-frontend/pull/2731)

## v12.20.0

### chat

- chat 구현에서 Polling을 제거하고 스크롤 동작 버그를 수정합니다. [#2687](https://github.com/titicacadev/triple-frontend/pull/2687)

## v12.19.1

### core-elements

- [core-elements] radio-group, checkbox-group export [#2707](https://github.com/titicacadev/triple-frontend/pull/2707)

## v12.19.0

### footer

- [footer] 푸터 사명 변경 [#2690](https://github.com/titicacadev/triple-frontend/pull/2690)

### image-carousel

- 비디오 자동 재생 시에 간헐적으로 발생하는 NotAllowedError를 핸들링합니다. [#2693](https://github.com/titicacadev/triple-frontend/pull/2693)

### review

- 비디오 자동 재생 시에 간헐적으로 발생하는 NotAllowedError를 핸들링합니다. [#2693](https://github.com/titicacadev/triple-frontend/pull/2693)

## v12.18.3

### constants

- e-mail 유효성 검증이 특수문자, 이모지 등을 허용하는 현상을 수정합니다. [#2649](https://github.com/titicacadev/triple-frontend/pull/2649)

## v12.18.2

### modals

- [modals] Modal height가 스크린 높이보다 커도 스크롤 가능하도록 수정 [#2661](https://github.com/titicacadev/triple-frontend/pull/2661)

### triple-document

- [triple-document] 표시가보다 판매가가 큰 경우 할인율과 표시가가 미노출되도록 수정합니다. [#2662](https://github.com/titicacadev/triple-frontend/pull/2662)

## v12.18.1

### footer

- [Footer] 로그인 버튼 a -> button으로 수정 [#2646](https://github.com/titicacadev/triple-frontend/pull/2646)

### meta-tags

- [meta-tags] article script의 date 형식에 validation을 추가합니다. [#2653](https://github.com/titicacadev/triple-frontend/pull/2653)

## v12.18.0

### router

- [ Router ] LocalLink 컴포넌트에 shallow property를 추가합니다. [#2639](https://github.com/titicacadev/triple-frontend/pull/2639)

## v12.17.0

### core-elements

- [core-elements] CheckboxGroup, RadioGroup 접근성 수정 [#2581](https://github.com/titicacadev/triple-frontend/pull/2581)
- [core-elements] Fieldset 추가 [#2582](https://github.com/titicacadev/triple-frontend/pull/2582)

### review

- PinnedMessage의 text 필드를 추가합니다. [#2606](https://github.com/titicacadev/triple-frontend/pull/2606)

### triple-email-document

- [triple-email-document] 이메일에서 도메인이 없는 링크 클릭 시, 정상적으로 랜딩되지 않는 이슈를 수정합니다. [#2559](https://github.com/titicacadev/triple-frontend/pull/2559)
- [triple-email-document] 링크 Element에 존재하는 URL 변환하는 로직을 제거합니다. [#2610](https://github.com/titicacadev/triple-frontend/pull/2610)

## v12.16.0

### core-elements

- react-aria 패키지 제거 [#2551](https://github.com/titicacadev/triple-frontend/pull/2551)

### modals

- 외부 클릭하면 닫는 테스트가 랜덤하게 실패하는 문제 수정 [#2560](https://github.com/titicacadev/triple-frontend/pull/2560)

### action-sheet

- 외부 클릭하면 닫는 테스트가 랜덤하게 실패하는 문제 수정 [#2560](https://github.com/titicacadev/triple-frontend/pull/2560)

### app-installation-cta

- 플로팅 버튼 디자인을 v1 버전으로 되돌립니다 [#2561](https://github.com/titicacadev/triple-frontend/pull/2561)

## v12.15.0

### common

- CHANGELOG 자동화를 구현합니다. [#2518](https://github.com/titicacadev/triple-frontend/pull/2518)
- chore: 불필요한 의존성 제거 [#2519](https://github.com/titicacadev/triple-frontend/pull/2519)
- ci: renovate-pr-fix 삭제 [#2533](https://github.com/titicacadev/triple-frontend/pull/2533)

### action-sheet

- ActionSheet, Modal, Popup 접근성 테스트 추가 [#2480](https://github.com/titicacadev/triple-frontend/pull/2480)

### review

- 리뷰 목록에 pinned message를 노출합니다. [#2403](https://github.com/titicacadev/triple-frontend/pull/2403)

### popup

- [popup] 외부 클릭시 닫는 테스트 제거 [#2532](https://github.com/titicacadev/triple-frontend/pull/2532)
- ActionSheet, Modal, Popup 접근성 테스트 추가 [#2480](https://github.com/titicacadev/triple-frontend/pull/2480)

### modals

- [ Modals ] Confirm body에 css prop을 추가합니다. [#2546](https://github.com/titicacadev/triple-frontend/pull/2546)
- ActionSheet, Modal, Popup 접근성 테스트 추가 [#2480](https://github.com/titicacadev/triple-frontend/pull/2480)

## 12.14.0

- lint 캐시 가능하도록 설정 [#2471](https://github.com/titicacadev/triple-frontend/pull/2471)

### action-sheet

- action-sheet-item에 notice 아이콘 추가 [#2472](https://github.com/titicacadev/triple-frontend/pull/2472)

## 12.13.0

- turbo 제거, lerna + nx 사용 [#2462](https://github.com/titicacadev/triple-frontend/pull/2465)
- 타입스크립트 빌드 컨픽 개선 [#2465](https://github.com/titicacadev/triple-frontend/pull/2462)

### core-elements

- List 에 marker prop 을 추가합니다. [#2463](https://github.com/titicacadev/triple-frontend/pull/2463)

### modals

- Panel에 webkit-mask-image 속성 제거 [#2468](https://github.com/titicacadev/triple-frontend/pull/2468)

### react-triple-client-interfaces

- TripleClientMetadataContext에 shouldUpdateUserAgentOnMount props를 추가합니다 [#2464](https://github.com/titicacadev/triple-frontend/pull/2464)

## 12.12.2

### replies

- 댓글 따봉 아이콘이 짤리던 현상을 수정합니다. [#2458](https://github.com/titicacadev/triple-frontend/pull/2458)

## 12.12.1

### triple-media

- 이미지 여백 제거를 위해 display: block 속성 추가 [#2456](https://github.com/titicacadev/triple-frontend/pull/2456)

## 12.12.0

- Headless UI으로 변경 [#2432](https://github.com/titicacadev/triple-frontend/pull/2432)
  - React Aria에 버그가 많아서 Accessible overlay 컴포넌트 라이브러리를 [Headless UI](https://headlessui.com/)로 변경합니다.

  - 변경된 컴포넌트:
    - action-sheet
    - core-elements/Drawer
    - drawer-button
    - modals
    - popup

  - react-transition-group -> Headless UI Transition으로 변경합니다.
  - ActionSheet, Modals, Popup이 열려 있으면 스크롤이 막힙니다.
  - Modal.Action에 cursor: pointer를 추가합니다.
  - Drawer, DrawerButton에 `duration` prop을 추가합니다.

### view-utilities

- PUBLIC_ROUTELIST_REGEXES에 여행기 상세 주소 추가 [#2455](https://github.com/titicacadev/triple-frontend/pull/2455)

### default-footer

- Default Footer 에서 css 속성 사용 가능하도록 수정 [#2440](https://github.com/titicacadev/triple-frontend/pull/2440)

## 12.11.0

### common

- Typescript 최신버전 적용 및 타입에러 수정 [#2435](https://github.com/titicacadev/triple-frontend/pull/2435)

### ab-experiments

- CSR 방식으로 A/B테스트 메타데이터를 가져올 때 세션 유무는 체크하지 않도록 합니다. [#2436](https://github.com/titicacadev/triple-frontend/pull/2436)

### triple-header

- 트리플헤더 날아오기 효과의 속도를 변경합니다. [#2414](https://github.com/titicacadev/triple-frontend/pull/2414)

## 12.10.0

### meta-tags

- og-tag img URL을 변경합니다. [#2430](https://github.com/titicacadev/triple-frontend/pull/2430)

## 12.9.0

### common

- npm 9 이상 버전 사용 [#2426](https://github.com/titicacadev/triple-frontend/pull/2426)

### app-installation-cta

- 플로팅 버튼 3차 UI 변경안 반영 [#2417](https://github.com/titicacadev/triple-frontend/pull/2417)

### meta-tags

- breadcrumb, article 스크립트를 추가합니다. [#2400](https://github.com/titicacadev/triple-frontend/pull/2400)
- ThemeColorMeta의 기본 props color와 README를 일부 수정합니다. [#2428](https://github.com/titicacadev/triple-frontend/pull/2428)

## 12.8.1

### directions-finder

- drawer action 조건 추가 [#2424](https://github.com/titicacadev/triple-frontend/pull/2424)

## 12.8.0

### core-elements

- img, video global style height: auto 제거 [#2422](https://github.com/titicacadev/triple-frontend/pull/2422)

### meta-tags

- Theme color를 추가합니다. [#2420](https://github.com/titicacadev/triple-frontend/pull/2420)

### ui-flow

- authGuard의 refreshInAppSession 실행조건을 수정합니다. [#2419](https://github.com/titicacadev/triple-frontend/pull/2419)

## 12.7.0

### core-elements

- Drawer의 layeringProps을 제거하고 z-index를 9999로 변경합니다. [#2404](https://github.com/titicacadev/triple-frontend/pull/2404)
- Drawer를 Portal로 렌더합니다. [#2404](https://github.com/titicacadev/triple-frontend/pull/2404)
- gender-selector 에 disabled 속성을 추가합니다. [#2410](https://github.com/titicacadev/triple-frontend/pull/2410)

### drawer-button

- DrawerButton의 layeringProps를 제거합니다. [#2404](https://github.com/titicacadev/triple-frontend/pull/2404)

### modals

- DrawerButton의 layeringProps를 제거합니다. [#2404](https://github.com/titicacadev/triple-frontend/pull/2404)
- 설치유도팝업 문구를 수정합니다. [#2415](https://github.com/titicacadev/triple-frontend/pull/2415)

### popup

- Popup의 layeringProps을 제거하고 z-index를 9999로 변경합니다. [#2404](https://github.com/titicacadev/triple-frontend/pull/2404)
- Popup을 Portal로 렌더합니다 [#2404](https://github.com/titicacadev/triple-frontend/pull/2404)

## 12.6.0

### intersection-observer

- Lazy loaded IntersectionObserver를 deprecate 합니다. [#2407](https://github.com/titicacadev/triple-frontend/pull/2407)

## 12.5.2

### review

- 최근여행 리뷰 개수 표시 오류를 수정합니다. [#2401](https://github.com/titicacadev/triple-frontend/pull/2401)

## 12.5.1

### public-header

- PublicHeader의 일부 css 속성을 수정합니다 [#2397](https://github.com/titicacadev/triple-frontend/pull/2397)

## 12.5.0

### common

- @titicaca/next-i18next 추가 [#2388](https://github.com/titicacadev/triple-frontend/pull/2388)
- 의존성 버전을 wildcard로 변경 [#2390](https://github.com/titicacadev/triple-frontend/pull/2390)

### chat, core-elements, react-contexts

- 더 적절한 의존성 사용 [#2389](https://github.com/titicacadev/triple-frontend/pull/2389)

### modal

- 설치유도팝업 TransitionType에 loungeHome을 추가합니다. [#2392](https://github.com/titicacadev/triple-frontend/pull/2392)

### triple-header

- layout shift 를 개선합니다. [#2391](https://github.com/titicacadev/triple-frontend/pull/2391)

### view-utilities

- public route list에 /redirect를 제거하고 /benefit을 추가합니다. [#2396](https://github.com/titicacadev/triple-frontend/pull/2396)

## 12.4.0

### common

- 리뷰, 푸터, 설치/로그인 유도 팝업에 적용된 이벤트 로깅 로직을 수정합니다. [#2354](https://github.com/titicacadev/triple-frontend/pull/2354)

### footer

- Award 푸터를 추가합니다. [#2375](https://github.com/titicacadev/triple-frontend/pull/2375)

### listing-filter, review

- ui-renewal 디자인 개선사항을 수정합니다. [#2378](https://github.com/titicacadev/triple-frontend/pull/2378)

### public-header

- 라운지 홈 공통헤더를 추가합니다. [#2342](https://github.com/titicacadev/triple-frontend/pull/2342)

## 12.3.0

### action-sheet

- pointer-events css 추가 [#2380](https://github.com/titicacadev/triple-frontend/pull/2380)

### action-sheet, modals

- underlayProps, overlayProps, FocusScope 위치 변경 [#2370](https://github.com/titicacadev/triple-frontend/pull/2370)

### poi-detail

- POI 상세페이지에서 사용되는 Actions 컴포넌트 하단 HR1 너비를 수정합니다. [#2372](https://github.com/titicacadev/triple-frontend/pull/2372)

### review

- 댓글 개수를 표시할 때 pinned message도 포함하여 표시합니다. [#2373](https://github.com/titicacadev/triple-frontend/pull/2373)

### triple-header

- 트리플헤더를 추가합니다. [#2329](https://github.com/titicacadev/triple-frontend/pull/2329)

### view-utilities

- parsedQuery의 특정 key 값을 추출하는 함수를 생성합니다. [#2368](https://github.com/titicacadev/triple-frontend/pull/2368)

## 12.2.1

### action-sheet, modals

- @react/aria에서 리랜더를 유발하는 usePreventScroll 제거 [#2363](https://github.com/titicacadev/triple-frontend/pull/2363)

## 12.2.0

### action-sheet

- 액션시트 열고 닫히는 transition이 일부 브라우저에서 layout shift 되지 않도록 수정 [#2358](https://github.com/titicacadev/triple-frontend/pull/2358)

### common

- CI 속도 개선 [#2340](https://github.com/titicacadev/triple-frontend/pull/2340)
- CD workflow 에러 수정 [#2351](https://github.com/titicacadev/triple-frontend/pull/2351)
- css prop과 centered prop이 충돌하는 문제 수정 [#2352](https://github.com/titicacadev/triple-frontend/pull/2352)

### core-elements

- story title을 소문자로 변경 [#2345](https://github.com/titicacadev/triple-frontend/pull/2345)
- ConfirmSelector 디자인 수정 [#2359](https://github.com/titicacadev/triple-frontend/pull/2359)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/titicacadev/triple-frontend/pull/2364)

### modals

- modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/titicacadev/triple-frontend/pull/2347)

### poi-detail

- Actions 스토리가 빌드마다 변경되는 현상 수정 [#2346](https://github.com/titicacadev/triple-frontend/pull/2346)

### view-utilities

- public route list에 `/redirect`를 추가합니다. [#2355](https://github.com/titicacadev/triple-frontend/pull/2355)

## 12.1.1

### action-sheet

- 액션시트 아이템의 클릭 이벤트 조건을 수정합니다. [#2338](https://github.com/titicacadev/triple-frontend/pull/2338)

## 12.1.0

### common

- i18n translation key에 한국어 fallback을 추가합니다 [#2332](https://github.com/titicacadev/triple-frontend/pull/2332)

### chat

- 초기 메시지가 prop으로 있을 경우 api 호출하지 않도록 수정 [#2331](https://github.com/titicacadev/triple-frontend/pull/2331)

## 12.0.0 (ui-renewal)

### common

- Storybook을 root에서 빌드 [#2189](https://github.com/titicacadev/triple-frontend/pull/2189)
- css prop 추가 [#2153](https://github.com/titicacadev/triple-frontend/pull/2153)
- Global css prop 사용 [#2284](https://github.com/titicacadev/triple-frontend/pull/2284)
- global-style 개선 [#2194](https://github.com/titicacadev/triple-frontend/pull/2194)
- color-palette 대신 css variable 사용 [#2280](https://github.com/titicacadev/triple-frontend/pull/2280)
- Compounded 컴포넌트(Subcomponent)를 고유의 컴포넌트로 분리 [#2303](https://github.com/titicacadev/triple-frontend/pull/2303)
- build:ci 스크립트 제거 [#2276](https://github.com/titicacadev/triple-frontend/pull/2276)
- peer dependencies 수정 [#2286](https://github.com/titicacadev/triple-frontend/pull/2286)

### action-sheet

ActionSheet

- ActionSheet 컴포넌트 접근성 개선 [#2229](https://github.com/titicacadev/triple-frontend/pull/2229)
  - Portal에 렌더합니다.
- ESC 버튼을 누르면 액션시트를 닫습니다.
- 외부의 오버레이를 누르면 액션시트를 닫습니다.
- 키보드를 사용한 포커스는 액션시트 내부에서만 이동합니다. 액션시트가 닫히면 이전의 포커스로 되돌아 갑니다.
- (Breaking Change) 액션시트 내에서 발생한 이벤트가 버블링 되도록 변경되었습니다.
- (Breaking Change) export default가 제거되었습니다. [#2281](https://github.com/titicacadev/triple-frontend/pull/2281)

### chat

- triple-chat-frontend를 기반으로 chat widget component를 생성합니다. [#2246](https://github.com/titicacadev/triple-frontend/pull/2246)

### core-elements

Accordion

- 접근성을 개선합니다. [#2217](https://github.com/titicacadev/triple-frontend/pull/2217)
- (Breaking Change) Context를 사용해서 active prop을 각자 서브 컴포넌트마다 전달하지 않고 상위 Accordion 컴포넌트에만 전달할 수 있도록 변경합니다.

Button

- 리팩토링 [#2264](https://github.com/titicacadev/triple-frontend/pull/2264)

Checkbox

- Checkbox, CheckboxGroup 컴포넌트가 새로 추가되었습니다. [#2239](https://github.com/titicacadev/triple-frontend/pull/2239)
- 선택된 모양을 이미지 대신 svg로 그리도록 변경합니다.
- `variant?: 'square' | 'rounded'` prop을 추가합니다. (기본값 'square')

ConfirmSelector

- 리팩토링 [#2251](https://github.com/titicacadev/triple-frontend/pull/2251)
  - 기존의 prop중에 안 쓰이거나 사실상 필요 없는 것들을 제거했습니다. `placeholder, textAlign, borderless, fillType, error, padding`

FormField

- withField hoc를 대체할 FormField 컴포넌트 추가 [#2257](https://github.com/titicacadev/triple-frontend/pull/2257)

GenderSelector

- 리팩토링 [#2253](https://github.com/titicacadev/triple-frontend/pull/2253)

Input

- 접근성을 개선합니다. [#2274](https://github.com/titicacadev/triple-frontend/pull/2274)
- (Breaking Change) onChange 두번째 파라미터 value를 제거합니다.

NumericSpinner

- 접근성을 개선합니다. [#2250](https://github.com/titicacadev/triple-frontend/pull/2250)

Portal

- Portal 컴포넌트를 추가합니다. [#2228](https://github.com/titicacadev/triple-frontend/pull/2228)

Radio

- 접근성을 개선합니다. [#2235](https://github.com/titicacadev/triple-frontend/pull/2235)
- RadioGroup 컴포넌트가 새로 추가되었습니다.
- 선택된 모양을 이미지 대신 css로 그리도록 변경합니다.

Select

- Select 컴포넌트 접근성 개선 [#2259](https://github.com/titicacadev/triple-frontend/pull/2259)

Tabs

- Tabs 컴포넌트 접근성 개선 [#2270](https://github.com/titicacadev/triple-frontend/pull/2270)
- (Breaking Change) 접근성 지원을 위해 Tabs 컴포넌트 사용 방법이 변경되었습니다.
- `TabList`, `Tab`, `TabPanel` 서브 컴포넌트를 추가했습니다. 이 서브 컴포넌트들로 탭을 구성해야 합니다.
- `options` prop을 제거하고 children을 사용하도록 합니다.
- prop 이름을 변경합니다. `type` -> `variant`
- onChange prop의 첫번쨰 파라미터 `event`를 제거합니다.
- 키보드 포커스를 지원합니다.
- table 대신 flex css를 사용하도록 변경합니다.

TextArea

- 접근성을 개선합니다. [#2268](https://github.com/titicacadev/triple-frontend/pull/2268)

Tooltip

- [core-elements] Tooltip 컴포넌트에 role="tooltip" 추가 [#2271](https://github.com/titicacadev/triple-frontend/pull/2271)

### modals

- Modal 컴포넌트 접근성 개선 [#2228](https://github.com/titicacadev/triple-frontend/pull/2228)
  - Portal에 렌더합니다.
- Body, Title, Description 서브 컴포넌트를 추가합니다.
- ESC 버튼을 누르면 모달을 닫습니다.
- 외부의 오버레이를 누르면 모달을 닫습니다.
- 키보드를 사용한 포커스는 모달 내부에서만 이동합니다. 모달이 닫히면 이전의 포커스로 되돌아 갑니다.

### slider

SingleSlider, RangeSlider

- 접근성 개선 [#2273](https://github.com/titicacadev/triple-frontend/pull/2273)

## 11.1.0

### react-contexts

- 웹 로그아웃 시 401 응답도 정상적으로 처리하도록 합니다. [#2313](https://github.com/titicacadev/triple-frontend/pull/2313)

## 11.0.0

### common

- TF에 국제화를 도입합니다. [#2232](https://github.com/titicacadev/triple-frontend/pull/2232)

## 10.4.0

### triple-document

- regions element의 바로가기 버튼 위치를 조정합니다. [#2291](https://github.com/titicacadev/triple-frontend/pull/2291)

### footer

- 회사 소개 영역을 제거합니다. [#2285](https://github.com/titicacadev/triple-frontend/pull/2285)

### web-storage, poi-detail

- web-storage 오류 처리 함수 추가 [#2266](https://github.com/titicacadev/triple-frontend/pull/2266)

## 10.3.0

### app-installation-cta

- 배너 CTA의 Dimmed 영역을 제거합니다. [#2265](https://github.com/titicacadev/triple-frontend/pull/2265)
- 플로팅 버튼의 디자인을 리뉴얼합니다. [#2262](https://github.com/titicacadev/triple-frontend/pull/2262)

## 10.2.1

### core-elements

- 블랙프라이데이 대응을 위한 블랙색상 레이블을 추가합니다. [#2260](https://github.com/titicacadev/triple-frontend/pull/2260)

## 10.2.0

### react-contexts

- [react-contexts] checkIfReviewed 에러 로깅에 정보 추가 [#2245](https://github.com/titicacadev/triple-frontend/pull/2245)

### core-elements, image-carousel, review

- 비디오 자동재생 문제 해결 [#2244](https://github.com/titicacadev/triple-frontend/pull/2244)

### poi-detail

- 리뷰 쓰기 영역에 툴팁 추가 [#2240](https://github.com/titicacadev/triple-frontend/pull/2240)

### common

- [Fix] prettier 명령어를 js,ts,tsx도 검사하도록 수정합니다. [#2236](https://github.com/titicacadev/triple-frontend/pull/2236)

## 10.1.0

### common

- Update dependency @swc/core to v1.3.10 [#2225](https://github.com/titicacadev/triple-frontend/pull/2225)
- v9 to v10 마이그레이션 문서 추가 [#2221](https://github.com/titicacadev/triple-frontend/pull/2221)
- Update dependency @sentry/nextjs to v7.16.0 [#2219](https://github.com/titicacadev/triple-frontend/pull/2219)

### react-contexts

- 세션 고정 방지 기능 추가 [#2223](https://github.com/titicacadev/triple-frontend/pull/2223)

## 10.0.1

### triple-document

- 디폴트 이미지 컨테이너 설정 [#2224](https://github.com/titicacadev/triple-frontend/pull/2224)

## 10.0.0

### common

- nothing-to-commit 에러를 무시합니다. [#2216](https://github.com/titicacadev/triple-frontend/pull/2216)

### react-context

- firebase v9 업그레이드 [#2202](https://github.com/titicacadev/triple-frontend/pull/2202)

## 9.7.0

### core-element

- tabs에 rounded-tab 추가합니다. [#2200](https://github.com/titicacadev/triple-frontend/pull/2200)

## 9.6.1

### common

- renovate-pr-fix GHA에서 TRIPLE_BOT_GITHUB_TOKEN를 사용하여 트리거합니다. [#2178](https://github.com/titicacadev/triple-frontend/pull/2178)

### triple-document

- 아티클 어드민에 사용되는 이미지 가로배열(default) margin props 누락 수정 [#2184](https://github.com/titicacadev/triple-frontend/pull/2184)

## 9.6.0

### triple-document

- 어드민 페이지 이미지 분할 기능 [#2134](https://github.com/titicacadev/triple-frontend/pull/2134)

### core-elements, reviews, image-carousel, poi-detail

- 동영상 리뷰 지원 [#2142](https://github.com/titicacadev/triple-frontend/pull/2142)

### constants

- PASSPORT_NUMBER_REGEX를 15개로 고정 [2144](https://github.com/titicacadev/triple-frontend/pull/2144)

## 9.5.0

### modals

- TransitionModal props에 action click optional props를 추가합니다. [#2121](https://github.com/titicacadev/triple-frontend/pull/2121)

### common

- update dependency @swc/core to v1.2.244 [#2119](https://github.com/titicacadev/triple-frontend/pull/2119)

## 9.4.0

### common

- pin dependency typescript to v4.3.5 [#2114](https://github.com/titicacadev/triple-frontend/pull/2114)
- update dependency @swc/core to v1.2.241 [#2111](https://github.com/titicacadev/triple-frontend/pull/2111)
- update dependency @sentry/nextjs to v7.11.1 [#2109](https://github.com/titicacadev/triple-frontend/pull/2109)

### triple-email-document

- 비율에 따라 이미지를 렌더링합니다. [#2104](https://github.com/titicacadev/triple-frontend/pull/2104)

## 9.3.0

### footer

- [footer] 대표자 변경: 김강세 --> 최휘영 [#2106](https://github.com/titicacadev/triple-frontend/pull/2106)

### i18n

- i18next triple-web-assets backend를 추가합니다. [#2102](https://github.com/titicacadev/triple-frontend/pull/2102)

## 9.2.0

### view-utilities

- AppsFlyer 파라미터 중 is_retargeting 값을 true로 설정합니다. [#2099](https://github.com/titicacadev/triple-frontend/pull/2099)

## 9.1.0

### common

- storybook 6.5로 업데이트 [#2094](https://github.com/titicacadev/triple-frontend/pull/2094)

### footer

- [footer] 사명 변경 [#2095](https://github.com/titicacadev/triple-frontend/pull/2095)

### public-header

- public-header props를 추가합니다. [#2097](https://github.com/titicacadev/triple-frontend/pull/2097)

## 9.0.3

### review

- graphql mutation을 수정합니다. [#2092](https://github.com/titicacadev/triple-frontend/pull/2092)

## 9.0.2

### review

- 리뷰 패키지 내 QueryProvider export를 제거합니다. [#2089](https://github.com/titicacadev/triple-frontend/pull/2089)
- Review 스키마의 badges 쿼리 및 타입을 수정하고 추가 디자인 QA를 적용합니다. [#2090](https://github.com/titicacadev/triple-frontend/pull/2090)

## 9.0.1

### review

- use-reviews 내 useQuery options을 수정합니다. [#2087](https://github.com/titicacadev/triple-frontend/pull/2087)

## 9.0.0

### common

- KOREAN_REGEX에서 "|"를 제거. [#2077](https://github.com/titicacadev/triple-frontend/pull/2077)

### map

- Mapview zoom이 제대로 잡히지 않는 오류를 수정합니다. [#2078](https://github.com/titicacadev/triple-frontend/pull/2078)

### core-elements

- input, textarea에 font 초기화 [#2081](https://github.com/titicacadev/triple-frontend/pull/2081)

### review

- 아키텍쳐 및 graphql 적용합니다. [#2079](https://github.com/titicacadev/triple-frontend/pull/2079)
- 최근방문한 리뷰를 구분하고 관련 내용을 추가합니다. [#2085](https://github.com/titicacadev/triple-frontend/pull/2085)

## 8.1.2

### ad-banners

- 이벤트 수집이 안되는 오류를 해결합니다. [#2075](https://github.com/titicacadev/triple-frontend/pull/2075)

## 8.1.1

### map

- 의도되지 않은 spinner를 제거합니다. [#2072](https://github.com/titicacadev/triple-frontend/pull/2072)

### triple-document

- StandardActionHandler 새 창 열기 기능에 필요한 props를 추가합니다. [#2071](https://github.com/titicacadev/triple-frontend/pull/2071)

## 8.1.0

### replies

- FixedBottom 컨테이너에 safeAreaInsetMixin을 추가합니다. [#2063](https://github.com/titicacadev/triple-frontend/pull/2063)
- 노출하는 댓글 갯수를 변경할 수 있도록 props를 추가합니다. [#2066](https://github.com/titicacadev/triple-frontend/pull/2066)

### triple-document

- images 요소의 이벤트 핸들러를 Override할 수 있도록 합니다. [#2065](https://github.com/titicacadev/triple-frontend/pull/2065)

### core-elements

- navbar title을 세로 중앙 정렬하기 위해 line-height를 활용합니다. [#2067](https://github.com/titicacadev/triple-frontend/pull/2067)

## 8.0.0

### common

- update dependency @swc/core to v1.2.192 [#2057](https://github.com/titicacadev/triple-frontend/pull/2057)
- update dependency @swc/core to v1.2.182 [#2051](https://github.com/titicacadev/triple-frontend/pull/2051)
- update internal packages [#2049](https://github.com/titicacadev/triple-frontend/pull/2049)
- 패키지 내 isomorphic-fetch를 제거하고 fetcher로 대체합니다. [#2045](https://github.com/titicacadev/triple-frontend/pull/2045)

### social-reviews

- ExternalLink의 imageUrl이 있을 때만 Image 노출 [#2060](https://github.com/titicacadev/triple-frontend/pull/2060)
- ExternalLinks 컴포넌트 구현 [#2054](https://github.com/titicacadev/triple-frontend/pull/2054)

### react-contexts

- images-context 내 images를 가져오는 fetch부분을 수정합니다. [#2058](https://github.com/titicacadev/triple-frontend/pull/2058)

### triple-email-document

- element를 수정하고, component를 제거합니다. [#2056](https://github.com/titicacadev/triple-frontend/pull/2056)

### standard-action-handler

- 스크롤 액션을 추가합니다. [#2055](https://github.com/titicacadev/triple-frontend/pull/2055)

### scroll-to-element

- 스크롤 액션을 관리하는 패키지를 추가합니다. [#2053](https://github.com/titicacadev/triple-frontend/pull/2053)

## 7.5.0

### common

- update dependency next to v12.1.6 [#2047](https://github.com/titicacadev/triple-frontend/pull/2047)
- update dependency @swc/core to v1.2.174 [#2046](https://github.com/titicacadev/triple-frontend/pull/2046)

### triple-email-document

- elements를 확장합니다. [#2039](https://github.com/titicacadev/triple-frontend/pull/2039)

### poi-detail

- 운영시간, 휴무일을 조건에 따라 렌더링합니다. [#2031](https://github.com/titicacadev/triple-frontend/pull/2031)

## 7.4.0

### common

- update dependency next to v12.1.5 [#2029](https://github.com/titicacadev/triple-frontend/pull/2029)
- update dependency @sentry/nextjs to v6.19.7 [#2037](https://github.com/titicacadev/triple-frontend/pull/2037)
- update internal packages to v4.17.0 [#2028](https://github.com/titicacadev/triple-frontend/pull/2028)
- update dependency @swc/core to v1.2.173 [#2042](https://github.com/titicacadev/triple-frontend/pull/2042)
- update dependency @swc/core to v1.2.172 [#2034](https://github.com/titicacadev/triple-frontend/pull/2034)
- update dependency @swc/core to v1.2.168 [#2033](https://github.com/titicacadev/triple-frontend/pull/2033)

### date-picker

- day-picker의 fromMonth, toMonth가 동작되도록 수정 [#2036](https://github.com/titicacadev/triple-frontend/pull/2036)

### react-context

- notifyReviewDeleted 중복 호출 제거 [#2041](https://github.com/titicacadev/triple-frontend/pull/2041)

### poi-detail

- areas, vicinity deprecated 처리, areaName 추가 [#2035](https://github.com/titicacadev/triple-frontend/pull/2035)

### react-triple-cliend-interfaces

- web-to-native-interfaces 모듈을 peerDependencies로 설정 [#2040](https://github.com/titicacadev/triple-frontend/pull/2040)

## 7.3.0

### color-palette

- red50 color 추가 [#2030](https://github.com/titicacadev/triple-frontend/pull/2030)

### core-elements

- global style 에 red50 color 추가 [#2030](https://github.com/titicacadev/triple-frontend/pull/2030)

## 7.2.0

### common

- turborepo 추가 [#2011](https://github.com/titicacadev/triple-frontend/pull/2011)
- codecov patch check를 끕니다. [#2026](https://github.com/titicacadev/triple-frontend/pull/2026)
- Chromatic 변경 사항에서 오늘 날짜 제외 [#2017](https://github.com/titicacadev/triple-frontend/pull/2017)
- Update Internal Packages to v4.16.0 [#2020](https://github.com/titicacadev/triple-frontend/pull/2020)
- Update SWC Packages [#2013](https://github.com/titicacadev/triple-frontend/pull/2013)
- update dependency @swc/core to v1.2.165 [#2023](https://github.com/titicacadev/triple-frontend/pull/2023)
- update dependency next to v12.1.4 [#2016](https://github.com/titicacadev/triple-frontend/pull/2016)
- update dependency @sentry/nextjs to v6.19.6 [#2000](https://github.com/titicacadev/triple-frontend/pull/2000)

### triple-document

- Tna Slot에 셀프패키지 노출 [#2024](https://github.com/titicacadev/triple-frontend/pull/2024)

### replies

- 입력창을 화면 최하단에 고정하는 props를 추가합니다. [#2014](https://github.com/titicacadev/triple-frontend/pull/2014)

## 7.1.0

### common

- Update dependency @swc/core to v1.2.159 [#2012](https://github.com/titicacadev/triple-frontend/pull/2012)

### user-verification

- Docs의 오타를 수정합니다. [#2019](https://github.com/titicacadev/triple-frontend/pull/2019)
- External promotion에 대응 가능하도록 인터페이스를 확장합니다. [#2018](https://github.com/titicacadev/triple-frontend/pull/2018)

### triple-document

- 타이머 기능 그룹 다운로드 버튼에 적용 [#2015](https://github.com/titicacadev/triple-frontend/pull/2015)

## 7.0.0

### common

- Update dependency @sentry/nextjs to v6.18.1 [#1966](https://github.com/titicacadev/triple-frontend/pull/1966)
- Update dependency @swc/core to v1.2.148 [#1975](https://github.com/titicacadev/triple-frontend/pull/1975)
- Update titicacadev/triple-content packages to v4.13.0 [#1976](https://github.com/titicacadev/triple-frontend/pull/1976)
- npm 버전 8.5이상으로 강제하고 node version을 17.7.0으로 변경합니다. [#2004](https://github.com/titicacadev/triple-frontend/pull/2004)

### Package별 ESLint 활성화

- eslint-config-triple v3의 점진적 적용을 위해 린트 검사를 비활성화했던 패키지 중 남은 25개 package에 대해 린팅을 적용하여 활성화를 완료합니다. 네이밍 컨벤션이나 no-any 규칙을 수정하면서 발생한 Breaking Change를 포함합니다. (changes on public-header, poi-detail, intersection-observer, scrap-button, style-box, type-definitions, react-hooks, web-storage, listing-filter, static-page-contents, poi-list-elements, form, ab-experiments, app-banner, slider, search, recommended-contents, pricing, app-installation-cta, image-carousel, hub-form, content-sharing, author, action-sheet, i18n) [#1755](https://github.com/titicacadev/triple-frontend/issues/1755)

### react-triple-client-interfaces 적용

- react-triple-client-interfaces 패키지로 웹-앱 동작을 분기합니다.
- public-header [#1898](https://github.com/titicacadev/triple-frontend/pull/1898)
- router [#2002](https://github.com/titicacadev/triple-frontend/pull/2002)
- poi-detail [#2005](https://github.com/titicacadev/triple-frontend/pull/2005)
- ui-flow [#2007](https://github.com/titicacadev/triple-frontend/pull/2007)
- review, directions-finder, loction-properties [#2008](https://github.com/titicacadev/triple-frontend/pull/2008)

### standard-action-handler

- standard-action-handler Hook을 생성합니다. [#1967](https://github.com/titicacadev/triple-frontend/pull/1967)

### replies

- 입력창의 오류를 해결합니다. [#1972](https://github.com/titicacadev/triple-frontend/pull/1972)

## 6.4.0

### common

- codecov 컨픽을 추가하고 threshold을 조금 느슨하게 설정 [#1958](https://github.com/titicacadev/triple-frontend/pull/1958)
- TF 패키지 내 react 참조를 제거합니다. [#1959](https://github.com/titicacadev/triple-frontend/pull/1959)
- 구버전 클라이언트 대응 분기(semver)를 제거합니다. [#1960](https://github.com/titicacadev/triple-frontend/pull/1960)

### resource-list-element

- ExtendedResourceListElement의 가변 높이를 보장하도록 수정합니다. [#1968](https://github.com/titicacadev/triple-frontend/pull/1968)

### triple-document

- 쿠폰 발급 시각 타이머 적용 [#1961](https://github.com/titicacadev/triple-frontend/pull/1961)

### user-verification

- 인증여부 확인 API 경로를 변경합니다. [#1963](https://github.com/titicacadev/triple-frontend/pull/1963)

### triple-fallback-action

- 서버에서 useLayoutEffect를 호출하지 않도록 변경 [#1955](https://github.com/titicacadev/triple-frontend/pull/1955)

### replies

- 답글이 달려있는 댓글 삭제 시 액션시트를 비활성화 합니다. [#1937](https://github.com/titicacadev/triple-frontend/pull/1937)
- 이전 댓글 더보기 렌더링 조건을 수정합니다. [#1944](https://github.com/titicacadev/triple-frontend/pull/1944)
- 입력창의 placeholder를 수정합니다. [#1948](https://github.com/titicacadev/triple-frontend/pull/1948)
- 답글을 생성 시간 기준으로 오름차순 정렬합니다. [#1949](https://github.com/titicacadev/triple-frontend/pull/1949)
- 불필요한 코드를 제거합니다. [#1953](https://github.com/titicacadev/triple-frontend/pull/1953)
- 프로필 및 멘션을 클릭했을 때, 액션을 추가합니다. [#1970](https://github.com/titicacadev/triple-frontend/pull/1970)
- 답글이 달려있는 댓글을 삭제할 때, 답글 순서가 바뀌는 오류를 수정합니다. [#1952](https://github.com/titicacadev/triple-frontend/pull/1952)

### standard-action-handler

- 새창열기 기능 추가 [#1939](https://github.com/titicacadev/triple-frontend/pull/1939)
- 이미지 다운로드 기능 추가 [#1951](https://github.com/titicacadev/triple-frontend/pull/1951)

## 6.3.0

### view-utilities

- makeDeepLinkGenerator가 지원하는 옵션을 확장합니다. [#1940](https://github.com/titicacadev/triple-frontend/pull/1940)

### triple-fallback-action

- Triple Fallback Action 패키지 추가 [#1935](https://github.com/titicacadev/triple-frontend/pull/1935)

### meta-tags

- CommonMeta에 manifest link 엘리먼트 추가 [#1933](https://github.com/titicacadev/triple-frontend/pull/1933)

### react-triple-client-interfaces

- App과 AppName을 외부로 노출 [#1931](https://github.com/titicacadev/triple-frontend/pull/1931)

### triple-email-template

- React 참조 코드를 제거합니다. [#1936](https://github.com/titicacadev/triple-frontend/pull/1936)
- FullEmailTemplate를 추가합니다. [#1929](https://github.com/titicacadev/triple-frontend/pull/1929)

### replies

- 삭제 완료 toast를 렌더링합니다. [#1943](https://github.com/titicacadev/triple-frontend/pull/1943)
- 액션시트 타이틀을 수정합니다. [#1942](https://github.com/titicacadev/triple-frontend/pull/1942)
- 닉네임이 9자 이상일 때, 말줄임표로 표기합니다. [#1934](https://github.com/titicacadev/triple-frontend/pull/1934)
- 비로그인 상태일 때, 로그인 유도 모달 노출 [#1927](https://github.com/titicacadev/triple-frontend/pull/1927)

## 6.2.1

### modal

- 업데이트된 session-context를 반영하여 README를 수정합니다. [#1928](https://github.com/titicacadev/triple-frontend/pull/1928)

### map

- FocusTracker에 activeAutoZoom props을 추가합니다. [#1926](https://github.com/titicacadev/triple-frontend/pull/1926)

## 6.2.0

### core-elements

- gap props추가 [#1916](https://github.com/titicacadev/triple-frontend/pull/1916)

### map

- PoiDotMarker의 props, type 및 CircleMarker의 type 등을 export 합니다. [#1917](https://github.com/titicacadev/triple-frontend/pull/1917)

### router

- LocalLink, ExternalLink 내용 보충 [#1911](https://github.com/titicacadev/triple-frontend/pull/1911)

### triple-email-document

- Migration에 필요한 Type을 내보내고, Color 표현을 수정합니다. [#1923](https://github.com/titicacadev/triple-frontend/pull/1923)
- Text Element를 최신화합니다. [#1924](https://github.com/titicacadev/triple-frontend/pull/1924)
- Footer, Preview를 추가합니다. [#1919](https://github.com/titicacadev/triple-frontend/pull/1919)
- triple-email-document 관련 storybook 코드를 추가합니다. [#1903](https://github.com/titicacadev/triple-frontend/pull/1903)
- 패키지를 추가합니다. [#1895](https://github.com/titicacadev/triple-frontend/pull/1895)

### standard-action-handler

- Standard Action Handler ReadMe 작성 [#1912](https://github.com/titicacadev/triple-frontend/pull/1912)

## 6.1.1

### map

- FlexibleMarker의 content type을 수정합니다. [#1906](https://github.com/titicacadev/triple-frontend/pull/1906)

## 6.1.0

### common

- 스크립트 위치를 scripts/ 디렉토리로 통일합니다. make-test-tsconfig에서 패키지 목록을 만드는 로직을 개선합니다 [#1891](https://github.com/titicacadev/triple-frontend/pull/1891)
- v6 마이그레이션 가이드에 map 패키지 내용을 수정합니다 [#1896](https://github.com/titicacadev/triple-frontend/pull/1896)
- v6 마이그레이션 가이드에 react-triple-client-interfaces에 대응하는 내용을 추가합니다 [#1890](https://github.com/titicacadev/triple-frontend/pull/1890)
- v6 마이그레이션 가이드에 누락된 map 패키지 내용을 작성합니다 [#1892](https://github.com/titicacadev/triple-frontend/pull/1892)
- v6 마이그레이션 가이드에 누락된 내용을 채웁니다 [#1889](https://github.com/titicacadev/triple-frontend/pull/1889)

### poi-detail

- PoiDetail 의 NoteContainer 수정으로 인해 생겼던 버그를 수정합니다 [#1900](https://github.com/titicacadev/triple-frontend/pull/1900)

### replies

- 새로고침 이슈를 해결합니다 [#1872](https://github.com/titicacadev/triple-frontend/pull/1872)

### map

- flexibleMarker에 누락된 props을 추가합니다 [#1904](https://github.com/titicacadev/triple-frontend/pull/1904)
- 패키지의 README를 수정합니다 [#1896](https://github.com/titicacadev/triple-frontend/pull/1896)

## 6.0.0

### common

- 실패 알림을 보내는 step이 job이 실패했을 때 실행되도록 처리 [#1882](https://github.com/titicacadev/triple-frontend/pull/1882)
- package 별 누락된 dependencies 추가 [#1881](https://github.com/titicacadev/triple-frontend/pull/1881)
- CI 워크플로의 job을 정리합니다 [#1880](https://github.com/titicacadev/triple-frontend/pull/1880)
- npm script 정리 [#1878](https://github.com/titicacadev/triple-frontend/pull/1878)
- 패키지별 package.json을 표준화합니다 [#1870](https://github.com/titicacadev/triple-frontend/pull/1870)
- Sentry 패키지 의존성을 정리합니다 [#1856](https://github.com/titicacadev/triple-frontend/pull/1856)
- Storybook 패키지 최신 버전 설치 [#1858](https://github.com/titicacadev/triple-frontend/pull/1858)
- Create LICENSE [#1840](https://github.com/titicacadev/triple-frontend/pull/1840/files)
- Storybook 주소를 갱신합니다 [#1839](https://github.com/titicacadev/triple-frontend/pull/1839/files)

### poi-detail

- image-carousel 내부의 노트 컴포넌트를 수정합니다 [#1874](https://github.com/titicacadev/triple-frontend/pull/1874)

### router

- LocalLink, ExternalLink가 앵커 태그를 직접 렌더링하도록 변경합니다 [#1873](https://github.com/titicacadev/triple-frontend/pull/1873)

### user-verification

- react-triple-client-interfaces를 이용합니다 [#1871](https://github.com/titicacadev/triple-frontend/pull/1871)

### replies

- 댓글&답글에 신고하기 기능을 추가합니다 [#1838](https://github.com/titicacadev/triple-frontend/pull/1838)
- 댓글&답글 좋아요 반응 기능을 추가합니다 [#1845](https://github.com/titicacadev/triple-frontend/pull/1845)

### react-triple-client-interfaces

- router의 app-bridge를 이전합니다 [#1875](https://github.com/titicacadev/triple-frontend/pull/1875)
- useTripleClientFeatureFlag 훅을 추가합니다 [#1866](https://github.com/titicacadev/triple-frontend/pull/1866)
- react-triple-client-interfaces 패키지를 추가합니다 [#1832](https://github.com/titicacadev/triple-frontend/pull/1832)

### ui-flow

- ui-flow 디렉토리의 ESLint 검사를 활성화합니다 [#1857](https://github.com/titicacadev/triple-frontend/pull/1857)

### core-elements

- core-elements 디렉토리의 ESLint, Stylelint 검사를 활성화합니다 [#1850](https://github.com/titicacadev/triple-frontend/pull/1850)

### app-installation-cta

- 배너 CTA 오버레이 클릭시, 해당 배너가 닫히도록 합니다 [#1847](https://github.com/titicacadev/triple-frontend/pull/1847)

### triple-document

- triple-doucment의 불필요한 영역의snapshot을 ignore합니다 [#1844](https://github.com/titicacadev/triple-frontend/pull/1844)

### ad-banners

- ad-banners의 ListDirection enum의 멤버 네이밍 변경 [#1787](https://github.com/titicacadev/triple-frontend/pull/1787)

### map

- 오버레이 컴포넌트들을 정리합니다 [#1865](https://github.com/titicacadev/triple-frontend/pull/1865)
- Map 구조 변경 및 기능을 추가합니다 [#1831](https://github.com/titicacadev/triple-frontend/pull/1831)
- Map 디렉토리의 ESLint 검사를 활성화하고 오류를 수정합니다 [#1841](https://github.com/titicacadev/triple-frontend/pull/1841)

### modals

- login CTA 모달 관련 네이밍을 변경합니다 [#1791](https://github.com/titicacadev/triple-frontend/pull/1791)

### fetcher

- fetcher 패키지의 일부 인터페이스 이름 변경 [#1767](https://github.com/titicacadev/triple-frontend/pull/1767)

### footer

- CSFooter 컴포넌트 및 관련 코드 제거 [#1807](https://github.com/titicacadev/triple-frontend/pull/1807)

### react-contexts

- user-agent-context의 isPublic과 app 속성에 deprecation notice를 추가합니다[#1863](https://github.com/titicacadev/triple-frontend/pull/1863)
- useHistoryContext 제거 [#1834](https://github.com/titicacadev/triple-frontend/pull/1834)
- useURIHash -> useUriHash [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- HistoryProvider의 prop 이름 변경: loginCTAModalHash -> loginCtaModalHash [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- HashStrategy의 멤버 네이밍 변경 [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- GAParams -> GoogleAnalyticsParams [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- FAParams -> FirebaseAnalyticsParams [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- withUTMContext -> withUtmContext [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- WithUTMContextBaseProps -> WithUtmContextBaseProps [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- useUTMContext -> useUtmContext [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- UTMProvider -> UtmProvider [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)
- extractUTMContextFromQuery -> extractUtmContextFromQuery [#1798](https://github.com/titicacadev/triple-frontend/pull/1798)

## 5.2.1

### router

- useNavigate 훅으로 특정 URL을 라우팅하지 못하는 문제를 수정합니다. [#1836](https://github.com/titicacadev/triple-frontend/pull/1836)

### react-hooks

- scrollToElement의 props을 수정합니다. [#1833](https://github.com/titicacadev/triple-frontend/pull/1833)

### view-utilities

- 앱스플라이어 UTM 파라미터 규칙을 수정합니다. [#1827](https://github.com/titicacadev/triple-frontend/pull/1827)

## 5.2.0

### ad-banners

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### booking-completion

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### footer

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### nearby-pois

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### replies

- replies 디렉토리의 ESLint 검사를 활성화하고 오류를 수정합니다. [#1810](https://github.com/titicacadev/triple-frontend/pull/1810)
- 댓글/답글 삭제하기 기능을 추가합니다. [#1761](https://github.com/titicacadev/triple-frontend/pull/1761)

### review

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### router

- router 패키지의 link 모듈을 제거합니다. [#1828](https://github.com/titicacadev/triple-frontend/pull/1828)
- 앱 전용 쿼리를 inlink일 때만 사용하도록 변경 [#1816](https://github.com/titicacadev/triple-frontend/pull/1816)
- router 패키지에 라우터 훅 함수를 구현 [#1703](https://github.com/titicacadev/triple-frontend/pull/1703)

### scroll-spy

- scroll-spy 패키지를 추가합니다. [#1803](https://github.com/titicacadev/triple-frontend/pull/1803)

### social-reviews

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### standard-action-handler

- 텍스트 복사 기능을 추가합니다. [#1813](https://github.com/titicacadev/triple-frontend/pull/1813)

### triple-document

- router 패키지 의존성 추가 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)
- history-context의 `navigate` 대신 router 패키지의 `useNavigate` 사용 [#1800](https://github.com/titicacadev/triple-frontend/pull/1800)

### user-verification

- use-user-verification 테스트 과정에서 발생하는 워닝 제거 [#1818](https://github.com/titicacadev/triple-frontend/pull/1818)
- triple-frontend에서 사용하는 openWindow를 router 함수로 대체합니다. [#1814](https://github.com/titicacadev/triple-frontend/pull/1814)

### view-utilities

- moment 의존성 수정 및 date format이 영어로 표기되는 문제를 fix합니다. [#1824](https://github.com/titicacadev/triple-frontend/pull/1824)
- 항공 기획전, 투어티켓 기획전 라우터 추가 [#1815](https://github.com/titicacadev/triple-frontend/pull/1815)

### integration-test

- router 패키지와 modals 패키지의 상호작용을 테스트하는 코드를 추가합니다. 이를 위해 "integration-test" 패키지를 추가합니다. [#1825](https://github.com/titicacadev/triple-frontend/pull/1825)

### Etc.

- storybook 배포 제거 [#1817](https://github.com/titicacadev/triple-frontend/pull/1817)

## 5.1.2

### ESLint 검사

- user-verification 디렉토리의 ESLint 검사를 활성화하고 오류를 수정합니다. [#1809](https://github.com/titicacadev/triple-frontend/pull/1809)

### common

- 마이그레이션 문서에 v1 to v2 문서 링크 추가 [#1808](https://github.com/titicacadev/triple-frontend/pull/1808)

### router

- default alert을 추가합니다. [#1806](https://github.com/titicacadev/triple-frontend/pull/1806)

## 5.1.1

### fetcher

- request의 body 타입을 "unknown"으로 완화 [#1802](https://github.com/titicacadev/triple-frontend/pull/1802)

### ESLint 검사

- react-contexts [#1797](https://github.com/titicacadev/triple-frontend/pull/1797)
- docs [#1801](https://github.com/titicacadev/triple-frontend/pull/1801)

## 5.1.0

### ESLint 검사

- triple-document 디렉토리 ESLint 검사 활성화 및 린트 오류 수정 [#1795](https://github.com/titicacadev/triple-frontend/pull/1795)
- standard-action-handler 디렉토리 ESLint 검사 활성화 및 린트 오류 수정 [#1794](https://github.com/titicacadev/triple-frontend/pull/1794)
- review 디렉토리 ESLint 오류 수정 [#1793](https://github.com/titicacadev/triple-frontend/pull/1793)
- modals 디렉토리의 ESLint 검사 활성화 [#1790](https://github.com/titicacadev/triple-frontend/pull/1790)
- footer 디렉토리의 ESLint 검사를 활성화합니다. [#1788](https://github.com/titicacadev/triple-frontend/pull/1788)
- ad-banners 패키지의 ESLint 검사를 활성화합니다. [#1786](https://github.com/titicacadev/triple-frontend/pull/1786)

### fetcher

- 응답 형식을 수정합니다 [#1785](https://github.com/titicacadev/triple-frontend/pull/1785)

### router

- router 패키지에 useNavigate 훅을 추가합니다. [#1784](https://github.com/titicacadev/triple-frontend/pull/1784)

### date-picker

- RangePicker V2 컴포넌트를 생성합니다. [#1749](https://github.com/titicacadev/triple-frontend/pull/1749)
- RangePickerV2 작업 중, deprecated된 요소를 분리 합니다 [#1775](https://github.com/titicacadev/triple-frontend/pull/1775)

### common

- codecov를 연결합니다 [#1776](https://github.com/titicacadev/triple-frontend/pull/1776)
- PR 템플릿 업데이트 [#1773](https://github.com/titicacadev/triple-frontend/pull/1773)

## 5.0.1

### core-elements

- Select, Input의 css를 수정합니다. [#1762](https://github.com/titicacadev/triple-frontend/pull/1762)

## 5.0.0

### Breaking Changes

#### common

- deprecate된 환경 변수 prop을 제거합니다. [#1729](https://github.com/titicacadev/triple-frontend/pull/1729)

#### core-elements

- Text.Html/Text.WithRef 삭제 [#1747](https://github.com/titicacadev/triple-frontend/pull/1747)

#### react-contexts

- env context의 기본값 null로 설정 [#1731](https://github.com/titicacadev/triple-frontend/pull/1731)
- ab-experiment-context를 triple-ab-experiment-context로 이름 변경 후, ab-experiment 패키지로 이전합니다. [#1730](https://github.com/titicacadev/triple-frontend/pull/1730)

### New Features

#### common

- content-utilities 패키지 정리 [#1760](https://github.com/titicacadev/triple-frontend/pull/1760)
- Resolve lint errors of view-utilities package [#1758](https://github.com/titicacadev/triple-frontend/pull/1758)
- 수정할 린트 오류가 없는 패키지의 린트 검사를 활성화합니다. [#1757](https://github.com/titicacadev/triple-frontend/pull/1757)
- CI에서 빌드와 테스트 순서 변경 [#1748](https://github.com/titicacadev/triple-frontend/pull/1748)
- 타입 에러 해결 [#1746](https://github.com/titicacadev/triple-frontend/pull/1746)
- storybook이 타입 체크를 하는 옵션 추가 및 스토리북 파일의 타입 오류 수정 [#1743](https://github.com/titicacadev/triple-frontend/pull/1743)
- ts-jest를 설정하고, 실패하는 테스트를 수정합니다. [#1742](https://github.com/titicacadev/triple-frontend/pull/1742)
- eslint 오류 수정 과정에서 작업한 리팩토링 [#1738](https://github.com/titicacadev/triple-frontend/pull/1738)
- eslint-config-triple v3 적용 [#1737](https://github.com/titicacadev/triple-frontend/pull/1737)
- Chromatic CI 추가 [#1732](https://github.com/titicacadev/triple-frontend/pull/1732)

#### poi-list-elements

- 저장버튼과 poi name이 겹치는 문제를 해결합니다 [#1754](https://github.com/titicacadev/triple-frontend/pull/1754)

#### replies

- 댓글/답글 서비스 로직을 개선합니다. [#1745](https://github.com/titicacadev/triple-frontend/pull/1745)
- 댓글/답글 수정하기 기능을 추가합니다 [#1712](https://github.com/titicacadev/triple-frontend/pull/1712)

## 4.1.4

### triple-document

- TextHtml을 TripleDocument의 마크다운을 위한 컴포넌트로 구현합니다 [#1739](https://github.com/titicacadev/triple-frontend/pull/1739)

## 4.1.3

### triple-document

- Text의 중복 줄바꿈을 제거하는 함수 추가 [#1735](https://github.com/titicacadev/triple-frontend/pull/1735)

## 4.1.2

### app-installation-cta

- floating-button-cta 디자인 오류를 해결합니다. [#1724](https://github.com/titicacadev/triple-frontend/pull/1724)

### replies

- 자식 컴포넌트의 이벤트를 막습니다. [#1723](https://github.com/titicacadev/triple-frontend/pull/1723)

## 4.1.1

### react-contexts

- `SessionContextProvider.getInitialProps`를 클라이언트에서 실행할 때 인앱 환경을 제대로 감지하지 못하는 문제 수정 [#1720](https://github.com/titicacadev/triple-frontend/pull/1720)

## 4.1.0

## search

- 렌더링 직후 input 엘리먼트의 focus 메서드를 호출 [#1684](https://github.com/titicacadev/triple-frontend/pull/1684)

## core-elements

- form-field에 required 디자인 추가 [#1709](https://github.com/titicacadev/triple-frontend/pull/1709)

## replies

- 댓글 컴포넌트 리팩토링 [#1711](https://github.com/titicacadev/triple-frontend/pull/1711)

## ab-experiments

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)

## fetcher

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)
- 응답 객체에 status, url이 없는 문제 해결 [#1717](https://github.com/titicacadev/triple-frontend/pull/1717)

## intersection-observer

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)

## meta-tags

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)

## react-contexts

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)

## router

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)

## ui-flow

- Peer 의존성으로 Next.js 12 허용 [#1713](https://github.com/titicacadev/triple-frontend/pull/1713)

## app-installation-cta

- `BannerCTA`의 이미지 배너의 앱으로 가는 버튼과 배너를 닫는 버튼의 문구를 prop으로 받는 기능 추가 [#1714](https://github.com/titicacadev/triple-frontend/pull/1714)
- `BannerCTA`의 텍스트 배너를 비활성화하는 prop 추가 [#1714](https://github.com/titicacadev/triple-frontend/pull/1714)

## 4.0.0

### Breaking Changes

- floating-install-button 패키지 제거 [#1683](https://github.com/titicacadev/triple-frontend/pull/1683)
- frontend-devtools 패키지 제거 [#1696](https://github.com/titicacadev/triple-frontend/pull/1696)

#### fetcher

- fetcher 응답 타입에서 `error`, `result`, body 관련 속성 제거 [#1624](https://github.com/titicacadev/triple-frontend/pull/1624)

#### react-contexts

- `SessionContextProvider`의 prop 변경 [#1705](https://github.com/titicacadev/triple-frontend/pull/1705)
- `useSessionContext` 훅 제거 [#1705](https://github.com/titicacadev/triple-frontend/pull/1705)

### New Features

#### fetcher

- fetcher 응답 타입에 `parsedBody` 추가 [#1624](https://github.com/titicacadev/triple-frontend/pull/1624)

#### date-picker

- `DayPicker`, `RangePicker` 컴포넌트에 오늘 날짜 표시를 숨길 수 있는 prop 추가 [#1688](https://github.com/titicacadev/triple-frontend/pull/1688)
- `DayPicker` 컴포넌트에 달 페이지를 바꿀 수 있는 버튼을 표시하는 prop 추가 [#1688](https://github.com/titicacadev/triple-frontend/pull/1688)
- `DayPicker` 컴포넌트의 날짜 영역 컴포넌트를 커스텀할 수 있는 기능 추가 [#1692](https://github.com/titicacadev/triple-frontend/pull/1692)

#### react-contexts

- humps 패키지 제거 [#1691](https://github.com/titicacadev/triple-frontend/pull/1691)
- `SessionContextProvider`에 `getInitialProps` 메서드 추가 [#1705](https://github.com/titicacadev/triple-frontend/pull/1705)
- `useSessionAvailability`, `useSessionControllers`, `useUser` 훅 추가 [#1705](https://github.com/titicacadev/triple-frontend/pull/1705)
- `getSessionAvailablityFromRequest` 함수 추가 [#1705](https://github.com/titicacadev/triple-frontend/pull/1705)
- `putInvalidSessionRemover` 함수 추가 [#1705](https://github.com/titicacadev/triple-frontend/pull/1705)

#### core-elements

- 폼 컴포넌트의 error 타입에 boolean 값도 들어갈 수 있도록 변경 [#1694](https://github.com/titicacadev/triple-frontend/pull/1694)
- `SearchNavbar` 컴포넌트의 뒤로가기 아이콘 타입을 prop으로 받도록 처리 [#1706](https://github.com/titicacadev/triple-frontend/pull/1706)

#### search

- `FullScreenSearchView` 컴포넌트의 뒤로가기 아이콘 타입을 prop으로 받도록 처리 [#1706](https://github.com/titicacadev/triple-frontend/pull/1706)

### Bug Fix

#### router

- `LocalLink`가 앱 전용 쿼리를 추가할 때 기존 쿼리를 보존하지 않는 문제 수정 [#1699](https://github.com/titicacadev/triple-frontend/pull/1699)

### Etc.

- `@swc/core` patch 버전 업그레이드 [#1687](https://github.com/titicacadev/triple-frontend/pull/1687)
- README에서 브랜치 이름을 "master"에서 "main"으로 교정합니다. [#1695](https://github.com/titicacadev/triple-frontend/pull/1695)
- tsc 설정을 개선합니다. [#1697](https://github.com/titicacadev/triple-frontend/pull/1697)
- router 패키지의 코드를 정리합니다. [#1701](https://github.com/titicacadev/triple-frontend/pull/1701)

## 3.4.1

### footer

- 배경 색상 범위를 수정합니다. (#1685)

## 3.4.0

### ui-flow

- authGuard 테스트 재작성 (#1681)
- ui-flow의 authGuard 코드를 정리합니다. (#1674)

### footer

- 320px 이하 화면을 대응합니다. (#1680)
- maxWidth의 값을 변경합니다. (#1679)

### replies

- 이전 댓글&답글 더보기 로직을 수정합니다. (#1676)
- 대댓글 작성 기능을 추가합니다. (#1668)
- 댓글&답글 마크업 및 디자인을 수정합니다. (#1651)

### fetcher

- fetcher 코드를 정리합니다. (#1673)
- addFetchersToGSSP 함수가 토큰을 갱신할 때 API 낭비를 줄입니다. (#1667)

### core-elements

- stack, responsive, section 리팩토링 (#1672)
- text에 css prop 추가 및 코드 개선 (#1664)

### location-properies

- property-item 리팩토링 (#1671)

## 3.3.1

### common

- 배포용 패키지는 babel로 빌드합니다. (#1669)

## 3.3.0

### react-contexts

- API 요청이 성공했을 때에만 로그아웃 후 처리를 수행합니다. (#1665)

### triple-document

- 쿠폰 다운로드 Alert 타이틀 문구를 개선합니다. (#1663)
- 쿠폰 다운로드 시도 시, API 호출 전 verification state 체크하는 부분을 제거합니다. (#1662)
- 웹 브라우저에서 쿠폰을 다운로드할 수 있는 기능 추가 (#1658)
- 쿠폰 그룹 다운로드할 때 인증에 실패하면 인증 프로세스 시작 (#1657)
- 쿠폰 그룹 다운로드 컴포넌트 리팩토링 (#1656)
- `InAppCouponDownloadButton` 리팩토링 (#1655)

### poi-detail

- maxWidth={0} 제거 (#1661)

### react-hooks

- Public 환경에서 visibilitychange 이벤트에 subscribe합니다. (#1660)

### core-elements

- container, flex-box, sticky-header에 css prop 추가 및 코드 개선 (#1654)
- Container 유닛 테스트 추가 (#1650)
- as, css prop을 지원하는 컴포넌트와 타입 추가 (#1643)

### date-picker

- range-picker test에서 query 함수로 getAllBy 사용 (#1652)

### replies

- 댓글을 작성할 수 있도록 수정합니다. (#1649)

### docs

- popup 스토리 수정 (#1648)
- 댓글 컴포넌트의 스토리북에 control 기능을 추가합니다. (#1647)
- storybook-addon-next-router 추가 (#1646)

### router

- Link 컴포넌트의 자식 노드에 덮어쓰이는 속성이 있을 때 경고를 추가합니다. (#1645)

### form

- action-sheet-selector default label 수정 (#1641)

### etc

- swc를 사용해 빌드합니다. (#1642)
- tag object를 만들 때 SHA 참조 수정 (#1640)

## 3.2.1

### modal

- 버튼에 box-sizing css 추가 (#1638)

## 3.2.0

### common

- doc의 자체 eslint 규칙을 root로 통합합니다. (#1635)
- 린트 관련 스크립트 정리 (#1634)
- CD 워크플로에 카나리 릴리즈 job을 추가합니다. (#1628)
- 태그 삭제 API를 Github Actions로 대체 (#1627)

### view-utilities

- 호텔의 라우터 경로 중 요금 상세페이지에 대한 ROUTERLIST_REGEXES를 추가합니다. (#1632)

## 3.1.0

### core-elements

- GlobalColorSet (skyblue, lightpurple)을 추가합니다. (#1617)

### view-utilities

- 호텔의 라우터 경로중 요금 상세에 대한 ROUTERLIST_REGEXES 를 추가합니다 (#1616)

### common

- PR에 붙이는 태그에 PR 넘버 추가 (#1614)

## 3.0.2

### core-elements

- sticky-header의 zTier, zIndex 기본 값 수정 (#1621)

### view-utilities

- 오타 수정 (#1622)

## 3.0.1

## common

- CI/CD에서 의존성을 설치할 때 .npm을 캐싱 ([#1615](https://github.com/titicacadev/triple-frontend/pull/1615))
- 버전 관리 방법을 lerna로 원상복구 ([#1613](https://github.com/titicacadev/triple-frontend/pull/1613))
- lerna bootstrap 관련 스크립트 제거 ([#1613](https://github.com/titicacadev/triple-frontend/pull/1613))

## core-elements

- z-index의 기본 값이 중복으로 설정되는 것을 방지 ([#1618](https://github.com/titicacadev/triple-frontend/pull/1618))

## fetcher

- 응답이 ok일 때 `result`에 할당 ([#1619](https://github.com/titicacadev/triple-frontend/pull/1619))

## 3.0.0

### public-header

- BREAKING CHANGE: 디자인 변경 사항 반영 (#1586)

### react-contexts

- BREAKING CHANGE: env-context에 필수 props 추가 afOnelinkSubdomain, afOnelinkId, afOnelinkPid (#1586)

### core-elements

- sticky-header 컴포넌트 추가 (#1586)

## 2.41.0

### replies

- 댓글 컴포넌트를 추가합니다 (#1599)

### standard-action-handler

- Clipboard API에 fallback 함수로 execCommand 함수를 추가합니다. (#1601)

### triple-document

- 쿠폰 다운로드 버튼에서 사용하는 API 요청에 새로운 fetcher 인터페이스 사용 (#1602)

### fetcher

- fetcher 재시도 조건에서 body 존재유무를 제거합니다. (#1604)

### view-utilities

- param-injector에 injectIsSearchAd 추가 (#1605)

### core-elements

- input에 ref prop을 추가합니다. (#1606)

### common

- 패키지의 버전을 올릴 때 lerna 의존성을 제거합니다. 그리고 의존성 변경을 누락했는지 확인하는 job을 추가합니다. (#1607)
- package-lock 업데이트 (#1608)

## 2.40.0

### poi-detail

- 추천 아티클 '더 알아보기' 영역에 onClick을 추가합니다 (#1588)
- 추천 아티클 size 및 button을 변경합니다 (#1589)

### fetcher

- HttpError를 좀 더 유용하게 기록합니다. (#1594)

### view-utillities

- appsflyer 어트리뷰션 오타를 수정합니다 (#1595)
- 필요한 appsflyer 어트리뷰션를 추가합니다 (#1597)

## 2.39.0

### core-elements

- numeric-spinner 오타 수정 (#1574)
- cursor option을 추가합니다 (#1580)

### fetcher

- JSON 파싱 에러를 조용히 넘기도록 수정 (#1575)
- 새로운 fetcher 개선사항 (#1579)

### footer

- DefaultFooter 앱 다운 버튼 숨김 옵션 추가 (#1581)

### modals

- 모달의 Default Action 을 방지하는 로직을 추가합니다 (#1577)

### poi-detail

- POI DetailHeader V2 버전 지도보기에 대한 액션이 존재할때만 노출합니다 (#1583)
- RecommendedArticles가 zoneId를 받을 수 있도록 합니다 (#1585)

### public-header

- AutoHidingPublicHeader 추가 (#1578)

### triple-document

- PricePolicyCouponInfo의 쿠폰 노출 정책에 대한 강조색상을 확장합니다 (#1584)

## 2.38.1

### triple-document

- 잘못된 아이콘 파일명을 수정합니다. (#1570)

### booking-completion

- 일정추가 버튼의 텍스트를 수정합니다. (#1567)

## 2.38.0

### docs

- storieOf API 대신 CSF 포맷으로 스토리 변경 (#1562)

### triple-document

- @titicaca/scrap-button 의존성을 추가합니다. (#1564)

### react-contexts

- ScrapsProvider에 enableTrackEvent prop 추가 (#1565)

### scrap-button

- 스크랩 버튼에 이벤트 추가 (#1565)

## 2.37.0

### fetcher

- README 재작성 (#1559)

### react-contexts

- 오타수정 (#1558)

### static-map

- 반응형 이미지 지원을 위해 source 태그를 사용합니다. (#1555)

### ab-experiments

- A/B 테스트 패키지를 추가합니다. (#1552)

## 2.36.0

### react-contexts

- scraps context에 tna 타입 추가 (#1551)

### triple-document

- TNA 슬롯 컴포넌트에 저장 버튼 추가 (#1551)

### pricing

- Pricing 컴포넌트의 priceLabelOverride Props 의 타입을 확장합니다 (#1549)

## 2.35.0

### booking-completion

- 내 일정으로 담기 버튼을 추가합니다. (#1545)

### triple-document

- 추천코스에 노출되는 내 일정으로 담기 버튼을 숨김 처리합니다. (#1543)

### modals

- modal의 width를 조절할수 있는 prop을 추가 (#1542)

### fetcher

- fetcher 모듈에 새로운 인증 방식을 추가; getServerSideProps에서 fetcher를 쉽게 사용할 수 있는 방법 마련 (#1533)

## 2.34.0

### map

- CirclePin에 alwaysClickable props를 추가합니다. (#1528)

### core-elements

- BaseButton의 active border-style을 제거합니다. (#1531)

### modals

- 액션 문구의 줄바뀜 현상을 수정합니다. (#1535)

### fetcher

- Fetch함수의 파라미터를 생성하는 로직을 별도 함수로 분리합니다. (#1532)

### react-contexts

- SessionContext의 logout 함수에서 logout API를 호출합니다. (#1534)
- 새로운 인증 방식을 적용했을 때, 페이지의 인증 여부를 SessionContext로 공급합니다. (#1536)

## 2.33.0

### triple-document

- TripleDocument의 DefaultClickHandler에 trackWithMetadata를 추가합니다 (#1526)

### static-map

- 지도영역 크기의 기본척도를 개선합니다 (#1521)

### react-contexts

- Canonized URL을 Routability 체크에만 이용합니다. (#1517)
- UTM Parameter를 trackScreen의 additionalMetadata로 전달합니다. (#1509)

## 2.32.0

### common

- Next.js 11 사용을 준비합니다. (#1510)
- ⬆️ node 16 사용 (#1511)
- sync-deps: 의존성 변경을 필요한 곳에 반영하는 명령어 (#1516)
  Release Docs 워크플로가 실패하는 문제를 수정합니다. (#1518)

### triple-document

- tna element를 AB테스트 결과에 맞게 수정합니다. (#1515)

### react-context

- viewItem을 EventTrackingProvider에서 기록합니다. (#1507)
- trackScreen, trackEvent 호출 시 native client accessbility를 체크하지 않습니다. (#1513)
- EventTrackingProvider가 호출하는 trackScreen은 warn message를 출력하지 않도록 합니다. (#1512)

## 2.31.0

### common

- react 17을 준비합니다. (#1469)

### react-contexts

- 콜백 함수에서 발생한 에러를 React ErrorBoundary가 잡을 수 있도록 해주는 함수 `useErrorHandler` Hook 추가 (#1489)
- EventTrackingProvider에서 trackScreen을 수행합니다. (#1504)
- 공통 EventMetadata 를 추가하기 위한 Context API 를 추가합니다 (#1503)

### fetcher

- fetcher의 파라미터에 withApiUriBase, cookie를 추가합니다. (#1502)

### meta-tags

- 기본 OG 이미지 수정 (#1501)

### triple-document

- 아티클 내의 쿠폰선택에 관한 이벤트 로깅을 생성합니다. (#1499)

### web-storage

- @titicaca/web-storage: 효율적인 WebStorage API 에러 처리 (#1489)

### app-installation-cta

- WebStorage API 적용 (#1489)

## 2.30.2

### poi-list-element

- 관광지 리스트 poi blank image를 변경합니다 (#1498)

## 2.30.1

### static-map

- tna 아이콘 추가합니다 (#1494)

## 2.30.0

### footer

- Sotrybook Footer 오류 해결을 위한 Decorator 추가 (#1490)

### react-contexts

- `event-tracking-context`에서 firebase 참조 경로를 수정합니다. (#1488)

- `SessionContextProvider`에서 `/api/users/me` 요청을 제거합니다. (#1488)

### router

- inlink일때 AllowSource를 리턴하는 로직을 개선합니다. (#1486)

### booking-completion

- 리전을 가지고 도시메인으로 넘길때 useAppCallback으로 감싸줍니다. (#1481)

### triple-document

- 아티클 추천코스에 조건 별 Poi 행정구역명 표기 추가 (#1479)

### map

- TNA 마커 추가 (#1472)

## 2.29.1

### pricing

- FixedPricingV2 컴포넌트의 `PurchaseButtonLoadingIndicator` 애니메이션 동작 방식을 수정합니다. (#1476)

### core-elements

- `global-style` 에 blue500 color set 을 추가합니다. (#1476)

### color-palette

- `colors` 에 blue500을 추가합니다. (#1476)

## 2.29.0

### poi-list-element

- categories 타입 변경 및 PoiGQL categories를 사용합니다 (#1473)

### pricing

- FixedPricingV2 컴포넌트를 새로 생성합니다. (#1470)

### ui-flow

- 앱 환경에서 authGuard가 작동할 수 있도록 확장 (#1468)
- useSessionCallback 에 useAuthWeb 옵션 추가 (#1463)

### react-context

- Event Tracking Context에 Firebase Web 연동을 추가합니다. (#1434)
- trackSimpleEvent 퇴장을 준비합니다. (#1460)
- ab-experiment-context에 experiment_impression 액션의 이벤트를 추가합니다. (#1461)

### triple-document

- PoiGQL를 렌더링 할 수 있도록 합니다. (#1467)
- content-web에서 displayName 타입 에러를 해결합니다. (#1465)
- Custom element 사용 시 warning을 제거합니다. (#1459)
- 쿠폰 관련 로직을 정리합니다. (#1457)

### github

- 릴리즈된 버전을 PR 댓글로 추가합니다 (#1462)
- CANARY_VERSION 환경변수로 노출되지 않는 문제 수정 (#1464)

## 2.28.1

### poi-detail

- `DetailHeader` V2 리뷰 노출 로직을 수정합니다. (#1456)

## 2.28.0

### poi-detail

- `DetailHeader` V2 타이틀고 영문 타이틀 사이의 간격을 수정합니다. (#1452)

### pricing

- `FixedPricing` 컴포넌트의 패딩을 외부에서 수정할 수 있게 인터페이스를 추가합니다. (#1452)

### listing-filter

- `listing-filter` container의 padding을 외부에서 수정할 수 있게 인터페이스를 추가합니다. (#1452)

### Triple-document

- Tna Element 교체 (#1418)

### react-context

- useABExperimentContext 훅 추가 (#1453)

## 2.27.7

### poi-detail

- Detail-Header V2 리뷰 Rating과 숫자 사이의 간격을 조절합니다 (#1450)

## 2.27.6

### review

- POI 상세 리뷰에서 닉네임이 콘텐츠 박스 밖으로 나오는 오류를 수정합니다. (#1448)

## 2.27.5

### poi-detail

- DetailHeader V2 리뷰 섹션의 로직을 수정합니다 (#1445)

## 2.27.4

### router

- router 패키지의 문서를 보강합니다. (#1440)

### ui-flow

- file기반 라우팅을 사용하지 않고 rewrites를 쓸 때 authGuard가 제대로 작동하지 않는 문제 수정 (#1441)

### review

- POI 상세 리뷰에서 텍스트 겹치는 오류를 수정합니다. (#1443)

## 2.27.3

### poi-list-elements

- 행정구역 표기 추천검색 및 경로검색 결과 문구 반영합니다.(#1417)

## 2.27.2

### react-contexts

- Google Analytics의 SPA Event Tracking 방식을 적용합니다. (#1431)

## 2.27.1

### core-elements

- PointingTab non-active 상태의 컬러를 변경합니다. (#1428)

### review

- 리뷰 땡쓰 이벤트가 반대로 기록되고, 액션 이름에 있던 오타를 수정합니다. (#1429)

## 2.27.0

### ui-flow

- Option을 추가합니다. `allowNonMembers`, `authType`을 지원합니다. (#1424, #1426)

### footer

- 다운로드 버튼 줄바뀜을 수정합니다. (#1425)

## 2.26.0

### Footer

- Footer 링크를 개선합니다. (#1419)

## 2.25.0

### Pricing

- `discountRate` 컴포넌트를 위한 스타일 확장을 진행합니다. (#1412)
- `Text` Inline 속성으로 인한 `margin-bottom`이 작동하지 않는 버그를 수정합니다 (#1415)

### react-contexts

- `parseApp` 함수 외부로 노출 (#1414)

### ui-flow

- authGuard: getServerSideProps에서 로그인 여부를 검사하는 HOC (#1414)

### footer

- `DefaultFooter` 버튼 디자인 수정 (#1413)

## 2.24.0

### modals

- `modals` navigate() 후 true를 반환합니다. (#1408)

### react-contexts

- `react-contexts` authBasePath를 deprecate합니다. (#1407)

### Pricing

- FixedPricing 컴포넌트의 툴팁 색상을 Props 인자값으로 받습니다. (#1406)

### poi-detail

- DetailHeader 스타일 확장 (#1390)

## 2.23.2

### react-contexts

- Logout 구현 (#1404)

## 2.23.1

### poi-list-elements

- type optional 적용 (#1402)

## 2.23.0

### user-verification

- 일반 브라우저에서 user-verification 패키지를 사용 (#1399)

### poi-list-elements

- 아티클 상세 행정구역 표기 (#1392)

### public-header

- PublicHeader에 내 예약 목록으로 가는 링크를 추가합니다. (#1397)

### footer

- Default 푸터 디자인수정 (#1400)

## 2.22.3

### review

- 댓글 아이콘에 trackEvent를 추가 합니다 (#1391)

## 2.22.2

### review

- reviews storybook 에러를 해결합니다 (#1387)
- 댓글 아이콘 클릭 시 리뷰 상세페이지 댓글 섹션으로 이동하는 핸들러 추가 (#1385)

## 2.22.1

### poi-detail

- `ImageCarousel`에 `height` 인터페이스를 제공합니다. (#1383)

### image-carousel

- `height` 인터페이스를 제공합니다. (#1383)

## 2.22.0

### poi-detail

- `ImageCarousel`에 `padding`, `borderRadius` 인터페이스를 제공합니다. (#1381)

### review

- 대댓글이 없어도 댓글 아이콘 표시 (#1374)

### modals

- `useLoginCTAModal`이 `setReturnUrl`인터페이스를 제공합니다. (#1373)

### ui-flow

- `useSessionCallback`에 `returnUrl`을 명시할 수 있도록 합니다. (#1373)

### booking-completion

- compact, myBookingButtonTitle props 추가 (#1380)

## 2.21.1

### triple-document

- fetcher 의존성 추가 (#1377)

## 2.21.0

### poi-list-elements

- PoiListElement notes의 타입을 완화 (#1369)

### core-elements

- navbar의 title을 사용 시 children을 flexible하게 관리 (#1366)
- search-navbar의 높이를 일반 navbar와 동일하게 맞춰 수정합니다. (#1329)

### view-utilities

- generateUrl이 입력받은 query의 형식을 존중하여 병합합니다 (#1365)

### review

- messageCount 컴포넌트 추가 (#1360)

## 2.20.1

### react-contexts

- history-context 에서 url에 Hash 삽입 시 arrayFormat을 repeat 형태로 유지합니다. (#1363)

### fetcher

- customHeader를 명시해도 sessionId 보존 (#1358)

## 2.20.0

### nearby-pois

- regionId 의존성을 제거합니다 (#1355)

### view-utilities

- generateUrl 함수에 arrayFormat 옵션 인자를 추가합니다 (#1354)

## 2.19.0

### resource-list-element

- 지역명을 받을수 있도록 prop을 추가합니다. (#1348)

## 2.18.2

### triple-document

- 쿠폰 그룹 다운로드 모달, 로직 수정 (#1344)

## 2.18.1

### poi-detail

- areas type 수정 (#1342)

## 2.18.0

### static-map

- `static-map` zoom level과 frame을 제어 가능하도록 합니다. (#1310)

### view-utilities

- generateUrl 함수가 base URL의 query를 보존하지 못하는 문제 수정 (#1316)

### config

- eslint-config-triple@2.4.0 설치 (#1338)

### triple-document

- `triple-document`에서 prop으로 전달하던 값을 Context API로 공급합니다. (#1318)
- 쿠폰 그룹 다운로드 지원 (#1322)

### poi-detail, nearby-pois, poi-list-elements

- 리전없는 행정구역 표기 추가 (#1332)

### review

- 리뷰 클릭 핸들러 reviewId 타입 fix (#1337)
- 리뷰 팝업 모달 핸들러 정리, 이미지 누를 시 중복 모달 제거, 리뷰 더보기 누를시 팝업 모달 제거 (#1317)

### core-elements

- Stack 컴포넌트를 추가합니다. (#1248)
- Navbar Item 버튼이미지를 추가합니다 (#1311)

### intersection-observer

- useIntersection Hook을 추가합니다 (#1326)

### fetcher

- responseError를 get하는 로직을 추가합니다. (#1324)

## 2.17.0

### package.json

- 의존성을 추가하는 스크립트 작성 (#1309)

### core-elements

- Image.Overlay 컴포넌트에 기본 zTier 값을 추가합니다 (#1308)

### poi-list-elements

- POICardElement의 스크랩 버튼을 무조건 표시합니다 (#1307)

### modals

- transition-modal 팝업 오류 수정 (#1306)

### fetcher

- 응답의 content-type에 json이 포함되어있을 때만 json 파싱 (#1305)

### view-utilities, react-contexts

- normalize-query-keys 모듈을 추가합니다. (#1304)

### husky

- Husky v6 적용 (#1303)

### modals

- transition-modal 팝업 오류 수정 (#1306)

## 2.16.1

### core-elements

- Dark 테마 일 시 배경색 white 지정 (#1300)

## 2.16.0

### fetcher

- 특정 ErrorStatus에서 reFetch 시도합니다 (#1295)

### modals

- transition-modal 디자인 통일 (icon. description) (#1297)

### core-elements

- 사파리에서 발생하는 border-radius 버그 수정 (#1292)

### triple-document, user-verification

- 사용자 인증 플로우를 확장합니다. (#1280)

### router

- local-link 스크롤 이슈 수정 (#1289)

## 2.15.1

### common

- @egjs/flicking, @egjs/react-flicking을 최신 버전으로 업그레이드합니다. (#1287)

### core-elements

- Image.Overlay 컴포넌트 z-index 제거 (#1286)

### review

- Image Dimmer의 z-index를 제거합니다. (#1286)

## 2.15.0

### router

- Link 컴포넌트에 `트리플 전용 쿼리 파라미터`를 Optional Props 으로 추가 (#1256)

### triple-document

- `triple-document` 타임라인 영역 min-width 적용 (#1276)

### color-palette

- `white900` 추가 (#1277)

### core-elements

- global-style `--color-white900` 추가 (#1277)
- root에 정의된 colorSet만 사용하도록 `getCssVariableColor` 함수를 추가합니다. (#1275)
- Version up `content-utilities` (#1274)

### reviews

- Images 컴포넌트 추가 (#1277)
- User 컴포넌트 수정 (#1281)

### popup, action-sheet

- CSSTransion 컴포넌트 props 로 추가합니다. (#1279)

## 2.14.1

### react-contexts

- [Hitory Context] Canonization 시 유실되는 `/outlink` query param을 보존합니다. (#1270)

### poi-list-elements

- POI 목록 요소에 area 정보를 표시합니다. (#1271)

## 2.14.0

### common

- `Storybook` 사용법 링크를 추가합니다 (#1268)
- `docs`를 빌드하는 Dockerfile을 개선합니다. (#1265)

### review

- `shortend` 리뷰 개수 4개로 수정 (#1249)
- 유저 탈퇴 시에도 별점 노출 (#1249)
- 유저 프로필 여행자 클럽 정보 대신 리뷰 개수 노출 (#1249)

### core-elements

- Videon 컴포넌트 브라우저 지원을 위한 리스너 수정 (#1267)

## 2.13.1

### view-utilities

- strictQuery가 boolean 값을 결정하는 기준을 완화합니다. (#1264)

### triple-document

- local 빌드시 type에러를 수정합니다 (#1259)

### core-elements

- Video 컴포넌트 Pending 로직 변경을 위한 리스너 추가 (#1263)

## 2.13.0

### common

- 개발 환경에서 테스트 파일에 동일한 타입스크립트 설정을 적용하도록 변경 (#1234)
- 테스트 파일이 빌드되지 않도록 babel 설정 수정 (#1234)
- `build-watch`가 지켜보는 파일 범위 축소 및 로그 간소화 (#1243)
- docs.standalone 빌드 실패 문제 해결 (#1252)
- 사용하지 않는 Dockerfile 제거 (#1255)
- 사용 빈도가 낮은 GCP, GHA Manifest 삭제 (#1254)
- 패키지 의존성 그래프 개선 (#1244)

### color-palette

- 색상 변수 및 `getColor` 함수 deprecate 처리 (#1230)

### core-elements

- `global-style`에 기본 색상을 CSS 상수로 추가 (#1230)
- `VideoFrame`, `VideoElement` 컴포넌트 추가 (#1206)
- `Video` 컴포넌트 구조 정리 (#1206)

### react-contexts

- [Device Context] `autoplay`와 `networkType` 값 추가 및 request header에서 이들을 파싱하는 함수 추가 (#1221)
- [Scraps Context] 스크랩 여부를 컴포넌트 트리 전체가 한 객체에 저장하도록 처리 (#1231)

### fetcher

- Body의 Stringfy하지 않는 옵션 추가 (#1241)

### popup

- 팝업 컨테이너 하단 패딩 제거 (#1236)

### triple-document

- links 컴포넌트 중 "list" 타입의 links를 기본 links 컴포넌트로 fallback 처리 (#1247)

### docs

- Storybook 6 사용 (#1245)
- `triple-document` 스토리 정비 (#1246)

## 2.12.1

### poi-detail

- RecommendedArticles 하단 링크 TEXT 수정 (#1237)

## 2.12.0

### type-definitions

- [type-definitions] 인벤토리 API 응답 타이핑 (#1223)

### poi-detail

- RecommendedArticles, TransitionModal Text 수정 (#1232)

### core-elements

- optimizedImg를 사용함에 필요한 optimized Prop 추가 (#1185)

### triple-document

- `Ship` 아이콘 추가 (#1226)

### common

- 버전을 올리고 `package-lock.json`, `docs/package-lock.json` 업데이트 하는 스크립트 추가 (#1222)

## 2.11.0

### app-installation-cta

- article-card-cta 컴포넌트 추가 및 story doc 추가 (#1197)

### date-picker

- DayPicker-wrapper를 768로 제한 (#1216)

### core-elements, action-sheet, app-installation-cta, floating-install-button, popup

- 화면 레이아웃을 벗어나는 UI의 최대 너비 제한 (#1212)

### common

- npm@7 사용 이후 의존성 설치에 실패하는 문제 수정 (#1213)
- `react-contexts` 패키지를 사용할 때 peer Dependency로 의존하도록 수정 (#1215)
- 빌드, 개발 과정에 [TypeScript의 Project Reference 설정](https://www.typescriptlang.org/docs/handbook/project-references.html) 적용 (#1215)

### react-contexts

- [images-context] reFetch Action 추가 (#1210)

### triple-document

- [tag-label] 태그라벨 안 이미지 변경, square 모서리 부분 수정 (#1195)
- [poi] poi 추천코스에 하나만 넣으면 zoom level이 너무 커져 default zoom 값 수정 (#1195)

### carousel

- carousel 패키지 추가 (#1120)

### core-elements

- [carousel] Carousel 컴포넌트 deprecated 주석 명시 (#1120)

### view-utilities

- query 값의 타입을 확정해서 사용할 수 있게 해주는 `strictQuery` 추가 (#1201)

## 2.10.1

### common

- [common] peerDependencies에 이미 있는 모듈을 devDependencies에서 제거합니다 (#1186)

### triple-document

- 지도, 추천코스 아이템이 없는 케이스에 대한 예외처리 (#1194)

## 2.10.0

### social-reviews

- Support placeholder image for social reviews (#1193)

### triple-document

- 임의의 anchor 컴포넌트 추가 (#1190)
- 지도,추천코스 > 일정담기 이벤트 핸들처리 로직 추가 (#1191)

## 2.9.2

### triple-document

- 지도, 추천코스 Poi 메모 영역 line-height 값 조정 (#1184)

## 2.9.1

### triple-document

- 지도, 추천코스 Poi 카드 타이틀, 메모 말줄임 처리 (#1180)

## 2.9.0

### date-picker

- enableSameDay가 false일 때 같은날짜를 무시하는 로직 개선 (#1174)

### triple-document

- optimized prop를 추가 (#1165)
- Triple Document에 지도, 추천컴포넌트 추가 (#1167)

### footer

- Default Footer 안 wording을 변경합니다 (#1168)
- Footer 패키지에서 사용하는 react-contexts를 peerDependencies에 추가합니다 (#1177)

### triple-media

- OptimizedImg 컴포넌트를 추가합니다 (#1163)

### image-carousel

- flicking isPaying 시 clickEvent를 발생 시키지 않음
  useRef를 사용하여, react-flicking 내부 인터페이스 사용 (#1162)

## 2.8.0

### common

- tsconfig.tsbuildinfo 파일의 change event를 무시합니다. (#1153)
- npm workspaces 사용 (#1152)
- package-lock 업데이트 (#1154, #1155)
- 컴포넌트의 underline 설정이 우선하도록 && hack 추가 (#1157)

### core-elements

- lazy loading 및 cloudinary optimization처리되는 `OptimizedImg`를 추가합니다. (#1145)

## 2.7.3

### react-contexts

- `ab-experiment-context`의 `ABExperimentProvider`에서 실험 정보 API를
  세션이 있을 때만 호출하도록 수정 (#1150)

## 2.7.2

### react-contexts

- `ab-experiment-context`의 `useABExperimentVariant`에 실험 시작 이벤트에 attribute를 추가할 수 있는 파라미터 추가 (#1148)

## 2.7.1

### react-contexts

- `experiment-context`의 `useABExperimentConversionTracker`의 반환 함수 타입 수정 (#1146)

## 2.7.0

### react-contexts

- `experiment-context` 모듈 추가 (#1123)

### map

- `@types/googlemaps` 버전에 ~ 사용 (#1143)

### router

- link 모듈 구현 (#1121)
- 키 누르고 링크를 눌렀을 때 기본 앵커 태그처럼 작동하도록 처리 (#1142)

## 2.6.0

### react-contexts

- tna 상세프로그램 더보기 router를 추가합니다. (#1135)

### Modals

- tna type의 description을 수정합니다. (#1130)

### MapView

- `bounds`, `padding` ,`onLoad` prop 을 추가합니다. (#1131)
- 구글맵 `Libraries` 옵션 설정 관련 performance warning 이슈 해결 (#1127)

## 2.5.0

### map

- `MapView` 컴포넌트를 추가합니다.

### react-contexts

- in-app 내비게이션에도 URL canonization을 적용합니다. (#1090)
- `navigate()` 에서 tna 상세로의 링크를 허용합니다. (#1113)

### recommended-contents

- ul 바로 아래에 li 태그가 들어가도록 수정 (#1117)

### meta-tag

- Facebook OpenGraph의 `title`, `description` 태그 기본값을 `env-context`에서 가져옵니다. (#1112)

### poi-detail

- Image carousel의 가로폭을 768 기반으로 변경합니다. (#1114)

### public-header

- 로고 이미지 비율을 바로잡습니다. (#1115)

### resource-list-element

- 가격정보를 `children` 으로 받을 수 있도록합니다. (#1109, #1110)

### navbar

- `maxWidth` 가 기본값을 100%를 가지도록 처리합니다. (#1108)

## 2.4.1

### ad-banners

- `ContentDetailsBanner` 컴포넌트 Click Event contentType 수집

## 2.4.0

### common

- `HistoryProvider`, `SessionContextProvider` 를 Storybook Decorator로 제공합니다. (#1080)
- 760 대신 768을 기준으로 큰 화면 레이아웃을 구성합니다. (#1091)

### ad-banners

- `ListTopBanners` 컴포넌트 `margin` 추가 (#1092)
- `ListTopBanners` 컴포넌트 `contentId` props를 optional props로 수정 (#1092)
- `ContentDetailsBanner` 컴포넌트 추가 (#1099)

### date-picker

- 공휴일을 추가합니다 (#1097)

### react-contexts

- 환경 변수를 공급하는 context 추가. `EnvProvider`, `useEnv` (#1059)
- `HistoryProvider`에 env context 적용 및 `appUrlScheme`, `webUrlBase` prop deprecate 처리 (#1059)
- `SessionContextProvider`에 env context 적용 및 `authBasePath` prop deprecate 처리 (#1059)
- `withEventTrackingProvider` 에 `options` 파라미터추가 (#1087)
- `pageLabel` State를 삭제합니다. (#1094)

### resource-list-element

- `resource`를 optional하게 받을수 있도록 수정합니다. (#1093)

### reviews

- env context 적용 및 `ReviewContainer`의 `appUrlScheme` prop deprecate 처리 (#1059)

### search

- `Search` 컴포넌트에서 `backOrClose` 제거 (#1096)

### footer

- `CSFooter`에 env context 적용 및 `appUrlScheme` prop deprecate 처리 (#1059)

### meta-tags

- `AppleSmartBannerMeta`와 `FacebookAppLinkMeta`에 env context 적용 및 `appUrlScheme` prop deprecate 처리 (#1059)
- `EssentialContentMeta`의 `canonicalUrl` prop의 기본 값 제거 및 값이 없을 때 태그 표시 안 함 (#1095)
- `FacebookOpenGraphMeta`의 `canonicalUrl`을 필수 prop으로 변경 (#1095)

## 2.3.1

### ui-flow

- `GuardedScrapsProvider`가 export되지 않는 문제를 수정합니다. ([#1084](#https://github.com/titicacadev/triple-frontend/pull/1084))

## 2.3.0

### core-elements

- `H1Props`의 `children`을 `PropsWithChildren`으로 표현 ([#1074](https://github.com/titicacadev/triple-frontend/pull/1074))

### ui-flow

- 패키지 추가 ([#1063](https://github.com/titicacadev/triple-frontend/pull/1063))
- `GuardedScrapsProvider` 추가 ([#1065](https://github.com/titicacadev/triple-frontend/pull/1065))

### action-sheet

- 기본 `zTier`를 3으로 설정합니다. ([#1070](https://github.com/titicacadev/triple-frontend/pull/1070))

### poi-detail

- 헤더의 거점지역 형식을 수정합니다. ([#1058](https://github.com/titicacadev/triple-frontend/pull/1058))
- 영업시간 prop의 형식을 수정합니다. ([#1062](https://github.com/titicacadev/triple-frontend/pull/1062))

### social-reviews

- 링크의 설명 영역을 한 줄로 제한합니다. ([#1082](https://github.com/titicacadev/triple-frontend/pull/1082))

### directions-finder

- 현지 이름, 주소가 있을 때만 "현지에서 길묻기" 버튼을 노출합니다. ([#1079](https://github.com/titicacadev/triple-frontend/pull/1079))

### ad-banners

- 최신 API를 반영합니다. ([#1073](https://github.com/titicacadev/triple-frontend/pull/1073))
- `ContentType`에 `air`를 추가합니다. ([#1073](https://github.com/titicacadev/triple-frontend/pull/1073))
- default export하는 컴포넌트를 deprecate 처리하고, `ListTopBanners`를 추가합니다. ([#1073](https://github.com/titicacadev/triple-frontend/pull/1073))

### review

- 앱 관련 액션을 하나의 훅으로 모읍니다. ([#1077](https://github.com/titicacadev/triple-frontend/pull/1077))
- 액션에 유저 인증을 필수로 합니다. ([#1064](https://github.com/titicacadev/triple-frontend/pull/1064))

### meta-tags

- 중복될 수 있는 `meta` 태그에 `key`를 추가합니다. ([#1069](https://github.com/titicacadev/triple-frontend/pull/1069))

## 2.2.1

### review

- 액션시트의 zTier를 3으로 명시 (#1060)

## 2.2.0

### Search

- 검색 컴포넌트에 인풋 클릭 핸들러 prop을 추가합니다. (#1052)

### common

- eslint-config-triple 최신 버전을 설치합니다. (#1054)

### react-context

- label를 추가합니다. (#1056)

## 2.1.0

### common

- github action setEnv 방식 변경 (#1044)
- Environment variable을 직접 참조합니다. (#1048)

### footer

- `CSFooter` 컴포넌트에 ButtonClickEvent의 callback을 오버라이드 할수 있는 prop을 추가합니다. (#1040)

### react-contexts

- navigate() 에서 URL을 더 상세하게 해석합니다. (#1036)
- 스크랩 count를 사용하는 부분 ScrapsProvider 없는 경우 대응 (#1042)
- session-context의 getSessionId가 클라이언트 쪽에서도 쿠키를 가져오도록 수정 (#1047)

### modals

- 낮은 버전 Android 기기에는 /login path가 없습니다. Alert을 대신 렌더링합니다. (#1049)

### core-elements

- SencondaryNavbar의 position 기본값 수정 (#1045)

### type-definitions

- Image frame 관련 공통 타입을 type-definitions 패키지로 옮깁니다. (#1043)

## 2.0.0

### common

- 등장, 퇴장 애니메이션이 있는 컴포넌트에
  `CSSTransition`의 `mountOnEnter`, `unmountOnExit` 설정하는 prop 추가
- PR 정보를 가져오는 gh-tools 커맨드 `fetch-github-pr`로 변경 (#977)
- 타입이 어긋나있던 story를 수정 (#985)
- 전역 테스트 환경을 설정합니다. (#1023)

### icons

- Icons 컴포넌트를 추가합니다. (#806)

### fetcher

- fetcher 유틸을 추가합니다. (#962)

### constants

- 공통 상수 및 정규 표현식을 담는 모듈 추가합니다. (#1010)

### core-elements

- `Image` 컴포넌트를 하위 컴포넌트를 조합하는 방식으로 개선 (#956, #1006)
- `Navbar`에 `position` prop 추가 및 `SecondaryNavbar` prop 개선 (#980)
- triple-document에 있던 typography 컴포넌트 추가 (#978)
- `Video`에 `showNativeControls` prop 추가 (#996)
- `SearchNavbar`에 `borderless` prop 추가 (#1009)
- `PointingTab`의 세로 패딩을 조정할 수 있는 prop 추가 (#995)

### action-sheet

- 오버레이를 클릭했을 때 propagation을 막습니다. (#1024)

### date-picker

- `beforeBlock`, `afterBlock` prop의 형식을 Date에서 string으로 바꿉니다.

### react-contexts

- `withEventTrackingProvider` HOC 추가, event-tracking-context 구조 개선 및 문서 보강 (#974)
- Event Tracking Context에 Facebook Pixel 연동 (#979)
- history context에서 해시 추가할 때 root 페이지에서 asPath가 /인 상황 대응 (#1003, #1011)
- `SessionContextProvider` 를 추가합니다. (#1022)
- `ScrapsProvider`가 없으면 `useScrapsContext`에서 에러를 던집니다. (#1027)
- 자식에서 `ScrapsProvider`가 없다는 에러를 잡고, UI를 없애주는 `ScrapsContextGuard` 컴포넌트를 추가합니다. (#1027)

### react-hooks

- `useLottie` 추가 (#1012)

### poi-detail

- `DetailHeader`에 거점 지역 정보 추가 (#976)

### poi-list-elements

- `POICardElement`에서 계산된 스크랩 카운트 사용 (#1015)

### scrap-button

- react-context를 연동하여 Uncontrolled 컴포넌트로 변경 (#900, #984)
- Regular, Compact deprecated 처리 및 Overlay, Outline으로 이름 변경 (#1027)
- 스크랩 버튼 size 조절 prop 추가 (#1027)
- 스크랩 버튼을 가릴 수 있는 `ScrapsButtonMask` 컴포넌트 구현 (#1027)

### drawer-button

- layering props 추가 (#990, #1007)
- 배경색 추가 (#1019)

### search

- `borderless` prop 추가 (#1009)
- `zIndex`, `zTier` 를 prop 으로 받을 수 있도록 합니다. (#1031)

### triple-document

- elements 디렉토리 추가, Regions, T&A 관련 export를 제거 및 typography 컴포넌트 core-elements로 이동 (#978)
- Inline link click handler 추가 (#994)
- `hideVideoControls` prop 추가 (#996)
- Video control 제어를 위해 앱 버전 사용 (#1017)
- `table` element 데이터 스키마 변경 (#1020)

### triple-media

- `showNativeControls` prop 추가 (#996)
- `margin`, `frame` 을 추가합니다. (#1033)

### modal

- LoginCTAModalProvider 컴포넌트와 `useLoginModal` hook 함수를 추가합니다. (#1034)

## 1.34.0 (2020-09-02)

### meta-tags

- 메타 태그 컴포넌트 추가 (#929)

### action-sheet

- 구조정리 및 최신 패턴 적용 (#937)

### search & hook

- onEnter, onAutoCompletion 기능 개선 및 취소기능 재구현 (#939)

### common

- style-box 패키지의 cstype을 3으로 업그레이드합니다. (#945)

## 1.33.0 (2020-08-26)

### common

- UI 요소의 등장, 퇴장 애니메이션을 정비하고; 퇴장 상태에서 UI를 가립니다. (#932)

### publich-header

- `mobileViewHeight`, `borderless` 속성 추가합니다. (#931)

### react-contexts

- history-context를 둘로 나눕니다. (#930)

### poi-list-elements

- poi-card-element에 priceLabelOverride를 추가합니다. (#925)

## 1.32.0 (2020-08-20)

### triple-document

- gapless-block의 경우 컨테이너의 상하단 마진을 삭제합니다. (#918)

### review

- 유저 포인트가 있을 때에만 UI를 노출합니다. (#919)

### standard-action-handler

- 타이핑을 개선합니다. (#922)

### content-sharing

- Asset 이미지를 HTTPS 프로토콜로 fetch합니다. (#920)

## 1.31.0 (2020-08-13)

### core-elements

- navbar를 확장에 유연하도록 변경합니다 (#911)

### standard-action-handler

- 신규 패키지를 추가합니다 (#910)

## 1.30.2 (2020-08-11)

### common

- csstype 3으로 업그레이드 (#913, #914)

### app-installation-cta

- 앱설치 배너 제목을 입력할 수 있는 기능 추가 (#915)

## 1.30.1 (2020-08-03)

### core-elements

- label 색상에 orange 를 추가합니다. (#906)

## 1.30.0 (2020-07-30)

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

## 1.29.0 (2020-07-22)

### core-elements

- pointing Tabs에 스크롤 prop을 추가합니다. (#873)

### hub-form

- CTA 버튼의 배경색을 변경합니다. (#855)

### react-contexts

- asyncBack과 historyContext의 back 타입을 조정합니다 (#879)

### common

- eslint rule을 타입스크립트로 변경합니다. (#878)

## 1.28.1 (2020-07-16)

### app-installation-cta

- Chatbot CTA 가 inventory item 이 없을때 콘텐츠가 비어있는 상태로 뜨는 문제를 수정합니다. (#877)

## 1.28.0 (2020-07-15)

### app-installation-cta

- 각 CTA 에서 모두 지표 트래킹을 가능하게합니다. (#872)

### core-elements

- Radio컴포넌트의 텍스트 `text-align` 을 left로 고정합니다. (#871)

## 1.27.1 (2020-07-09)

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

## 1.26.0 (2020-07-01)

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

## 1.25.0 (2020-06-24)

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

## 1.24.0 (2020-06-18)

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

## 1.23.0 (2020-06-04)

- `react-contexts` device context에 state 추가 #787device context에 state 추가 (#787)
- `common` Config: lint 설정을 개선합니다. (#783)

## 1.22.0 (2020-06-02)

- `react-contexts` ImageContext에서 hotel 타입의 경우에는 poi 타입으로 변경하지 않습니다. (#775)
- `search` enter 시 input blur 처리하도록 액션을 추가합니다. (#776)
- `core-elements`, `action-sheet` Navbar 컴포넌트와 ActionSheet.Item 컴포넌트에 message, support 아이콘을 추가합니다. (#771)
- `poi-detail` Actions 컴포넌트에 margin, padding타입을 추가합니다. (#773)
- `common`
  - Navbar, Footer, AppBanner, PublicHeader의 tag를 시멘틱한 tag로 수정합니다. (#778)
  - typescript(3.9,x), styled-component(5.x)를 최신버전으로 올립니다. (#780)

## 1.21.0 (2020-05-21)

- `core-elements` Text 요소에서 textAlign props 를 제공합니다. (#346) (#765)
- `resource-poi-element` partnerName을 추가합니다. (#766)
- `triple-document` 에서 embedded 컴포넌트를 별도의 파일로 분리합니다. (#759)
- `common`
  - cd worlflow 에서 tagging 시 v prefix 가 누락되는 버그를 수정합니다. (#768)
  - canary publish 시 전달이 누락된 GITHUB_TOKEN 을 추가합니다. (#764)
  - cd workflow 내 notifier 전달 파라미터 오타 수정 (#761)

## 1.20.0 (2020-05-14)

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

## 1.19.1 (2020-05-11)

- `view-utilies` type-definition 모듈 의존성 devDep -> dev 으로 변경합니다.

## 1.19.0 (2020-05-07)

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

## 1.18.0 (2020-04-27)

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

## 1.17.2 (2020-04-22)

- `core-elements` tabs 와 select에 적용한 color 값 오류를 수정합니다. (#686)

## 1.17.1 (2020-04-20)

- `resource-list-element` (#677)
  - maxCommentLines props 을 추가하여 POI 설명 노출 라인 수 제어
  - basePriceUnit 을 추가합니다
- `scrap-button` 2배 아이콘을 3 배 아이콘으로 변경합니다 (#677)

## 1.17.0 (2020-04-20)

- `core-elements` List 하위 li에 적용되는 스타일은 direct children에만 영향이 있도록 합니다 (#673)
- StaticIntersectionObserver를 사용합니다 (#672)
- `social-reviews` Divider를 바로잡습니다 (#670)
- `resource-list-element` POI, 상품 리스트 엘리먼트를 li 외의 태그로 렌더링 가능하게 합니다 (#669)
- `color-palette` 체크리스트 v2에서 사용되는 컬러셋을 추가합니다 (#668)

## 1.16.1 (2020-04-17)

- `core-elements` List divider의 default style을 수정합니다 (#662)
- `common` PR canary release 시 올바른 커밋을 fetch합니다 (#663)
- `pricing` 잘못된 색상을 수정합니다 (#664)
- `modal`, `popup`, `action-sheet` user-select를 none으로 변경합니다 (#666)

## 1.16.0 (2020-04-16)

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

## 1.15.0 (2020-04-10)

- `location-properties` 패키지에 `onCopy` 핸들러 추가 (#641)

## 1.14.0 (2020-04-09)

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

  ```ts
  interface ReviewLikesContextProps {
    deriveCurrentStateAndCount: (currentState: {
      reviewId: any;
      liked: boolean;
      likesCount: number;
    }) => { liked: boolean; likesCount: number };
    updateLikedStatus: (newLikes: { [reviewId: string]: boolean }) => void;
  }
  ```

- `ReviewLikesContext`의 위치를 `@titicaca/review` 패키지로 옮깁니다.
