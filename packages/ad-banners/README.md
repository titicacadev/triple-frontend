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
| bannerMargin | X | 배너 각각의 마진. MarginPadding 형식. |
| trackEvent | X | 이벤트 기록 함수의 집합. onImpress, onClick 속성이 있다. 각각은 banner 객체와 배너의 인덱스를 input으로 받는 함수. |

### 사용하는 콘텍스트

다음 콘텍스트의 Provider가 컴포넌트 상위에 존재해야 합니다.

- Device context
- History context

### 예시

```:javascript
import AdBanners from '@titicaca/ad-banners'

<AdBanners
  contentType="poi"
  contentId={contentId}
  regionId={regionId}
  padding={{ left: 20, right: 20 }}
  bannerMargin={{ top: 10, bottom: 10 }}
  trackEvent: {{
    onImpress: (banner, index) => {
      trackEvent({
        fa: {
          action: 'V0_배너노출',
          poi_id: contentId,
          banner_id: banner.id,
          banner_position: index,
          url: banner.target,
        },
      })
    },
    onClick: (banner, index) => {
      trackEvent({
        ga: [
          'V0_배너선택',
          `${
            contentType !== 'article'
              ? names.ko || names.en || names.local
              : title
          }_${contentId}_${banner.id}_${banner.desc}_${banner.target}`,
        ],
        fa: {
          action: 'V0_배너선택',
          banner_id: banner.id,
          banner_position: index,
          poi_id: contentId,
          url: banner.target,
        },
      })
    }
  }}
/>
```
