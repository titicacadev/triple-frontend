# ab-experiment-context

A/B 테스트를 도와주는 context입니다.

## 인터페이스

### `getABExperiment`

slug에 대응하는 `testId`와 사용자가 속해있는 그룹을 반환합니다.
첫 번째 파라미터는 slug, 두 번째 파라미터는 fetcher의 options 객체입니다.

### `ABExperimentProvider`

자식 컴포넌트에 `ABExperimentMeta` 값을 공급합니다.
meta 값은 prop으로 넣어주며 prop이 없을 경우 자체적으로 API 요청을 시도합니다.

#### props

| 이름           | 설명                                 |
| -------------- | ------------------------------------ |
| experimentSlug | A/B 테스트 slug 값                   |
| meta           | SSR에서 조회한 `ExperimentMeta` 값   |
| onError        | API에서 에러가 발생했을 때 처리 함수 |

### `useABExperimentVariant`

사용자의 그룹에 맞는 variant를 선택해서 반환합니다.
파라미터로 그룹을 key값으로 하고 해당 그룹의 variant를 value로 하는 객체와,
그룹이 없을 때 반환하는 fallback 값을 받습니다.

```ts
const Component = useABExperimentVariant(
  { a: OriginalComponent, b: NewComponent },
  OriginalComponent,
)
```

## 사용 예시

`getServerSideProps` 함수에서 `getABExperiment`를 사용하여 실험 정보를 가져옵니다.

```ts
FooPage.getServerSideProps = async ({ req }) => {
  const { result } = await getABExperiment(EXPERIMENT_ID, { req })

  return {
    props: {
      experimentMeta: result,
    },
  }
}
```

A/B 테스트를 진행하려는 페이지를 `ABExperimentProvider`로 감쌉니다.

```tsx
export function FooPage({ experimentMeta }) {
  return (
    <ABExperimentProvider
      experimentSlug={EXPERIMENT_ID}
      meta={experimentMeta}
      onError={(error) => {
        Sentry.captureException(error)
      }}
    >
      <Foo />
    </ABExperimentProvider>
  )
}
```

A/B 테스트 대상을 렌더링하는 컴포넌트에서 `useABExperimentVariant` 훅을 사용하여
유형에 맞는 값을 고르도록 해줍니다.
유형은 컴포넌트, 문자열, 숫자, 함수 등 모든 타입이 가능합니다.

```ts
const ExperimentTargetComponent = useABExperimentVariant(
  {
    a: OriginalComponent,
    b: NewComponent,
  },
  OriginalComponent,
)
```

```ts
const experimentTargetMessage = useABExperimentVariant(
  {
    a: '이 호텔을 예약하세요!',
    b: '다른 호텔보다 평균 3만원 저렴한 호텔을 예약해보세요!',
  },
  '호텔을 예약하세요.',
)
```

`useABExperimentConversionTracker` 훅의 함수를 이용해 실험에서 측정하려는 목표 행동을 기록합니다.

```tsx
const trackConversion = useABExperimentConversionTracker()

const handleButtonClick = () => {
  trackConversion()
}

return <Button onClick={handleButtonClick}>{experimentTargetMessage}</Button>
```
