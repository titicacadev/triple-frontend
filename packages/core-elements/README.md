# `@titicaca/core-elements`

트리플의 프론트엔드 페이지에서 쓰이는 공통 디자인 요소들을 구현한 라이브러리입니다.

### 이미지

이미지 등의 리소스는 번들에 포함시키지 않고, CDN을 통해 브라우저에서 접근
가능하도록 합니다. CDN을 통해 제공할 리소스는 [triple-web-assets](https://github.com/titicacadev/triple-web-assets)
저장소에서 관리하고 있습니다.

### 자동화 테스팅

[Cypress](https://www.cypress.io/)를 이용한 end-to-end 테스팅을 수행합니다.
`/test` 디렉토리에서 테스트 suite과 테스트용 앱을 관리합니다.
