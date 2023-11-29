/**
 * guestMode가 undefined가 아닌 경우, 로그인이 필요한 동작(스크랩, 리뷰쓰기)등이 불가능하며, 앱으로 연결되는 루트를 차단합니다.
 * 로그인 없이 triple-document를 사용하는 페이지를 사용자가 탐색할 수 있도록 할 때 사용합니다(예. 외부 이벤트에 POI 상세페이지 제공).
 * - 'seoul-con' : '서울콘' 행사. triple-content-web에서 가이드와 POI 영어 컨텐트를 제공합니다.
 */
export type GuestModeType = 'seoul-con'
