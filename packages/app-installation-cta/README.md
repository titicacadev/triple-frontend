# `@titicaca/app-installation-cta`

앱설치 유도 컴포넌트를 모아놓은 패키지입니다.

## Usage

```:javascript
import { AppInstallationCTA } from '@titicaca/app-installation-cta'

...

<AppInstallationCTA
  imgUrl="~~~"
  installUrl={appLink...}
  message="앱 다운로드시 가이드북 무료"
/>
```

이 컴포넌트가 마운트 되면 설치 유도 이미지 배너가 뜨고,
이를 끌 경우 컴포넌트가 있는 위치에 텍스트 배너를 띄웁니다.
