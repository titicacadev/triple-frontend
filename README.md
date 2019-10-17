# Triple Frontend Monorepo

트리플 프론트엔드 공용 컴포넌트 및 라이브러리의 [Monorepo](https://en.wikipedia.org/wiki/Monorepo)입니다.

[Lerna](https://lerna.js.org/)를 이용해서 작업하고 있습니다.

## 소개

프론트엔드 관련 프로젝트 중 애플리케이션 프로젝트에 속하지 않는 공용 컴포넌트 및
라이브러리 프로젝트를 이 저장소에 모아서 관리합니다. 애플리케이션 프로젝트들은
유연한 비즈니스 요구사항 대응을 위해 별도 저장소로 운영해서, 버전 충돌을 피하고
비교적 단순한 배포 주기를 가져갈 수 있도록 합니다.

이 저장소에 속한 패키지들은 npm의 `@titicaca` 조직이 포함합니다.

### 기능 요청 및 문의

Slack `@frontend` 그룹, `#triple-web-dev` 채널 및 GitHub `@frontend` 팀

### Project Structure

  - `docs/`: [Storybook](https://storybook.js.org)으로 생성하는 Documentation page
  - `packages/`: npm에 배포하는 트리플 프론트엔드 패키지
  - `tests/`: [Cypress](https://www.cypress.io)를 이용한 end-to-end 테스팅 환경

### Package Versioning

모든 패키지를 동시에 같은 버전으로 릴리즈합니다. 버저닝 방식은 하위 패키지 전체를
아우르는 [Semantic Versioning](https://semver.org)을 사용합니다: `MAJOR.MINOR.PATCH`로
버저닝하며, 아래 설명을 참고하여 해당하는 버전을 올립니다.

>  1. `MAJOR` version when you make incompatible API changes,
>  2. `MINOR` version when you add functionality in a backwards compatible manner, and
>  3. `PATCH` version when you make backwards compatible bug fixes.

#### Versioning by Examples

  - 특정 패키지에 기능 추가: 인터페이스 변경 없이 특정 패키지의 기능이
    추가되었다면 `MINOR` 버전을 올립니다.
  - 패키지 추가: 다른 패키지에 영향이 없는 범위에서 패키지가 추가되었다면 기능
    추가로 볼 수 있고, `MINOR` 버전을 올립니다.
  - 패키지 분리: 분리 대상인 패키지의 인터페이스에 변경이 일어납니다. 해당
    패키지를 이용하는 프로젝트들에 코드 변경이 필요하기 때문에 `MAJOR` 버전
    올림에 해당합니다.
  - 인터페이스 개선: 인터페이스 변경이 하위 호환을 보장하는지 여부에 따라서
    `MAJOR` 혹은 `MINOR` 버전 올림에 해당합니다.
  - 버그 수정: 인터페이스 변경이 없는 버그 수정은 `PATCH` 버전 올림입니다.

### Documentation

[Triple Frontend Documentation](https://design.triple.systems) 페이지에서 컴포넌트
목록과 뷰, 동작을 볼 수 있습니다. `master` 브랜치에 변경 사항을 푸시할 때마다
페이지를 업데이트합니다.

### CI/CD

TBD

### History

많은 1.0 버전 이전의 변경사항은 [triple-design-system](https://github.com/titicacadev/triple-design-system)
저장소의 PR 및 코멘트를 참조해야 할 수 있습니다.

## 기여

프로젝트 기여자들이 작업하는데 필요한 준비 및 작업 과정을 설명합니다.

### Prerequisites

  - NodeJS 10 이상 (12 이상 및 최신 버전 추천)
  - Lerna (`npm install -g lerna`)

### Setup

프로젝트를 클론합니다:

```sh
$ git clone git@github.com:titicacadev/triple-frontend.git && cd triple-frontend
```

디펜던시를 설치합니다:

```sh
$ npm install
```

[Lerna bootstrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap)
커맨드로 Monorepo 개발 환경을 구성합니다:

```sh
$ lerna bootstrap
```

### Workflow

#### 기능 추가

  1. 작업자가 코드 기여
    - 디펜던시에 변경이 있는 경우 `lerna bootstrap` 실행 필요
  2. 커밋 & 푸시
  3. PR 생성 & 리뷰
  4. 버전 생성 (Optional): `npm run version` (경우에 따라 PR과 함께 혹은 별도로 생성)
  5. master 머지
  6. `/release` 커맨드로 배포
  7. 배포 (Optional): CD에서 패키지 publish, npm 페이지 통해서 확인

#### 패키지 추가

  1. `lerna create [패키지명]` 커맨드로 패키지 추가
  2. 적절한 `package.json` 및 `tsconfig.json` 수정 및 생성
  3. 프로젝트 루트에서 `lerna bootstrap` 커맨드 실행으로 디펜던시 링크
  4. `src`에 코드 작성
  5. 버전 생성 (Optional): 기존 패키지에서 분리가 일어나서 API 인터페이스에
     변경이 있었다면 MAJOR, 기존 패키지와 관련 없는 패키지 추가라면 MINOR 버전
     올림
     - `npm run version -- major`
     - `npm run version -- minor`
  6. 커밋 & 푸시
  7. PR 생성 & 리뷰
  8. master 머지
  9. `/release` 커맨드로 배포
  10. 배포 (Optional): CD에서 패키지 publish, npm 페이지 통해서 확인

### Testing

#### 테스트 방법
  - `npm test` 커맨드로 테스트

#### 성공 시
  - 커밋 푸시

#### 실패 시
  1. `cd tests` 커맨드로 `/tests` 폴더로 이동
  2. `npm start` 커맨드로 서버 실행
  3. `npm run cypress:open` 커맨드로 cypress 창 띄우기
  4. 실패 원인 확인
  5. 실패 원인, 변경 사항에 따라 `/cypress/integration/*.spec.js` 파일 혹은 `/src/*/App.js` 파일을 손봅니다

### Review

  - 모든 PR 리뷰는 GitHub의 `@frontend` 팀에게 자동으로 할당됩니다.
  - 팀 멤버 2인 이상이 승인해야 머지할 수 있습니다.
  - 머지 전 머지 체크리스트를 모두 확인해야 합니다. (TBD: `PULL_REQUEST_TEMPLATE.md` 작성 필요)

### 주의사항

  - 새로운 패키지를 추가하거나 패키지 간 의존성 그래프가 바뀌면 반드시
    `lerna bootstrap` 커맨드로 의존성을 바로잡아야 합니다.
  - Docs를 비롯한 패키지 내에서 다른 패키지를 import하는 경우, 대상 패키지를
    빌드한 이후에만 의도한 동작을 수행할 수 있습니다.
  - 뷰 및 기능에 변경이 있는 기여인 경우, docs 페이지도 그에 준하게 업데이트해야
    합니다.
  - CHANGELOG 반영이 필요한 경우, PR에 포함하여 CHANGELOG를 작성해야 합니다.
