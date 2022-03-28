# `@titicaca/user-verification`

사용자 인증 정보와 관련 액션의 helper 함수를 제공하는 패키지입니다.

## `useUserVerification`

```js
const {
  verificationState: { verified, phoneNumber, error },
  initiateVerification,
} = useUserVerification({
  verificationContext: 'purchase',
  forceVerification: false,
})
```

### Props

- `verificationContext`: 사용자 인증이 이루어지는 맥락을 명시합니다.
  `purchase` (default)와 `cash`를 값으로 가질 수 있습니다.
- `forceVerification`: 컴포넌트 Mount와 동시에 인증 플로우로 유도할지
  결정합니다.

### Return Values

- `verificationState`
  - `phoneNumber`: 인증된 전화번호 (있을 경우)
  - `verified`: 인증 상태
  - `error`: 에러 (있을 경우)
- `initiateVerification`: 필요한 경우 호출하여 인증 플로우를 시작합니다.
  트리플 앱의 브라우저 기준으로 인증 페이지를 렌더링하는 새 창을 생성합니다.

## `VerificationRequest`

구매 동선 등에서 인증 단계를 추가할 때 mount하는 컴포넌트입니다. 사용자가
인증 단계를 거치지 않았을 경우 Modal을 표시하고 인증을 요구합니다.

### Props

- `verificationContext`: 사용자 인중이 이루어지는 맥락을 명시합니다.
  `purchase` (default)와 `cash`를 값으로 가질 수 있습니다.
- `onCancel`: Modal의 뒤로가기 액션에 대한 핸들러 함수입니다.
