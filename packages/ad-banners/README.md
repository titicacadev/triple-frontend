# `@titicaca/ad-banners`

광고 배너 목록을 표시하는 컴포넌트입니다.

## Usage

### Props

| 이름 | 필수 여부 | 설명 |
| ---- | ---- | ---- |
| contentType | O | 광고를 표시하는 콘텐츠의 종류 (attraction, restaurant, article, hotel) |
| contentId | O | 콘텐츠 ID |
| regionId | X | 콘텐츠가 속한 리전의 ID |
| padding | X | 목록 전체의 상하좌우 패딩. MarginPadding 형식. |
| eventAttributes | X | impression, click 이벤트 기록할 때 필요한 메타 데이터 모음. title은 광고를 표시하는 콘텐츠의 제목 |

### 사용하는 콘텍스트

다음 콘텍스트의 Provider가 컴포넌트 상위에 존재해야 합니다.

- Device context
- Event tracking context
- History context

### 예시

```:javascript
import AdBanners from '@titicaca/ad-banners'

<AdBanners
  contentType="poi"
  contentId={contentId}
  regionId={regionId}
  padding={{ left: 20, right: 20 }}
  eventAttributes={{
    title:
      contentType === 'article' ? title : names.ko || names.en || names.local,
  }}
/>
```
