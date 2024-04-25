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

## strict-query

query-string으로 주어진 값의 타입을 결정하여 사용할 수 있게 도와주는 인터페이스.

```ts
import { strictQuery } from '@titicaca/view-utilities'

const { regionId, tripId, categoryIds, agesOfChildren, inRegion } = strictQuery(
  query,
)
  .string('regionId') // regionId will be string | undefined
  .number('tripId') // tripId will be number | undefined
  .stringArray('categoryIds') // categoryIds will be string[]
  .numberArray('agesOfChildren') // agesOfChildren will be number[]
  .boolean('inRegion') // inRegion will be boolean
  .use()
```

`strictQuery` 함수를 이용해 속성과 타입을 매핑할 수 있는 인스턴스로 바꿔줍니다.
그 다음 원하는 타입과 속성 키를 매핑해줍니다. chaining으로 여러 속성을 한 번에 매핑할 수 있습니다.
그리고 `use` 메서드를 이용해 일반 객체를 반환해주면 원하는 타입으로 사용할 수 있습니다.
