# view-utilities

뷰 영역에서 사용하는 유틸 함수 모음

## How to use

```bash
npm install @titicaca/view-utilities
```

```js
//index.ts

import { debounce, formatNumber } from '@titicaca/view-utilities'
```

## debounce

[API]

## generateDeepLink

[API]

## deriveCurrentStateAndCount

[API]

## formatNumber

[API]

## generateShareImageUrl

[API]

## parseUrl

[API]

## generateUrl

[API]

## measureDistance

지도 좌표의 직선거리를 `meter` 값으로 반환합니다.

```tsx
import { measureDistance } from '@titicaca/view-utilities'

const distance = measureDistance(
  {
    coordinates: [121.525966, 25.094853],
    type: 'Point',
  },
  {
    coordinates: [121.528408, 25.095141],
    type: 'Point',
  },
)

console.log(distance) // -> 248
```
