# `@titicaca/core-elements`

트리플의 프론트엔드 페이지에서 쓰이는 공통 디자인 요소들을 구현한 라이브러리입니다.
[React](https://reactjs.org/)로 구현되었고, 현재 컴포넌트들의 동작은
[Storybook](https://storybook.js.org/)으로 구성한 [https://design.triple.systems](https://design.triple.systems)
페이지를 참조해 주세요.

## 설치하기

아래와 같이 설치합니다.

```
$ npm install @titicaca/triple-design-system
```

Private 패키지여서, 설치를 위해 NPM의 @titicaca 조직에 접근 권한이 필요합니다.

## 개발하기

### 환경 구축하기

프로젝트를 클론합니다:

```sh
$ git clone git@github.com:titicacadev/triple-design-system.git && cd triple-design-system
```

디펜던시를 설치합니다:

```sh
$ npm install
```

`/docs` 디펜던시를 설치합니다:

```sh
$ cd docs && npm install
```

### 디렉토리 구성

컴포넌트는 아래의 두 디렉토리에 역할별로 분리하여 관리합니다.

  - `src/elements`: UI 구성 요소
  - `src/views`: 트리플의 모델 스키마를 반영한 UI + 기능 컴포넌트

### 브랜칭 모델

[GitHub Flow](https://guides.github.com/introduction/flow/)에 따라 `master`는 항상
배포 가능하게 유지하고 있습니다. 모든 기능 변경은 feature branch 를 생성하여 작업하고
프론트엔드 팀의 리뷰를 거쳐 `master`에 머지합니다.

### Docs: `/docs`

Storybook으로 구현한 문서화 페이지입니다. 컴포넌트 추가나 변경이 생길 때, 그에
따라 Docs 변경이 필요합니다. 가급적 기능 관련 PR에 함께 포함하여 진행하는 것으로
합니다.

로컬 환경에서는 아래와 같이 docs 서비스를 실행합니다:

```sh
$ cd docs && npm run dev
```

### 이미지

이미지 등의 리소스는 번들에 포함시키지 않고, CDN을 통해 브라우저에서 접근
가능하도록 합니다. CDN을 통해 제공할 리소스는 [triple-web-assets](https://github.com/titicacadev/triple-web-assets)
저장소에서 관리하고 있습니다.

### 자동화 테스팅

[Cypress](https://www.cypress.io/)를 이용한 end-to-end 테스팅을 수행합니다.
`/test` 디렉토리에서 테스트 suite과 테스트용 앱을 관리합니다.

## 배포

NPM의 [`@titicaca/triple-design-system`](https://www.npmjs.com/package/@titicaca/triple-design-system)
패키지로 배포합니다.

### 버전 정책

  - 1주에 한 번 정기 릴리즈합니다.
  - 릴리즈시마다 릴리즈 매니저를 정합니다.
  - [Semantic versioning](https://semver.org/)에 따라 릴리즈 매니저가 버전명을 결정합니다.
  - 정기 릴리즈 외에 PR 머지 후 개별 서비스에서 바로 이용하고자 할 때는 다음 예상 버전에 rc를 붙여 버저닝합니다.
    - `0.2.9-rc.9`
