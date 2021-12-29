# triple-ab-experiment-context

**트리플의 사용자 ID(내부 API를 이용)**를 이용하여 A/B 테스트를 도와주는 context입니다.

## 인터페이스

### `getTripleABExperiment`

slug에 대응하는 `testId`와 사용자가 속해있는 그룹을 반환합니다.
첫 번째 파라미터는 slug, 두 번째 파라미터는 fetcher의 options 객체입니다.

### `TripleABExperimentProvider`

자식 컴포넌트에 `TripleABExperimentMeta` 값을 공급합니다.
meta 값은 prop으로 넣어주며 prop이 없을 경우 자체적으로 API 요청을 시도합니다.

#### props

| 이름    | 설명                                                                                  |
| ------- | ------------------------------------------------------------------------------------- |
| slug    | A/B 테스트 slug 값                                                                    |
| meta    | SSR에서 조회한 `ExperimentMeta` 값. 넣어주지 않으면 Provider가 자체적으로 가져옵니다. |
| onError | API에서 에러가 발생했을 때 처리 함수.                                                 |

### `useTripleABExperimentVariant`

사용자의 그룹에 맞는 variant를 선택해서 반환합니다.
AB 테스트의 slug, 각 그룹의 후보군, fallback 값을 파라미터로 받습니다.
주어진 slug에 맞는 meta 값을 찾을 수 없으면 fallback 값을 반환합니다.
이 훅이 마운트되면 세션 시작을 알리는 이벤트가 기록됩니다.

```ts
const Component = useTripleABExperimentVariant(
  'component-ab-test',
  { A: OriginalComponent, B: NewComponent },
  OriginalComponent,
)
```

### `useTripleABExperimentConversionTracker`

AB 테스트의 전환을 기록합니다.

## 사용 예시

`getServerSideProps` 함수에서 `getABExperiment`를 사용하여 실험 정보를 가져옵니다.

> 💡만약 클라이언트에서 실험 정보를 가져오면
> 사용자는 fallback 값을 봤다가 실험 값을 보게 됩니다.
> 이러한 "깜박거림"을 방지하려면 서버사이드에서 실험 정보를 가져와야 합니다.

```ts
FooPage.getServerSideProps = async ({ req }) => {
  const [{ result: messageMeta }, { result: componentMeta }] =
    await Promise.all([
      getTripleABExperiment(MESSAGE_AB_TEST_ID, { req }),
      getTripleABExperiment(COMPONENT_AB_TEST_ID, { req }),
    ])

  return {
    props: {
      messageMeta,
      componentMeta,
    },
  }
}
```

A/B 테스트를 진행하려는 지점을 `TripleABExperimentProvider`로 감쌉니다.

```tsx
export function Foo({ messageMeta, componentMeta }) {
  return (
    <TripleABExperimentProvider
      slug={MESSAGE_AB_TEST_ID}
      meta={messageMeta}
      onError={(error) => {
        Sentry.captureException(error)
      }}
    >
      <TripleABExperimentProvider
        slug={COMPONENT_AB_TEST_ID}
        meta={componentMeta}
        onError={(error) => {
          Sentry.captureException(error)
        }}
      >
        <SomeComponent />
        {/* ... */}
      </TripleABExperimentProvider>
    </TripleABExperimentProvider>
  )
}
```

A/B 테스트 대상을 렌더링하는 컴포넌트에서 `useTripleABExperimentVariant` 훅을 사용하여
유형에 맞는 값을 고르도록 해줍니다.
유형은 컴포넌트, 문자열, 숫자, 함수 등 모든 타입이 가능합니다.

```ts
const ExperimentTargetComponent = useTripleABExperimentVariant(
  COMPONENT_AB_TEST_ID,
  {
    a: OriginalComponent,
    b: NewComponent,
  },
  OriginalComponent,
)
```

```ts
const experimentTargetMessage = useTripleABExperimentVariant(
  MESSAGE_AB_TEST_ID,
  {
    a: '이 호텔을 예약하세요!',
    b: '다른 호텔보다 평균 3만원 저렴한 호텔을 예약해보세요!',
  },
  '호텔을 예약하세요.',
)
```

`useTripleABExperimentConversionTracker` 훅의 함수를 이용해 실험에서 측정하려는 목표 행동을 기록합니다.

```tsx
const trackComponentTestConversion =
  useTripleABExperimentConversionTracker(COMPONENT_AB_TEST_ID)
const trackMessageTestConversion =
  useTripleABExperimentConversionTracker(MESSAGE_AB_TEST_ID)

const handleButtonClick = () => {
  trackComponentTestConversion()
  trackMessageTestConversion()
}

return <Button onClick={handleButtonClick}>{experimentTargetMessage}</Button>
```

`useTripleABExperimentImpressionTracker` 훅의 함수를 이용해 실험에서 측정하려는 목표 노출을 기록합니다.

```tsx
const trackComponentTestImpression =
  useTripleABExperimentImpressionTracker(COMPONENT_AB_TEST_ID)
const trackMessageTestImpression =
  useTripleABExperimentImpressionTracker(MESSAGE_AB_TEST_ID)

const handleButtonImpression = () => {
  trackComponentTestImpression()
  trackMessageTestImpression()
}

return (
  <StaticIntersectionObserver
    threshold={0.5}
    onChange={({ isIntersecting }: { isIntersecting: boolean }) => {
      if (isIntersecting) {
        handleButtonImpression
      }
    }}
  >
    <Button onClick={handleButtonClick}>{experimentTargetMessage}</Button>
  </StaticIntersectionObserver>
)
```
