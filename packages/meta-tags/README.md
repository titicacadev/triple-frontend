# `@titicaca/meta-tags`

현재 사용중인 메타태그들을 묶어둔 패키지입니다.

## 기본 태그 (EssentialMeta)

### Usage

```tsx
import { EssentialMeta } from '@titicaca/meta-tags'

return (
  <EssentialMeta
    description="모바일 여행 가이드 - 트리플"
    canonicalUrl="https://triple.guide/"
  />
)
```

### 포함된 메타 태그

#### [뷰포트 메타 태그](https://developer.mozilla.org/ko/docs/Mozilla/Mobile/Viewport_meta_tag)

- 사용 가이드
  - name: viewport
  - 페이지의 viewport를 설정합니다
  - content
    - width: viewport의 크기를 지정한다.
    - height: viewport의 높이를 지정한다.
    - initial-scale: 페이지가 처음 로드될 때 줌 레벨을 조정한다.
    - minimum-scale, maximum-scale: 사용자가 얼마나 페이지를 줌 인/아웃 할 수 있는지 조정한다.
    - user-scalable: 사용자가 브라우저의 확대축소를 가능하게 할 것인지 정의.

#### Description 메타 태그

- 사용 가이드
  - name: description
  - content: 페이지의 설명을 정의합니다. `ex) 늦여름, 초가을에 떠나기 좋은 장소`

#### 파비콘 메타 태그

- 사용 가이드
  - name: msapplication-TileImage
  - content: 파비콘 이미지 url
- 애플 터치 아이콘
  - link tag로 설정가능
  - name: apple-touch-icon-precomposed
  - href: 터치 아이콘 이비지 url

#### [레거시 문서 모드 지정](<https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/jj676915(v=vs.85)>)

- 사용 가이드
  - httpEquiv: X-UA-Compatible
  - content
    - IE: 웹 페이지를 레거시 문서 모드로 제한할 경우 사용한다.

## [애플 스마트 앱 배너](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) (AppleSmartBannerMeta)

### Usage

```tsx
import { AppleSmartBannerMeta } from '@titicaca/meta-tags'

return <AppleSmartBannerMeta appId="12345" appUrlScheme="triple" appPath="/" />
```

#### 사용된 메타 태그

- name: apple-itunes-app
- content
  - app-id : (필수) 앱의 고유 식별자입니다.
  - Affiliate-data : (선택 사항) iTunes 계열사 인 경우 iTunes 계열사 문자열입니다.
  - app-argument : (선택 사항) 네이티브 앱에 컨텍스트를 제공하는 URL입니다.

## [페이스북 앱 링크](https://developers.facebook.com/docs/applinks) (FacebookAppLinkMeta)

### Usage

```tsx
import { FacebookAppLinkMeta } from '@titicaca/meta-tags'

return (
  <FacebookAppLinkMeta
    appName="트리플"
    iosAppStoreId="1225499481"
    appPath="/"
    appPackageName="com.titicacacorp.triple"
    appUrlScheme="triple"
  />
)
```

### 사용된 메타 태그

#### IOS

- 사용가이드
  - IOS Url
    - 필수 여부: ⭕
    - name: al:ios:url `ex) com.titicacacorp.triple:///`
    - content: IOS 앱 전용 커스텀 스키마
  - 앱스토어 Id
    - 필수 여부: ❌
    - name: al:ios:app_store_id
    - content: 앱스토어 앱 아이디`ex) 12345`
  - 앱 이름
    - 필수 여부: ❌
    - name: al:ios:app_name
    - content: 앱 이름 `ex) 트리플`

#### 안드로이드

- 사용가이드
  - 안드로이드 Url
    - 필수 여부: ❌
    - name: al:android:url
    - content: 안드로이드 앱 전용 커스텀 스키마 `ex) triple:///`
  - 패키지 이름
    - 필수 여부: ⭕
    - name: al:android:package
    - content: 증명된 패키지 이름 `ex) com.titicacacorp.triple`
  - 클래스 이름
    - 필수 여부: ❌
    - name: al:android:class
    - content: 증명된 활동 클래스 이름 `ex) org.applinks.DocsActivity`
  - 앱 이름
    - 필수 여부: ❌
    - name: al:android:app_name
    - content: 앱이름 `ex) 트리플`

## [페이스북 오픈 그래프](https://developers.facebook.com/docs/sharing/webmasters/#markup) (FacebookOpenGraphMeta)

### Usage

```tsx
import { FacebookOpenGraphMeta } from '@titicaca/meta-tags'

return (
  <FacebookOpenGraphMeta
    title = '실시간 여행 가이드 - 트리플'
    description = '전세계 맛집, 호텔, 관광지'
    canonicalUrl = 'https://triple.guide/'
    type = 'website'
    locale = 'ko_KR'
    image = {
      url: 'https://assets.triple.guide/images/default-cover-image.jpg',
      width: 1052,
      height: 1052,
    }
    fbAppId = '136540730081853'
  />
)
```

### 사용된 태그

#### 기본태그

- 사용가이드
  - Url
    - name: og:url
    - content: 페이지의 표준 url `ex) https://triple.guide/articles/2ca34d9f-57b8-4263-b1d1-beadccda92b1`
  - 제목
    - name: og:title
    - content: 사이트 이름등의 브랜드 제목이 없는 콘텐츠 제목 `ex) 여행사 대리 3인방의 국내 인생 여행지`
      - 라고 정의되어있는데요 `실시간 여행 가이드 - 트리플` 상관없을까요? - 사용하는 쪽에서 웬만하면 오버라이드해서 사용했으면 합니다
  - 설명
    - name: og:description
    - content: 콘텐츠의 간단한 설명 `ex) 늦여름, 초가을에 떠나기 좋은 장소`
  - 이미지
    - name: og:image
    - content: 콘텐츠를 공유할 때 표시되는 이미지의 url입니다. `ex) https://media.triple.guide/triple-cms/c_limit,h_1024,w_1024/01ae361e-93d8-42d9-8f52-a35316f49491.jpeg`
    - 같이 쓰이는 태그
      - 이미지 넓이/높이
        - name: og:image:{width | height}
          - content: 미리보기 이미지의 넓이/높이를 지정합니다 `ex) 1024`
  - 앱 아이디
    - name: fb:app_id
    - content: 페이스북 전용 앱 id `ex) 12345`

#### 추가 태그

- 사용가이드
  - 콘텐츠 타입
    - name: og:type
    - content: 미디어 유형, 기본값: website `ex) article`
  - 언어
    - name: og:locale
    - content: 리소스의 언어, 기본값: en_US `ex) ko_kr`
