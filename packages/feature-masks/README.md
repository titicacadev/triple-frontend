# feature-masks

클라이언트 상태에 따라 노출 및 적용 여부를 결정해야 하는 기능 구현에 사용할 유틸리티 함수나 React Hook, 컴포넌트 인터페이스를 제공합니다.

## Usage

### `use-app-version-feature-mask`

iOS/Android 클라이언트 버전에 따른 Feature mask가 필요할 때 사용할 수 있는 React hook 인터페이스입니다. Boolean 타입으로 Feature 지원 여부를 반환합니다.

#### Example:

```ts
import { useAppVersionFeatureMask } from '@titicaca/feature-masks'

function Sample() {
  const isSampleFeatureAvailable = useAppVersionFeatureMask({
    version: '5.10.0',
    operator: 'gt',
    availableOnPublic: true,
  })

  return isSampleFeatureAvailable ? <SampleFeature /> : null
}
```

#### Arguments

- `version: string` (Required): 기준이 될 앱 버전
- `operator: 'lt' | 'lte' | 'gt' | 'gte'` (Required): 비교 연산자
- `availableOnPublic: boolean` (Required): 일반 브라우저에서 지원 여부
- `osName: string` (Optional): 앱 OS (`iOS`, `Android` 등), 명시하지 않을 경우 전체, 전달 가능한 값은 [ua-parser-js](https://github.com/faisalman/ua-parser-js#methods) 참고
