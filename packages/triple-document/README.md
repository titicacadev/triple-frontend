# triple-document

Triple Document Package 는 Triple Article 시스템에서 출판되는 데이터 모델을 기반으로
프리젠테이션할 수 있는 React 컴포넌트들로 구성됩니다.

## Data Flow

```sh
articles-admin - triple-frontend(triple-document package)
   \ (create)
    \__ { triple document data model } -> stored in mongodb
                                           / (connect)
      >---------- articles-api ---------->
     / (request)
articles-web - triple-frontend(triple-document package)
```

- articles-admin: 매거진, 가이드 등을 작성하기 위한 어드민 CMS
- triple-frontend: TripleDocument 컴포넌트를 갖는 공통 라이브러리
- articles-web: 트리플 매거진, 가이드 서비스

## Triple Document Data Model

CMS 에서는 아래에 정의된 `heading1`, `heading2` 와 같은 다양한 문서 요소들의 타입으로 타입과
컴포넌트가 맵핑되어 화면상에 렌더링됩니다.

각 타입들을 고유의 데이터 구조를 갖고 있는데 이 부분은 articles-admin 프로젝트에서 살펴볼 수 있습니다.

```ts
export const ELEMENTS: ElementSet = {
  heading1: MH1,
  heading2: MH2,
  heading3: MH3,
  heading4: MH4,
  text: Text,
  images: Images,
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  hr4: HR4,
  hr5: HR5,
  hr6: HR6,
  pois: Pois,
  links: Links,
  embedded: Embedded,
  note: Note,
  list: List,
  regions: Regions,
  video: ExternalVideo,
  tnaProducts: TnaProductsList,
  table: Table,
  coupon: Coupon,
  itinerary: Itinerary,
}
```

### 문서요소 데이기본 구조

```ts
{
  type: keyof typeof ELEMENTS
  value: {
    [keyof typeof ELEMENTS]: {
      ...
    }
  }
}
```

위의 각 문서 요소와 맵핑되는 컴포넌트들은 위의 정해진 데이터 타입에 따라 렌더링 `props` 를 받아 문서를
표시합니다.

```ts
  [keyof typeof ELEMENTS]: { PROPS }
```

## 컴포넌트

### Itinerary (지도, 추천코스)

일정 데이터 구조의 원본 데이터를 기반으로 지도상에 동선과 추천 코스를 카드 나열로 표시하는 컴포넌트입니다.

```json
{
  "type": "itinerary",
  "value": {
    "itinerary": {
      "day": 1,
      "items": [
        {
          "memo": "",
          "schedule": "1:00",
          "transportation": [
            {
              "type": "transporation",
              "value": {
                "transportation": "car",
                "duration": "0'05\""
              }
            }
          ],
          "poi": {
            "id": "e830bc8b-3ff3-48fb-99df-c6ccc1ce13c7",
            "type": "restaurant",
            "source": {
              "id": "e830bc8b-3ff3-48fb-99df-c6ccc1ce13c7",
              "type": "restaurant",
              "regionId": "edf1982d-c835-43a7-b06b-af43acbb6f38",
              "pointGeolocation": {
                  "type": "Point",
                  "coordinates": [
                      100.496027,
                      13.759168
                  ]
              },
              ...,
            }
        }
      }
    ]
   }
},
```

- items 항목 1개의 경우 추천 코스의 하나의 카드 정보를 담습니다.
- 지도를 표시할 때는 items 내의 `poi` 정보에 `pointGeolocation` 정보를 토대로 자동으로 연산하여 표시합니다.
