# `@titicaca/ui-flow`

UI 플로우 구성을 위해 사용할 수 있는 함수, React Hook, 컴포넌트들입니다.

## Hooks

### `useSessionCallback`

`SessionContext`가 존재하는 환경에서, `sessionId`가 없을 때 실행할 수 없는 액션
핸들러와 함께 사용해 사용자가 해당 액션을 수행하고자 할 때 로그인을 유도합니다.

### `useAppCallback`

`UserAgentContext`를 사용해 트리플 앱 내에서만 실행 가능한 액션에 접근하는
사용자들에게 앱 설치를 유도합니다. 일반 브라우저에서만 작동합니다.

## Components

### `GuardedScrapsProvider`

앱 설치 및 인증을 필수로 요구하는 Scrap 액션을 수행할 떄 로그인/앱 설치를
유도합니다. `ScrapsProvider`를 사용하는 부분들을 `GuardedScrapsProvider`로
대체할 수 있습니다.

## `authGuard`

인증이 필요한 페이지의 `getServerSideProps`에 검사 로직을 추가하는 HOC입니다.

[자세히](./src/auth-guard/README.md)
