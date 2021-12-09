# feature-masks

클라이언트 상태에 따라 노출 및 적용 여부를 결정해야 하는 기능 구현에 사용할
유틸리티 함수나 React Hook, 컴포넌트 인터페이스를 제공합니다.

## Usage

### `use-app-version-feature-mask`

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
