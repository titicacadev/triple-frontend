# EventTrackingContext

앱 내에서 수집하는 Firebase/Google Analytics 및 일반 브라우저에서 수집하는
Google Analytics/Pixel 이벤트를 위한 Context입니다.

## Event 정의

### Screen/page view events

String 형식 path로 표현하는 스크린(앱 내) 및 페이지(웹 페이지) 뷰를 기록합니다.
페이지가 열릴 때마다 기록하는 것이 보통이며, 팝업이나 모달 윈도우 등이 열릴 때
별도로 기록하기도 합니다.

페이지가 열릴 때마다 기록하는 Screen/page view는 `EventTrackingProvider`에
전달하는 `page` prop의 값을 이용하게 됩니다:

```
page: {
  label: string
  path: string
}
```

`label`과 `path`, 특히 `path` 값은 데이터 분석 시 사용자의 특정 페이지 진입
여부를 체크하기 위해 사용합니다. 따라서 서비스 안에서 유일한 값을 가지도록 하는
것이 중요합니다. 프로젝트의 `basePath`를 `path`의 가장 앞에 붙이는 것이
보통입니다.

### Interaction events

사용자가 의도하거나 의도하지 않은 페이지 내 인터랙션을 기록하기 위한 이벤트입니다.
컨텐트/상품 노출이나 클릭, 페이지 내 피쳐 사용에 대한 기록을 남길 수 있습니다.
트리플에서는 Firebase Analytics와 Google Analytics 서비스를 사용하는데, 서비스에
따라 이벤트 형식에 다소 차이가 있습니다.

- Google Analytics Events: `category`, `action`, `label`의 3-Tuple로 표현합니다.
  `category`는 대부분 page label입니다.
- Firebase Analytics Events: `event_name`, `category`, `action`을 포함한 1-depth
  object입니다. `event_name`은 `user_interaction`이라는 고정 값을 사용합니다.
  `category`는 Google Analytics와 마찬가지로 page label을 사용합니다.
- Facebook Pixel Events: `type`, `action`, `payload`로 이뤄진 object를 받습니다.
  `type`이 `'track'`이면 표준 이벤트를 사용하며 주어진 `action`만 사용할 수 있습니다.
  `type`이 `'trackCustom'`이면 맞춤 이벤트를 사용하면 자유로운 `action`을 사용할 수 있습니다.
  `type`은 생략가능하며, 생략하면 `'trackCustom'`으로 간주합니다.
  `payload`는 이벤트에 전달되는 매개변수로 생략 가능합니다.

## Context

### `EventTrackingProvider`

#### Props

- `pageLabel`: Event category로 사용하는 page label을 정의합니다.
- `onError`: 메서드 실행 중 에러가 발생했을 때 호출합니다.

### `useEventTrackingContext()`

#### Return values

- `trackScreen: (screenPath: string) => void`: Screen view event를 기록합니다.
  Firebase Analytics 및 Google Analytics 이벤트가 동시에 기록됩니다.
- `trackEvent: (params: { ga?: GAParams; fa?: Partial<FAParams> }) => void`: 위에
  언급한 서비스별 이벤트를 기록합니다.
- `trackSimpleEvent: (params: { action, label, ...rest }) => void`: 많은 경우
  interaction event를 두 서비스에 동시에 기록합니다. 주어진 argument를 사용해
  적절한 Google Analytics 및 Firebase Analytics를 생성하여 동시에 기록을 요청합니다.
